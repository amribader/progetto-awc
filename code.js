"use strict;"
// @ts-nocheck

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const reg_alert = document.getElementById('reg_alert');
const formLogin = document.getElementById('formLogin');
const reg_nome = document.getElementById('nome');
const reg_password = document.getElementById('password');
const reg_email = document.getElementById('email');
const log_email = document.getElementById('accessoEmail');
const log_password = document.getElementById('accessoPassword');
const formRegistration = document.getElementById('formRegistration');

//FUNZIONE PER GENERARE UN TOKEN CASUALE
const rand = () => {
	return Math.random().toString(36).substr(2);
};

const token = () => {
	return rand() + rand();
};

let users = [];

reg_alert.style.display = "none";

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

formRegistration.addEventListener('submit', (event) => {
	event.preventDefault();

	//console.log("ciao");





	(JSON.parse(window.localStorage.getItem('users'))) ? users = (JSON.parse(window.localStorage.getItem('users'))) : "";



	//CONTROLLO CHE NON CI SIA GIà UN UTENTE REGISTRATO

	const results = users.filter(element => {
		//console.log(element.email + " " + reg_email.value)
		return element.email == reg_email.value;
	});



	if (results.length) {
		//console.log("arrayVuoto");
		//console.log(results.length);
		showElement("reg_alert");
		gestisciDanger("Esiste già un utente con questa email!");
		return;
	}

	//console.log(results.length)

	//console.log(results);
	//console.log(results.length);
	
	const sessionID = token();


	let utente = {			// oggetto json registrazione 										
		nome: reg_nome.value,
		password: reg_password.value,
		email: reg_email.value,
		sessionID : sessionID
	}

	sessionStorage.setItem("sessionID", sessionID);

	// Add new data to localStorage Array
	//users[results]['sessionID'] = sessionID;

	// Save back to localStorage
	//localStorage.setItem('users', JSON.stringify(users));

	users.push(utente);
	window.localStorage.setItem('users', JSON.stringify(users))
	//window.location.href = "home.html"
	//console.log(utente)
	//alert(reg_nome + " ti sei registrato con successo!")
	
	window.location.href=formRegistration.getAttribute('action');
});



function gestisciDanger(params) {
	reg_alert.innerHTML = "Errore: " + params + "<br>";
}

function hideElement(id) {
	document.getElementById(id).style.display = "none";
}
function showElement(id) {
	document.getElementById(id).style.display = "block";
}





formLogin.addEventListener('submit', (e) => {

	hideElement("reg_alert");
	//gestisciDanger("");


	//console.log("submit evebt kstener")


	//console.log(window.localStorage.length)
	if (window.localStorage.length == 0) { //controllo dello storage, se vuoto gli dico di registrarsi!
		e.preventDefault();
		reg_alert.innerHTML = ""
		reg_alert.style.display = "block";

		////console.log("non registrato")
		reg_alert.innerHTML = "non ti sei ancora registrato!";
		return
	}
	//e.preventDefault();

	users = (JSON.parse(window.localStorage.getItem('users')))

	//CONTROLLO CHE CI SIA GIà UN UTENTE REGISTRATO CON QUESTE CREDENZIALI
	//CONTROLLO LA CORRETTEZZA DI USERNAME E PASSWORD

	/*
	* PRIMO MODO CON IL METODO FILTER
	*/
	/*
		const results = users.filter(element => {
			//console.log(element.email + " " + reg_email.value)
			// 👇️ using AND (&&) operator
			return element.email == log_email.value && element.password == log_password.value;
		});
	
		if (!results.length) {//restituisce true se l'array è vuoto
			e.preventDefault();
			showElement("reg_alert");
			gestisciDanger("Non esiste un utente con questo indirizzo mail");
			return;
		}
	*/


	/*
	* SECONDO MODO CON IL METODO FILTER
	*/
	/*
		const results = users.find(element => {
			return element.email == log_email.value && element.password == log_password.value;
		});
	
		console.log(results)
		//console.log(users.findIndex(results))
	
		if (results==undefined) {//restituisce true se l'array è vuoto
			e.preventDefault();
			showElement("reg_alert");
			gestisciDanger("Non esiste un utente con questo indirizzo mail");
			alert("dentro if")
			return;
		}
	*/
	/*
		* TERZO MODO CON IL METODO FINDINDEX
		*/

	const results = users.findIndex(element => {
		return element.email == log_email.value && element.password == log_password.value;
	});

	console.log(results)
	//console.log(users.findIndex(results))

	if (results == -1) {//restituisce true se l'array è vuoto o -1 
		e.preventDefault();
		showElement("reg_alert");
		gestisciDanger("Non esiste un utente con questo indirizzo mail o la password è errata!");
		//alert("non sono passato")
		return;
	}





	//alert("passato")

	e.preventDefault();

	//GENERO UN TOKEN PER LA SESSIONE CORRENTE
	//console.log(token())
	//LO AGGIUNGO NEL LOCALSTORAGE DELL'UTENTE CHE HA EFFETTUTO IL LOGIN


	// Get the existing data
	//var existing = localStorage.getItem('myLunch');

	// If no existing data, create an array
	// Otherwise, convert the localStorage string to an array
	//existing = existing ? JSON.parse(existing) : {};


	//console.log(users[0])


	const sessionID = token();

	sessionStorage.setItem("sessionID", sessionID);

	// Add new data to localStorage Array
	users[results]['sessionID'] = sessionID;

	// Save back to localStorage
	localStorage.setItem('users', JSON.stringify(users));


	//console.log(sessionID)
	//console.log(typeof sessionID)


	//console.log("Ho trovato un utente");
	//console.log(formLogin);
	//alert("ciao")
	window.location.href=formLogin.getAttribute('action');
})

