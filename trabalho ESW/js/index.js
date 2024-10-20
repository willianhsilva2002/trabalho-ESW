    document.addEventListener("DOMContentLoaded", function () {
        // Seleciona todos os links da barra lateral
        const menuLinks = document.querySelectorAll(".sidebar nav ul li a");
        // Seleciona todas as seções
        const sections = document.querySelectorAll("main section");

        // Função para ocultar todas as seções
        function hideAllSections() {
            sections.forEach(section => {
                section.style.display = "none";
            });
        }

        // Função para mostrar a seção clicada
        function showSection(sectionId) {
            hideAllSections();
            const targetSection = document.querySelector(sectionId);
            if (targetSection) {
                targetSection.style.display = "block";
            }
        }

        // Inicialmente, oculta todas as seções
        hideAllSections();

        // Adiciona evento de clique a cada link do menu
        menuLinks.forEach(link => {
            link.addEventListener("click", function (e) {
                e.preventDefault(); // Evita que o link tenha o comportamento padrão de navegação
                const sectionId = this.getAttribute("href"); // Pega o ID da seção
                showSection(sectionId); // Exibe a seção correspondente
            });
        });

        // Mostra a primeira seção por padrão quando a página é carregada
        if (menuLinks.length > 0) {
            const firstSectionId = menuLinks[0].getAttribute("href");
            showSection(firstSectionId);
        }

        // Manipulação de campos adicionais com base no tipo de usuário
        const tipoUsuarioSelect = document.getElementById('tipo_usuario');
        const camposAdicionais = document.getElementById('campos_adicionais');

        tipoUsuarioSelect.addEventListener('change', function () {
            const tipo = this.value;
            camposAdicionais.innerHTML = ''; // Limpa os campos adicionais

            if (tipo === 'residente') {
                camposAdicionais.innerHTML = `
                    <label for="historico_medico">Histórico Médico:</label>
                    <input type="file" id="historico_medico" name="historico_medico">

                    <label for="necessidades_especiais">Necessidades Especiais:</label>
                    <input type="text" id="necessidades_especiais" name="necessidades_especiais">

                    <label for="contatos_emergencia">Contatos de Emergência:</label>
                    <input type="text" id="contatos_emergencia" name="contatos_emergencia">
                `;
            } else if (tipo === 'funcionario') {
                camposAdicionais.innerHTML = `
                    <label for="cargo">Cargo:</label>
                    <input type="text" id="cargo" name="cargo">

                    <label for="horarios_trabalho">Horários de Trabalho:</label>
                    <input type="text" id="horarios_trabalho" name="horarios_trabalho">
                `;
            } else if (tipo === 'voluntario') {
                camposAdicionais.innerHTML = `
                    <label for="area_atuacao">Área de Atuação:</label>
                    <input type="text" id="area_atuacao" name="area_atuacao">

                    <label for="horarios_disponiveis">Horários Disponíveis:</label>
                    <input type="text" id="horarios_disponiveis" name="horarios_disponiveis">
                `;
            }
        });

        // Exemplo de dados dos usuários
        let usuarios = [
            { nome: "João Silva", data_nascimento: "1990-01-01", contato: "joao@mail.com", tipo: "residente" },
            { nome: "Maria Souza", data_nascimento: "1985-05-23", contato: "maria@mail.com", tipo: "funcionario" },
            { nome: "Carlos Pereira", data_nascimento: "2000-12-12", contato: "carlos@mail.com", tipo: "voluntario" },
        ];

        // Carregar a lista de usuários
        function carregarUsuarios() {
            const lista = document.getElementById('listaUsuarios');
            lista.innerHTML = ''; // Limpa a lista
            usuarios.forEach((usuario, index) => {
                let divUsuario = document.createElement('div');
                divUsuario.classList.add('card');
                divUsuario.innerHTML = `<h3>${usuario.nome}</h3>`;
                divUsuario.addEventListener('click', () => abrirModal(index));
                lista.appendChild(divUsuario);
            });
        }

        // Abrir Modal com informações do usuário
        let usuarioEditIndex; // Variável para armazenar o índice do usuário sendo editado

        function abrirModal(index) {
            const modal = document.getElementById('modalUsuario');
            const usuario = usuarios[index];
            document.getElementById('modalNomeUsuario').innerText = usuario.nome;
            document.getElementById('modalDataNascimento').innerText = usuario.data_nascimento;
            document.getElementById('modalContato').innerText = usuario.contato;
            document.getElementById('modalTipoUsuario').innerText = usuario.tipo.charAt(0).toUpperCase() + usuario.tipo.slice(1);

            // Limpa o conteúdo do formulário de edição
            document.getElementById('formEdicao').style.display = 'none';
            document.getElementById('edNome').value = '';
            document.getElementById('edDataNascimento').value = '';
            document.getElementById('edContato').value = '';
            document.getElementById('edTipoUsuario').value = '';

            usuarioEditIndex = index; // Armazena o índice do usuário a ser editado

            modal.style.display = 'block';
        }

        // Fechar o modal
        document.querySelector('.close').addEventListener('click', () => {
            document.getElementById('modalUsuario').style.display = 'none';
        });

        // Abrir modo de edição
        document.getElementById('editarUsuario').addEventListener('click', () => {
            const usuario = usuarios[usuarioEditIndex];
            document.getElementById('formEdicao').style.display = 'block';

            // Preencher os campos com as informações do usuário
            document.getElementById('edNome').value = usuario.nome;
            document.getElementById('edDataNascimento').value = usuario.data_nascimento;
            document.getElementById('edContato').value = usuario.contato;
            document.getElementById('edTipoUsuario').value = usuario.tipo;

            // Salvar edições
            document.getElementById('salvarEdicao').onclick = function () {
                usuario.nome = document.getElementById('edNome').value;
                usuario.data_nascimento = document.getElementById('edDataNascimento').value;
                usuario.contato = document.getElementById('edContato').value;
                usuario.tipo = document.getElementById('edTipoUsuario').value;
                carregarUsuarios();
                alert('Usuário atualizado com sucesso!');
                document.getElementById('modalUsuario').style.display = 'none';
            };

            // Excluir usuário
            document.getElementById('excluirUsuario').onclick = function () {
                if (confirm('Deseja excluir este usuário?')) {
                    usuarios.splice(usuarioEditIndex, 1);
                    carregarUsuarios();
                    document.getElementById('modalUsuario').style.display = 'none';
                }
            };
        });

        // Filtros (por nome e tipo de usuário)
        document.getElementById('filtroNome').addEventListener('input', function () {
            let filtroNome = this.value.toLowerCase();
            let filtrados = usuarios.filter(usuario => usuario.nome.toLowerCase().includes(filtroNome));
            exibirUsuariosFiltrados(filtrados);
        });

        document.getElementById('filtroTipo').addEventListener('change', function () {
            let filtroTipo = this.value;
            let filtrados = filtroTipo ? usuarios.filter(usuario => usuario.tipo === filtroTipo) : usuarios;
            exibirUsuariosFiltrados(filtrados);
        });

        function exibirUsuariosFiltrados(filtrados) {
            const lista = document.getElementById('listaUsuarios');
            lista.innerHTML = ''; // Limpa a lista
            filtrados.forEach((usuario, index) => {
                let divUsuario = document.createElement('div');
                divUsuario.classList.add('card');
                divUsuario.innerHTML = `<h3>${usuario.nome}</h3>`;
                divUsuario.addEventListener('click', () => abrirModal(index));
                lista.appendChild(divUsuario);
            });
        }

        // Inicializa a lista de usuários
        carregarUsuarios();
    });

    document.addEventListener("DOMContentLoaded", function () {
        const residentes = [
            { nome: "João Silva", dataNascimento: "1940-02-15" },
            { nome: "Maria Oliveira", dataNascimento: "1938-06-20" }
            // Adicione mais residentes aqui
        ];
    
        const atividades = [
            {
                residente: "João Silva",
                descricao: "Consulta médica de rotina",
                data: "2024-10-20", // Compromisso de hoje
                hora: "10:00",
                tipo: "medico"
            }
        ];
    
        const listaResidentes = document.getElementById('listaResidentes');
        const filtroNomeResidente = document.getElementById('filtroNomeResidente');
        const filtroAtividadeTipo = document.getElementById('filtroAtividadeTipo');
        const modalAtividade = document.getElementById('modalAtividade');
        const formAtividade = document.getElementById('formAtividade');
        const listaAlertas = document.getElementById('listaAlertas');
        const closeModalButton = document.querySelector('.modal .close'); // Corrigido o seletor
    
        // Função para renderizar lista de residentes
        const renderResidentes = () => {
            listaResidentes.innerHTML = '<h3>Residentes</h3>';
            residentes.forEach((residente, index) => {
                const residenteDiv = document.createElement('div');
                residenteDiv.classList.add('residente');
                residenteDiv.innerHTML = `<p class="nomeResidente">${residente.nome}</p>`;
                residenteDiv.addEventListener('click', () => openModalAtividade(residente));
                listaResidentes.appendChild(residenteDiv);
            });
        };
    
        // Função para abrir modal de atividade
        const openModalAtividade = (residente) => {
            document.getElementById('nomeResidenteModal').textContent = residente.nome;
            modalAtividade.style.display = "block";
        };
    
        // Fechar modal ao clicar no botão "X"
        closeModalButton.addEventListener('click', () => {
            modalAtividade.style.display = "none";
        });
    
        // Fechar modal ao clicar fora do conteúdo do modal
        window.addEventListener('click', (event) => {
            if (event.target == modalAtividade) {
                modalAtividade.style.display = "none";
            }
        });
    
        // Registrar atividade
        formAtividade.addEventListener('submit', (e) => {
            e.preventDefault();
            const atividade = {
                residente: document.getElementById('nomeResidenteModal').textContent,
                descricao: formAtividade.descricao.value,
                data: formAtividade.dataAtividade.value,
                hora: formAtividade.horaAtividade.value,
                tipo: formAtividade.tipoAtividade.value
            };
            atividades.push(atividade);
            formAtividade.reset();
            modalAtividade.style.display = "none";
            renderAlertas();
        });
    
        // Filtrar residentes
        filtroNomeResidente.addEventListener('input', () => {
            renderResidentes();
        });
    
        // Renderizar alertas
        const renderAlertas = () => {
            listaAlertas.innerHTML = '';
            const hoje = new Date().toISOString().split('T')[0]; // Data de hoje
            atividades.forEach(atividade => {
                if (atividade.data === hoje) {
                    const alerta = document.createElement('li');
                    alerta.textContent = `${atividade.residente}: ${atividade.descricao} às ${atividade.hora}`;
                    listaAlertas.appendChild(alerta);
                }
            });
        };
    
        renderResidentes(); // Renderizar residentes na inicialização
        renderAlertas(); // Renderizar alertas na inicialização
    });
    