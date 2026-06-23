const userService = require('../services/userService.js');

class UserController {
    // Buscar usuário por ID
    async getById(req, res) {
        try {
            const { id } = req.params;
            const usuario = await userService.buscarPorId(id);
            res.json(usuario);
        } catch (error) {
            res.status(404).json({ 
                error: error.message 
            });
        }
    }

    // Adicionar saldo
    async addSaldo(req, res) {
        try {
            const { id } = req.params;
            const { saldo } = req.body;
            
            if (!saldo && saldo !== 0) {
                return res.status(400).json({ 
                    error: 'O campo saldo é obrigatório' 
                });
            }

            const usuario = await userService.adicionarSaldo(id, saldo);
            res.json(usuario);
        } catch (error) {
            res.status(400).json({ 
                error: error.message 
            });
        }
    }

    // Dashboard (estatísticas)
    async dashboard(req, res) {
        try {
            // Por enquanto retorna dados mockados
            res.json({
                totalJogos: 0,
                vitorias: 0,
                derrotas: 0,
                valorGanho: 0.00,
                valorPerdido: 0.00
            });
        } catch (error) {
            res.status(400).json({ 
                error: error.message 
            });
        }
    }

    // Deletar usuário
    async delete(req, res) {
        try {
            const { id } = req.params;
            await userService.deletar(id);
            res.json({ message: 'Usuário deletado com sucesso!' });
        } catch (error) {
            res.status(400).json({ 
                error: error.message 
            });
        }
    }
}

module.exports = new UserController();
