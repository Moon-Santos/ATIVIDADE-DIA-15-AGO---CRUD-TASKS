function geral(username) {
	let continuar = true;

	do {
		const pergunta = parseInt(
			prompt(
				'Escolha uma das opções: \n 1-Criação de Tarefa \n 2-Listar Tarefas \n 3-Atualização de Status \n 4-Atualização de Tarefa \n 5-Excluir Tarefa \n 6-Atualizar Local Storage'
			)
		);

		switch (pergunta) {
			case 1:
				const title = prompt('Digite o título da task!');
				const description = prompt('Digite a descrição da task!');
				if (!title) {
					alert('Digite o título da tarefa!');
				} else {
					createTask(username, title, description);
				}
				break;
			case 2:
				listTasks(username);
				break;
			case 3:
				const indexUpdate = parseInt(
					prompt('Digite o index da mensagem que quer mudar o Status!')
				);
				let complete = Number(
					prompt(
						'Digite se quer completar ou não completar a task! 1-Completa | 2-Não Completa'
					)
				);
				let completed;
				if (complete === 1) {
					completed = true;
				} else if (complete === 2) {
					completed = false;
				}
				updateTaskStatus(username, indexUpdate, completed);
				break;
			case 4:
				const indice = parseInt(
					prompt('Digite o index da mensagem que quer mudar o Status!')
				);
				const newTitle = prompt('Digite o novo título da mensagem!');
				const newDescription = prompt('Digite a nova descrição da mensagem!');

				updateTask(username, indice, newTitle, newDescription);
				break;
			case 5:
				const indiceDelete = parseInt(
					prompt('Digite o index da mensagem que quer mudar o Status!')
				);
				deleteTask(username, indiceDelete);
				break;
			case 6:
				continuar = false;
				break;
			default:
				alert('Digite uma das opções corretas!');
				break;
		}
	} while (continuar === true);
}

function createTask(username, title, description) {
	let task = {
		title,
		description,
		completed: false,
	};
	username.tasks.push(task);
	const usernameString = JSON.stringify(username);
	localStorage.setItem(username.username, usernameString);
}

function listTasks(username) {
	for (let index = 0; index < username.tasks.length; index++) {
		console.log(`Índice: ${index} | Título: ${
			username.tasks[index].title
		} | Descrição: ${username.tasks[index].description} | Status: ${
			username.tasks[index].completed ? 'Completa' : 'Não completa'
		}
        `);
	}
}

function updateTaskStatus(username, index, completed) {
	for (let i = 0; i < username.tasks.length; i++) {
		if (username.tasks[i] === username.tasks[index]) {
			username.tasks[i].completed = completed;
			const usernameString = JSON.stringify(username);
			localStorage.setItem(username.username, usernameString);
		}
	}
}

function updateTask(username, index, newTitle, newDescription) {
	for (let i = 0; i < username.tasks.length; i++) {
		if (username.tasks[i] === username.tasks[index]) {
			username.tasks[i].title = newTitle;
			username.tasks[i].description = newDescription;
			const usernameString = JSON.stringify(username);
			localStorage.setItem(username.username, usernameString);
		}
	}
}

function deleteTask(username, index) {
	for (let i = 0; i < username.tasks.length; i++) {
		if (username.tasks[i] === username.tasks[index]) {
			username.tasks.splice(username.tasks[i], 1);
			const usernameString = JSON.stringify(username);
			localStorage.setItem(username.username, usernameString);
		}
	}
}

const buttonCreate = document.getElementById('createUser');

buttonCreate.addEventListener('click', function prompts() {
	const user = prompt('Digite o nome de usuário!');
	const senha = prompt('Digite a senha que deseja!');
	createUser(user, senha);
});

function createUser(username, password) {
	if (!username || !password) {
		alert('Preencha os 2 campos!');
	} else {
		const usuario = {
			username,
			password,
			tasks: [],
		};
		const usuarioLocal = JSON.stringify(usuario);
		localStorage.setItem(usuario.username, usuarioLocal);
		alert('Usuário Cadastrado com sucesso!');
	}
}

const buttonLogin = document.getElementById('login');

buttonLogin.addEventListener('click', function prompts() {
	const user = prompt('Digite o nome de usuário!');
	const senha = prompt('Digite a senha que deseja!');
	login(user, senha);
});

function login(username, password) {
	const user = localStorage.getItem(username);
	const userObject = JSON.parse(user);
	if (userObject.username !== username || userObject.password !== password) {
		alert('Usuário ou senha não correspondem!');
	} else {
		geral(userObject);
	}
}
