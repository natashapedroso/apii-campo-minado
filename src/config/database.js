const { Pool } = require('pg');
require('dotenv').config();

// Configuração da conexão com PostgreSQL :P
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'campo_minado',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    max: 20, // Máximo de conexões
    idleTimeoutMillis: 30000,
});

// Testar a conexão
pool.connect((err, client, release) => {
    if (err) {
        console.error('❌ Erro ao conectar ao PostgreSQL:', err.stack);
    } else {
        console.log('✅ Conectado ao PostgreSQL com sucesso!');
        release();
    }
});

module.exports = pool;