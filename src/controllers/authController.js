const authService = require('../services/authService.js');

class AuthController {
    async register(req, res) {
        try {
            const usuario = await authService.cadastrar(req.body);
            
            res.status(201).json({
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                dataNascimento: usuario.data_nascimento,
                saldo: usuario.saldo,
                message: 'Usuário cadastrado com sucesso!'
            });
        } catch (error) {
            res.status(400).json({ 
                error: error.message 
            });
        }
    }

    async login(req, res) {
        try {
            const { email, senha } = req.body;
            
            if (!email || !senha) {
                return res.status(400).json({ 
                    error: 'Email e senha são obrigatórios' 
                });
            }

            const resultado = await authService.login(email, senha);
            res.json(resultado);
        } catch (error) {
            res.status(401).json({ 
                error: error.message 
            });
        }
    }

    async resetPassword(req, res) {
        try {
            const { id, novaSenha } = req.body;
            
            if (!id || !novaSenha) {
                return res.status(400).json({ 
                    error: 'ID e nova senha são obrigatórios' 
                });
            }

            const resultado = await authService.resetPassword(id, novaSenha);
            res.json(resultado);
        } catch (error) {
            res.status(400).json({ 
                error: error.message 
            });
        }
    }
}

module.exports = new AuthController();
