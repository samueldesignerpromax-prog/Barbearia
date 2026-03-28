const nodemailer = require('nodemailer');

// Configuração do email (use suas credenciais para teste)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'seuemail@gmail.com', // Substitua pelo seu email
        pass: 'suasenha' // Substitua pela sua senha (use app password)
    }
});

class EmailService {
    static async enviarConfirmacao(agendamento) {
        try {
            const mailOptions = {
                from: '"Barbearia Estilo" <seuemail@gmail.com>',
                to: agendamento.email,
                subject: 'Confirmação de Agendamento - Barbearia Estilo',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #333;">Olá ${agendamento.nome}!</h2>
                        <p>Seu agendamento foi realizado com sucesso!</p>
                        
                        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                            <h3 style="color: #666;">Detalhes do Agendamento:</h3>
                            <p><strong>Serviço:</strong> ${agendamento.servico}</p>
                            <p><strong>Data:</strong> ${new Date(agendamento.data).toLocaleDateString('pt-BR')}</p>
                            <p><strong>Horário:</strong> ${agendamento.horario}</p>
                            <p><strong>Código:</strong> ${agendamento.id}</p>
                        </div>
                        
                        <p>Para cancelar ou alterar seu horário, entre em contato conosco.</p>
                        <p>Aguardamos você!</p>
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #888; font-size: 12px;">
                            <p>Barbearia Estilo<br>
                            Telefone: (11) 99999-9999<br>
                            Endereço: Rua Exemplo, 123 - Centro</p>
                        </div>
                    </div>
                `
            };
            
            const info = await transporter.sendMail(mailOptions);
            console.log('Email enviado:', info.messageId);
            return { success: true, message: 'Email enviado com sucesso' };
        } catch (error) {
            console.error('Erro ao enviar email:', error);
            return { success: false, message: 'Erro ao enviar email' };
        }
    }
    
    static async enviarLembrete(agendamento) {
        try {
            const mailOptions = {
                from: '"Barbearia Estilo" <seuemail@gmail.com>',
                to: agendamento.email,
                subject: 'Lembrete - Seu horário na Barbearia Estilo',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #333;">Lembrete de Agendamento</h2>
                        <p>Olá ${agendamento.nome}, seu horário está chegando!</p>
                        
                        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                            <p><strong>Serviço:</strong> ${agendamento.servico}</p>
                            <p><strong>Data:</strong> ${new Date(agendamento.data).toLocaleDateString('pt-BR')}</p>
                            <p><strong>Horário:</strong> ${agendamento.horario}</p>
                        </div>
                        
                        <p>Confirme sua presença ou entre em contato para cancelar.</p>
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #888; font-size: 12px;">
                            <p>Barbearia Estilo<br>
                            Telefone: (11) 99999-9999</p>
                        </div>
                    </div>
                `
            };
            
            const info = await transporter.sendMail(mailOptions);
            return { success: true, message: 'Lembrete enviado' };
        } catch (error) {
            console.error('Erro ao enviar lembrete:', error);
            return { success: false, message: 'Erro ao enviar lembrete' };
        }
    }
}

module.exports = EmailService;
