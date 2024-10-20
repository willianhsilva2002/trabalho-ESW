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
            { nome: "Ana Oliveira", data_nascimento: "1992-04-18", contato: "ana@mail.com", tipo: "residente" },
            { nome: "Fernando Lima", data_nascimento: "1988-11-30", contato: "fernando@mail.com", tipo: "funcionario" },
            { nome: "Patrícia Costa", data_nascimento: "1995-07-21", contato: "patricia@mail.com", tipo: "voluntario" },
            { nome: "Eduardo Martins", data_nascimento: "1987-03-12", contato: "eduardo@mail.com", tipo: "residente" },
            { nome: "Juliana Ferreira", data_nascimento: "1993-09-05", contato: "juliana@mail.com", tipo: "funcionario" },
            { nome: "Roberto Santos", data_nascimento: "1991-06-15", contato: "roberto@mail.com", tipo: "voluntario" },
            { nome: "Camila Rodrigues", data_nascimento: "1989-08-25", contato: "camila@mail.com", tipo: "residente" },
            { nome: "Ricardo Alves", data_nascimento: "1994-02-20", contato: "ricardo@mail.com", tipo: "funcionario" },
            { nome: "Larissa Mendes", data_nascimento: "1996-10-10", contato: "larissa@mail.com", tipo: "voluntario" },
            { nome: "Jorge Nascimento", data_nascimento: "1980-12-01", contato: "jorge@mail.com", tipo: "residente" },
            { nome: "Sofia Ribeiro", data_nascimento: "1997-05-14", contato: "sofia@mail.com", tipo: "funcionario" },
            { nome: "Victor Hugo", data_nascimento: "1992-09-29", contato: "victor@mail.com", tipo: "voluntario" },
            { nome: "Gustavo Barros", data_nascimento: "1983-11-02", contato: "gustavo@mail.com", tipo: "residente" },
            { nome: "Thais Lima", data_nascimento: "1988-04-28", contato: "thais@mail.com", tipo: "funcionario" },
            { nome: "Fábio Silva", data_nascimento: "1991-07-17", contato: "fabio@mail.com", tipo: "voluntario" },
            { nome: "Lúcia Almeida", data_nascimento: "1986-03-03", contato: "lucia@mail.com", tipo: "residente" },
            { nome: "Samuel Oliveira", data_nascimento: "1990-02-15", contato: "samuel@mail.com", tipo: "funcionario" },
            { nome: "Vanessa Martins", data_nascimento: "1994-08-09", contato: "vanessa@mail.com", tipo: "voluntario" },
            { nome: "Paulo Henrique", data_nascimento: "1985-10-24", contato: "paulo@mail.com", tipo: "residente" },
            { nome: "Mariana Ferreira", data_nascimento: "1993-12-13", contato: "mariana@mail.com", tipo: "funcionario" },
            { nome: "Roberta Costa", data_nascimento: "1995-06-30", contato: "roberta@mail.com", tipo: "voluntario" },
            { nome: "Felipe Santos", data_nascimento: "1989-11-20", contato: "felipe@mail.com", tipo: "residente" },
            { nome: "Aline Lopes", data_nascimento: "1992-03-04", contato: "aline@mail.com", tipo: "funcionario" },
            { nome: "Rafael Pereira", data_nascimento: "1991-09-17", contato: "rafael@mail.com", tipo: "voluntario" },
            { nome: "Marcio Silva", data_nascimento: "1998-07-05", contato: "marcio@mail.com", tipo: "residente" },
            { nome: "Tatiane Almeida", data_nascimento: "1987-02-16", contato: "tatiane@mail.com", tipo: "funcionario" },
            { nome: "Diego Costa", data_nascimento: "1994-04-23", contato: "diego@mail.com", tipo: "voluntario" },
            { nome: "Bruna Souza", data_nascimento: "1990-08-10", contato: "bruna@mail.com", tipo: "residente" },
            { nome: "Luan Ferreira", data_nascimento: "1996-12-31", contato: "luan@mail.com", tipo: "funcionario" },
            { nome: "Gisele Rodrigues", data_nascimento: "1989-01-05", contato: "gisele@mail.com", tipo: "voluntario" },
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
