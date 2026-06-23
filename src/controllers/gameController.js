const gameService = require('../services/gameService.js');

class GameController {
    // Iniciar jogo
    async start(req, res) {
        try {
            const { idUser, valorAposta } = req.body;
            
            if (!idUser || !valorAposta) {
                return res.status(400).json({ 
                    error: 'idUser e valorAposta são obrigatórios' 
                });
            }

            const resultado = await gameService.iniciarJogo(idUser, valorAposta);
            res.json(resultado);
        } catch (error) {
            res.status(400).json({ 
                error: error.message 
            });
        }
    }

    // Revelar posição
    async reveal(req, res) {
        try {
            const { gameId } = req.params;
            const { linha, coluna } = req.body;
            
            if (linha === undefined || coluna === undefined) {
                return res.status(400).json({ 
                    error: 'linha e coluna são obrigatórios' 
                });
            }

            const resultado = await gameService.revelarPosicao(parseInt(gameId), linha, coluna);
            res.json(resultado);
        } catch (error) {
            res.status(400).json({ 
                error: error.message 
            });
        }
    }

    // Sacar prêmio
    async cashout(req, res) {
        try {
            const { gameId } = req.params;
            
            const resultado = await gameService.cashout(parseInt(gameId));
            res.json(resultado);
        } catch (error) {
            res.status(400).json({ 
                error: error.message 
            });
        }
    }
}

module.exports = new GameController();
