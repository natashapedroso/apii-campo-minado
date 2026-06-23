const gameRepository = require('../repositories/gameRepository.js');
const userRepository = require('../repositories/userRepository.js');

class GameService {
    // Gerar tabuleiro 5x5
    gerarTabuleiro() {
        const tamanho = 5;
        const tabuleiro = [];
        const totalPosicoes = tamanho * tamanho;
        const totalBombas = Math.floor(totalPosicoes * 0.3); // 30% de bombas
        const totalDiamantes = totalPosicoes - totalBombas;

        // Criar array com as posições
        const posicoes = [];
        for (let i = 0; i < totalBombas; i++) {
            posicoes.push('BOMBA');
        }
        for (let i = 0; i < totalDiamantes; i++) {
            posicoes.push('DIAMANTE');
        }

        // Embaralhar (Fisher-Yates)
        for (let i = posicoes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [posicoes[i], posicoes[j]] = [posicoes[j], posicoes[i]];
        }

        // Preencher tabuleiro 5x5
        let index = 0;
        for (let i = 0; i < tamanho; i++) {
            tabuleiro[i] = [];
            for (let j = 0; j < tamanho; j++) {
                tabuleiro[i][j] = posicoes[index++];
            }
        }

        return tabuleiro;
    }

    // Calcular prêmio
    calcularPremio(valorAposta, diamantesEncontrados) {
        const premio = valorAposta * (1 + (diamantesEncontrados * 0.33));
        return Math.round(premio * 100) / 100;
    }

    // Iniciar jogo
    async iniciarJogo(usuarioId, valorAposta) {
        // 1. Validar valor da aposta
        if (!valorAposta || valorAposta <= 0) {
            throw new Error('Valor da aposta deve ser maior que zero');
        }

        // 2. Buscar usuário
        const usuario = await userRepository.findById(usuarioId);
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }

        // 3. Validar saldo
        if (parseFloat(usuario.saldo) < valorAposta) {
            throw new Error('Saldo insuficiente');
        }

        // 4. Verificar se já tem jogo em andamento
        const jogoAtivo = await gameRepository.findActiveByUserId(usuarioId);
        if (jogoAtivo) {
            throw new Error('Usuário já possui uma partida em andamento');
        }

        // 5. Debitar saldo do usuário
        const novoSaldo = parseFloat(usuario.saldo) - valorAposta;
        await userRepository.updateSaldo(usuarioId, novoSaldo);

        // 6. Gerar tabuleiro
        const tabuleiro = this.gerarTabuleiro();

        // 7. Criar jogo no banco
        const jogo = await gameRepository.create(
            usuarioId,
            valorAposta,
            JSON.stringify(tabuleiro)
        );

        return { gameId: jogo.id };
    }

    // Revelar posição
    async revelarPosicao(jogoId, linha, coluna) {
        // 1. Validar coordenadas
        if (linha < 0 || linha > 4 || coluna < 0 || coluna > 4) {
            throw new Error('Posição inválida');
        }

        // 2. Buscar jogo
        const jogo = await gameRepository.findById(jogoId);
        if (!jogo) {
            throw new Error('Jogo não encontrado');
        }

        // 3. Verificar se jogo está em andamento
        if (jogo.status !== 'EM_ANDAMENTO') {
            throw new Error('Este jogo já foi finalizado');
        }

        // 4. Verificar se posição já foi revelada
        const movimentos = await gameRepository.findMovimentosByGameId(jogoId);
        const posicaoRevelada = movimentos.some(
            m => m.linha === linha && m.coluna === coluna
        );
        if (posicaoRevelada) {
            throw new Error('Esta posição já foi revelada');
        }

        // 5. Recuperar tabuleiro
        let tabuleiro = jogo.tabuleiro;
        if (typeof tabuleiro === 'string') {
            tabuleiro = JSON.parse(tabuleiro);
        }
        const tipo = tabuleiro[linha][coluna];

        // 6. Registrar movimento
        await gameRepository.createMovimento(jogoId, linha, coluna, tipo);

        // 7. Calcular diamantes encontrados
        const diamantesEncontrados = movimentos.filter(m => m.tipo === 'DIAMANTE').length;
        const novoTotalDiamantes = tipo === 'DIAMANTE' ? diamantesEncontrados + 1 : diamantesEncontrados;

        // 8. Se for BOMBA
        if (tipo === 'BOMBA') {
            await gameRepository.updateStatus(jogoId, 'DERROTA', 0);
            return {
                resultado: 'BOMBA',
                status: 'PERDIDO'
            };
        }

        // 9. Se for DIAMANTE
        const premioAtual = this.calcularPremio(jogo.valor_aposta, novoTotalDiamantes);
        await gameRepository.updateStatus(jogoId, 'EM_ANDAMENTO', premioAtual);

        return {
            resultado: 'DIAMANTE',
            diamantesEncontrados: novoTotalDiamantes,
            premioAtual: premioAtual
        };
    }

    // Sacar prêmio
    async cashout(jogoId) {
        // 1. Buscar jogo
        const jogo = await gameRepository.findById(jogoId);
        if (!jogo) {
            throw new Error('Jogo não encontrado');
        }

        // 2. Verificar se jogo está em andamento
        if (jogo.status !== 'EM_ANDAMENTO') {
            throw new Error('Este jogo já foi finalizado');
        }

        // 3. Calcular valor final (prêmio acumulado)
        const valorFinal = parseFloat(jogo.premio_acumulado);

        // 4. Creditar saldo ao usuário
        const usuario = await userRepository.findById(jogo.usuario_id);
        const novoSaldo = parseFloat(usuario.saldo) + valorFinal;
        await userRepository.updateSaldo(jogo.usuario_id, novoSaldo);

        // 5. Finalizar jogo como VITORIA
        await gameRepository.updateStatus(jogoId, 'VITORIA', valorFinal);

        return {
            message: 'Prêmio sacado com sucesso!',
            valor: valorFinal
        };
    }
}

module.exports = new GameService();
