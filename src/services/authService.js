const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository.js');

class AuthService {
    // Validar senha 
    validarSenha(senha) {
        if (senha.length < 8) {
            return { valido: false, erro: 'A senha deve ter no mínimo 8 caracteres' };
        }
        if (!/[A-Z]/.test(senha)) {
            return { valido: false, erro: 'A senha deve conter pelo menos uma letra maiúscula' };
        }
        if (!/[0-9]/.test(senha)) {
            return { valido: false, erro: 'A senha deve conter pelo menos um número' };
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
            return { valido: false, erro: 'A senha deve conter pelo menos um caractere especial' };
        }
        return { valido: true };
    }

    // Cadastrar usuário
    async cadastrar(dados) {
        // 1. Validar dados obrigatórios
        if (!dados.nome || !dados.email || !dados.dataNascimento || !dados.senha || !dados.confirmacaoSenha) {
            throw new Error('Todos os campos são obrigatórios');
        }

        // 2. Validar se senhas coincidem
        if (dados.senha !== dados.confirmacaoSenha) {
            throw new Error('A senha e a confirmação de senha não coincidem');
        }

        // 3. Validar requisitos da senha
        const validacao = this.validarSenha(dados.senha);
        if (!validacao.valido) {
            throw new Error(validacao.erro);
        }

        // 4. Verificar se email já existe
        const usuarioExistente = await userRepository.findByEmail(dados.email);
        if (usuarioExistente) {
            throw new Error('Este email já está cadastrado');
        }

        // 5. Criptografar a senha
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(dados.senha, salt);

        // 6. Criar usuário no banco
        const novoUsuario = await userRepository.create(
            dados.nome,
            dados.email,
            dados.dataNascimento,
            senhaHash
        );

        return novoUsuario;
    }

    // Login do usuário
    async login(email, senha) {
        // 1. Buscar usuário pelo email
        const usuario = await userRepository.findByEmail(email);
        if (!usuario) {
            throw new Error('Email ou senha inválidos');
        }

        // 2. Verificar a senha
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            throw new Error('Email ou senha inválidos');
        }

        // 3. Gerar token JWT
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET || 'minha_chave_secreta',
            { expiresIn: '24h' }
        );

        // 4. Retornar dados (sem a senha)
        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            dataNascimento: usuario.data_nascimento,
            token: token
        };
    }

    // Resetar senha
    async resetPassword(id, novaSenha) {
        // 1. Buscar usuário
        const usuario = await userRepository.findById(id);
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }

        // 2. Validar requisitos da nova senha
        const validacao = this.validarSenha(novaSenha);
        if (!validacao.valido) {
            throw new Error(validacao.erro);
        }

        // 3. Verificar se a nova senha é igual à atual
        const senhaIgual = await bcrypt.compare(novaSenha, usuario.senha);
        if (senhaIgual) {
            throw new Error('A nova senha não pode ser igual à senha atual');
        }

        // 4. Criptografar a nova senha
        const salt = await bcrypt.genSalt(10);
        const novaSenhaHash = await bcrypt.hash(novaSenha, salt);

        // 5. Atualizar no banco
        await userRepository.updateSenha(id, novaSenhaHash);

        return { message: 'Senha atualizada com sucesso!' };
    }
}

module.exports = new AuthService();
