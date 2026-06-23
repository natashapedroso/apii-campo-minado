const pool = require('../config/database.js');

class UserRepository {
    // Buscar usuário por email
    async findByEmail(email) {
        const result = await pool.query(
            'SELECT * FROM usuarios WHERE email = $1',
            [email]
        );
        return result.rows[0];
    }

    // Buscar usuário por ID
    async findById(id) {
        const result = await pool.query(
            'SELECT * FROM usuarios WHERE id = $1',
            [id]
        );
        return result.rows[0];
    }

    // Criar novo usuário
    async create(nome, email, dataNascimento, senhaHash) {
        const result = await pool.query(
            `INSERT INTO usuarios (nome, email, data_nascimento, senha, saldo) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING id, nome, email, data_nascimento, saldo`,
            [nome, email, dataNascimento, senhaHash, 0.00]
        );
        return result.rows[0];
    }

    // Atualizar saldo
    async updateSaldo(id, novoSaldo) {
        const result = await pool.query(
            `UPDATE usuarios 
             SET saldo = $1, updated_at = CURRENT_TIMESTAMP 
             WHERE id = $2 
             RETURNING id, nome, email, saldo`,
            [novoSaldo, id]
        );
        return result.rows[0];
    }

    // Atualizar senha
    async updateSenha(id, novaSenhaHash) {
        await pool.query(
            `UPDATE usuarios 
             SET senha = $1, updated_at = CURRENT_TIMESTAMP 
             WHERE id = $2`,
            [novaSenhaHash, id]
        );
    }

    // Deletar usuário
    async delete(id) {
        await pool.query(
            'DELETE FROM usuarios WHERE id = $1',
            [id]
        );
    }
}

module.exports = new UserRepository();
