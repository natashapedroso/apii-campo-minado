const pool = require('../config/database.js');

class GameRepository {
    // Buscar jogo por ID
    async findById(id) {
        const result = await pool.query(
            'SELECT * FROM jogos WHERE id = $1',
            [id]
        );
        if (result.rows[0]) {
            // Converter tabuleiro de JSONB para array
            result.rows[0].tabuleiro = result.rows[0].tabuleiro;
        }
        return result.rows[0];
    }

    // Buscar jogos de um usuário
    async findByUserId(usuarioId) {
        const result = await pool.query(
            'SELECT * FROM jogos WHERE usuario_id = $1 ORDER BY created_at DESC',
            [usuarioId]
        );
        return result.rows;
    }

    // Buscar jogo em andamento de um usuário
    async findActiveByUserId(usuarioId) {
        const result = await pool.query(
            'SELECT * FROM jogos WHERE usuario_id = $1 AND status = $2 ORDER BY created_at DESC LIMIT 1',
            [usuarioId, 'EM_ANDAMENTO']
        );
        return result.rows[0];
    }

    // Criar novo jogo
    async create(usuarioId, valorAposta, tabuleiro) {
        const result = await pool.query(
            `INSERT INTO jogos (usuario_id, valor_aposta, tabuleiro, status, premio_acumulado) 
             VALUES ($1, $2, $3::jsonb, $4, $5) 
             RETURNING id`,
            [usuarioId, valorAposta, tabuleiro, 'EM_ANDAMENTO', 0]
        );
        return result.rows[0];
    }

    // Atualizar status e prêmio do jogo
    async updateStatus(id, status, premioAcumulado) {
        const result = await pool.query(
            `UPDATE jogos 
             SET status = $1, premio_acumulado = $2, updated_at = CURRENT_TIMESTAMP 
             WHERE id = $3 
             RETURNING *`,
            [status, premioAcumulado, id]
        );
        if (result.rows[0]) {
            result.rows[0].tabuleiro = result.rows[0].tabuleiro;
        }
        return result.rows[0];
    }

    // Registrar movimento
    async createMovimento(jogoId, linha, coluna, tipo) {
        const result = await pool.query(
            `INSERT INTO movimentos (jogo_id, linha, coluna, tipo) 
             VALUES ($1, $2, $3, $4) 
             RETURNING *`,
            [jogoId, linha, coluna, tipo]
        );
        return result.rows[0];
    }

    // Buscar movimentos de um jogo
    async findMovimentosByGameId(jogoId) {
        const result = await pool.query(
            'SELECT * FROM movimentos WHERE jogo_id = $1 ORDER BY created_at ASC',
            [jogoId]
        );
        return result.rows;
    }

    // Buscar estatísticas do usuário
    async getStats(usuarioId) {
        const result = await pool.query(
            `SELECT 
                COUNT(*) as total_jogos,
                COUNT(CASE WHEN status = 'VITORIA' THEN 1 END) as vitorias,
                COUNT(CASE WHEN status = 'DERROTA' THEN 1 END) as derrotas,
                COALESCE(SUM(CASE WHEN status = 'VITORIA' THEN premio_acumulado ELSE 0 END), 0) as valor_ganho,
                COALESCE(SUM(CASE WHEN status = 'DERROTA' THEN valor_aposta ELSE 0 END), 0) as valor_perdido
             FROM jogos 
             WHERE usuario_id = $1`,
            [usuarioId]
        );
        return result.rows[0];
    }
}

module.exports = new GameRepository();
