const express = require('express');
const router = express.Router();
const AgendamentoController = require('../controllers/agendamentoController');

// Rotas
router.post('/', AgendamentoController.criar);
router.get('/', AgendamentoController.listar);
router.get('/:id', AgendamentoController.buscarPorId);
router.delete('/:id', AgendamentoController.cancelar);
router.get('/horarios/disponiveis', AgendamentoController.horariosDisponiveis);

module.exports = router;
