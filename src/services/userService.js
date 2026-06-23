const userRepository = require('../repositories/userRepository.js');

class UserService {
    // Buscar usuário por ID
    async buscarPorId(id) {
        const usuario = await userRepository.findById(id);
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }
        delete usuario.senha;
        return usuario;
    }

    // Adicionar saldo ao usuário
    async adicionarSaldo(id, saldo) {
        if (saldo < 0) {
            throw new Error('Não é permitido cadastrar saldo negativo');
        }

        const saldoArredondado = Math.round(saldo * 100) / 100;

        const usuario = await userRepository.findById(id);
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }

        const novoSaldo = parseFloat(usuario.saldo) + saldoArredondado;
        const usuarioAtualizado = await userRepository.updateSaldo(id, novoSaldo);
        
        return usuarioAtualizado;
    }

    // Deletar usuário
    async deletar(id) {
        const usuario = await userRepository.findById(id);
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }
        await userRepository.delete(id);
        return true;
    }
}

module.exports = new UserService();
