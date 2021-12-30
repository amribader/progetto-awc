const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const reg_alert = document.getElementById('reg_alert');
const formLogin = document.getElementById('formLogin');
const reg_nome = document.getElementById('nome');
const reg_password = document.getElementById('password');
const reg_email = document.getElementById('email');
const log_email = document.getElementById('accessoEmail').value;
const log_password = document.getElementById('accessoPassword').value;
const formRegistration = document.getElementById('formRegistration');

const rand = () => {
	return Math.random().toString(36).substr(2);
};

const token = () => {
	return rand() + rand();
};

let utenti = [];

reg_alert.style.display = "none";

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

formRegistration.addEventListener('submit', (event) => {
	event.preventDefault();

	console.log("ciao");





	(JSON.parse(window.localStorage.getItem('utenti'))) ? utenti = (JSON.parse(window.localStorage.getItem('utenti'))) : "";



	//CONTROLLO CHE NON CI SIA GIà UN UTENTE REGISTRATO

	const results = utenti.filter(element => {
		console.log(element.email + " " + reg_email.value)
		// 👇️ using AND (&&) operator
		return element.email == reg_email.value;
	});



	if (results.length) {
		console.log("arrayVuoto");
		console.log(results.length);
		showElement("reg_alert");
		gestisciDanger("Esiste già un utente con questa password");
		return;
	}

	console.log(results.length)

	// 👉️ [ {name: 'Carl', age: 30} ]
	console.log(results);
	console.log(results.length);

	let utente = {			// oggetto json registrazione 										
		nome: reg_nome.value,
		password: reg_password.value,
		email: reg_email.value
	}

	utenti.push(utente);
	window.localStorage.setItem('utenti', JSON.stringify(utenti))
	//window.location.href = "home.html"
	console.log(utente)
	//alert(reg_nome + " ti sei registrato con successo!")

});

function iscrizione() {//cambiare con eventListener

	danger_alert.innerHTML = ""


	//non mi piace da cambiare 
	if (reg_nome == "" || reg_password == "" || reg_email == "") {
		if (reg_nome == "") {
			gestisciDanger("nome");
		}
		if (reg_password == "") {
			gestisciDanger("passord");
		}
		if (reg_email == "") {
			gestisciDanger("email");
		}
		danger_alert.style.display = "block";
		return;

	}
	//\utenti=(JSON.parse(window.localStorage.getItem('utenti')));

	(JSON.parse(window.localStorage.getItem('utenti'))) ? utenti = (JSON.parse(window.localStorage.getItem('utenti'))) : "";

	let utente = {			// oggetto json registrazione 										
		nome: reg_nome,
		password: reg_password,
		email: reg_email
	}

	utenti.push(utente);
	window.localStorage.setItem('utenti', JSON.stringify(utenti))
	//window.location.href = "home.html"
	console.log(utente)
	//alert(reg_nome + " ti sei registrato con successo!")

}

function gestisciDanger(params) {
	reg_alert.innerHTML += "Errore: " + params + "<br>";
}

function hideElement(id) {
	document.getElementById(id).style.display = "none";
}
function showElement(id) {
	document.getElementById(id).style.display = "block";
}







/*
function accesso(event) {
	event.preventDefault();


	
	//console.log(window.localStorage.length)
	if (window.localStorage.length == 0) { //controllo dello storage, se vuoto gli dico di registrarsi!

		danger_alert.style.display = "block";
		danger_alert.innerHTML = ""
		//console.log("non registrato")
		danger_alert.innerHTML = "non ti sei ancora registrato!";
		return //false 
	}

	console.log("ramo vero");
	console.log(formLogin);
	//window.location.href=formLogin.getAttribute('action');
} 
*/


formLogin.addEventListener('submit', (e) => {


	console.log("submit evebt kstener")


	console.log(window.localStorage.length)
	if (window.localStorage.length == 0 || log_email == "" || log_password == "") { //controllo dello storage, se vuoto gli dico di registrarsi!
		e.preventDefault();
		danger_alert.innerHTML = ""
		danger_alert.style.display = "block";

		//console.log("non registrato")
		danger_alert.innerHTML = "non ti sei ancora registrato!";
		return
	}
	e.preventDefault();
	console.log(typeof utenti)
	console.log(utenti)

	utenti = (JSON.parse(window.localStorage.getItem('utenti')))


	console.log(utenti[0].email)
	console.log(log_email)
	console.log(utenti[0].password)
	console.log(log_password)

	const check = utenti.filter(element => { element.email == log_email && element.password == log_password })//&& element.password == log_password 
	console.log(utenti.filter(element => element.email == log_email && element.password == log_password))//&& element.password == log_password 

	console.log(check)
	//check)

	if (check !== undefined) {
		console.log("check è undefind")
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Something went wrong!',
			footer: '<a href="">Why do I have this issue?</a>'
		})
	}

	console.log("ramo vero");
	console.log(formLogin);
	//alert("ciao")
	//window.location.href=formLogin.getAttribute('action');


})