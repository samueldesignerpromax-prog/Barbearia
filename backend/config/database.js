// Simulando um banco de dados (para treino, sem banco real)
const Database = {
    agendamentos: [],
    
    // Gerar ID automático
    generateId() {
        return Date.now().toString() + Math.random().toString(36).substr(2, 6);
    },
    
    // Salvar agendamento
    save(agendamento) {
        agendamento.id = this.generateId();
        agendamento.dataCriacao = new Date().toISOString();
        this.agendamentos.push(agendamento);
        return agendamento;
    },
    
    // Buscar todos
    findAll() {
        return this.agendamentos;
    },
    
    // Buscar por ID
    findById(id) {
        return this.agendamentos.find(a => a.id === id);
    },
    
    // Buscar por data
    findByDate(data) {
        return this.agendamentos.filter(a => a.data === data);
    },
    
    // Atualizar status
    updateStatus(id, status) {
        const index = this.agendamentos.findIndex(a => a.id === id);
        if (index !== -1) {
            this.agendamentos[index].status = status;
            return this.agendamentos[index];
        }
        return null;
    }
};

module.exports = Database;
