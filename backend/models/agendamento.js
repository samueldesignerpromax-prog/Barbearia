class Agendamento {
    constructor(nome, email, telefone, data, horario, servico) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.data = data;
        this.horario = horario;
        this.servico = servico;
        this.status = 'pendente'; // pendente, confirmado, cancelado
    }
    
    validar() {
        if (!this.nome || !this.email || !this.telefone || !this.data || !this.horario || !this.servico) {
            return { valido: false, mensagem: 'Todos os campos são obrigatórios' };
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.email)) {
            return { valido: false, mensagem: 'Email inválido' };
        }
        
        // Validar telefone (simples)
        if (this.telefone.length < 10) {
            return { valido: false, mensagem: 'Telefone inválido' };
        }
        
        return { valido: true };
    }
}

module.exports = Agendamento;
