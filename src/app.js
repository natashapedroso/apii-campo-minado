const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const gameRoutes = require('./routes/gameRoutes.js');

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/games', gameRoutes);

// Rota de teste
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'API Campo Minado está rodando!',
        timestamp: new Date().toISOString()
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📡 Acesse: http://localhost:${PORT}`);
});
