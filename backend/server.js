const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const agendamentoRoutes = require('./routes/agendamento');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
app.use('/api/agendamentos', agendamentoRoutes);

// Rota de teste
app.get('/', (req, res) => {
    res.json({ message: 'API da Barbearia funcionando!' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
