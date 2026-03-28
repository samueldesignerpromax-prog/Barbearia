const API_URL = 'http://localhost:3000/api/agendamentos';

// Elementos do DOM
const bookingForm = document.getElementById('bookingForm');
const dataInput = document.getElementById('data');
const horarioSelect = document.getElementById('horario');
const mensagemDiv = document.getElementById('mensagem');

// Função para mostrar mensagem
function mostrarMensagem(texto, tipo) {
    mensagemDiv.textContent = texto;
    mensagemDiv.className = `message ${tipo}`;
    
    setTimeout(() => {
        mensagemDiv.textContent = '';
        mensagemDiv.className = 'message';
    }, 5000);
}

// Função para carregar horários disponíveis
async function carregarHorarios(data) {
    if (!data) return;
    
    try {
        const response = await fetch(`${API_URL}/horarios/disponiveis?data=${data}`);
        const data_horarios = await response.json();
        
        horarioSelect.innerHTML = '<option value="">Selecione um horário</option>';
        
        data_horarios.horarios.forEach(horario => {
            const option = document.createElement('option');
            option.value = horario;
            option.textContent = horario;
            horarioSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar horários:', error);
        mostrarMensagem('Erro ao carregar horários disponíveis', 'error');
    }
}

// Evento para quando a data é alterada
dataInput.addEventListener('change', (e) => {
    carregarHorarios(e.target.value);
});

// Função para agendar
async function agendarHorario(dados) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            mostrarMensagem('Agendamento realizado com sucesso! Verifique seu email.', 'success');
            bookingForm.reset();
            horarioSelect.innerHTML = '<option value="">Selecione um horário</option>';
        } else {
            mostrarMensagem(result.error || 'Erro ao realizar agendamento', 'error');
        }
    } catch (error) {
        console.error('Erro ao agendar:', error);
        mostrarMensagem('Erro de conexão com o servidor', 'error');
    }
}

// Evento de submit do formulário
bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const dados = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        servico: document.getElementById('servico').value,
        data: document.getElementById('data').value,
        horario: document.getElementById('horario').value
    };
    
    await agendarHorario(dados);
});

// Configurar data mínima (hoje)
const hoje = new Date().toISOString().split('T')[0];
dataInput.min = hoje;
