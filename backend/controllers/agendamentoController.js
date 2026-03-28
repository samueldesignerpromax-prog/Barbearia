const Database = require('../config/database');
const Agendamento = require('../models/agendamento');
const EmailService = require('../services/emailService');

class AgendamentoController {
    // Criar novo agendamento
    static async criar(req, res) {
        try {
            const { nome, email, telefone, data, horario, servico } = req.body;
            
            const agendamento = new Agendamento(nome, email, telefone, data, horario, servico);
            
            // Validar dados
            const validacao = agendamento.validar();
            if (!validacao.valido) {
                return res.status(400).json({ error: validacao.mensagem });
            }
            
            // Verificar horário disponível
            const agendamentosExistentes = Database.findByDate(data);
            const horarioOcupado = agendamentosExistentes.some(a => a.horario === horario);
            
            if (horarioOcupado) {
                return res.status(400).json({ error: 'Horário indisponível' });
            }
            
            // Salvar agendamento
            const novoAgendamento = Database.save(agendamento);
            
            // Enviar email de confirmação (opcional - não bloqueia o agendamento)
            EmailService.enviarConfirmacao(novoAgendamento).catch(console.error);
            
            res.status(201).json({
                message: 'Agendamento realizado com sucesso!',
                agendamento: novoAgendamento
            });
        } catch (error) {
            console.error('Erro ao criar agendamento:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
    
    // Listar todos agendamentos
    static async listar(req, res) {
        try {
            const agendamentos = Database.findAll();
            res.json(agendamentos);
        } catch (error) {
            console.error('Erro ao listar agendamentos:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
    
    // Buscar agendamento por ID
    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const agendamento = Database.findById(id);
            
            if (!agendamento) {
                return res.status(404).json({ error: 'Agendamento não encontrado' });
            }
            
            res.json(agendamento);
        } catch (error) {
            console.error('Erro ao buscar agendamento:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
    
    // Cancelar agendamento
    static async cancelar(req, res) {
        try {
            const { id } = req.params;
            const agendamento = Database.updateStatus(id, 'cancelado');
            
            if (!agendamento) {
                return res.status(404).json({ error: 'Agendamento não encontrado' });
            }
            
            res.json({
                message: 'Agendamento cancelado com sucesso',
                agendamento
            });
        } catch (error) {
            console.error('Erro ao cancelar agendamento:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
    
    // Verificar horários disponíveis
    static async horariosDisponiveis(req, res) {
        try {
            const { data } = req.query;
            const horarios = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
            
            const agendamentosData = Database.findByDate(data);
            const horariosOcupados = agendamentosData.map(a => a.horario);
            
            const horariosDisponiveis = horarios.filter(h => !horariosOcupados.includes(h));
            
            res.json({ horarios: horariosDisponiveis });
        } catch (error) {
            console.error('Erro ao verificar horários:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}

module.exports = AgendamentoController;
