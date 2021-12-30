const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const danger_alert = document.getElementById('reg_alert');
danger_alert.style.display= "none";
const form = document.getElementById('formLogin');
const reg_nome=document.getElementById('nome').value;
const reg_password=document.getElementById('password').value;
const reg_email=document.getElementById('email').value;
let utenti = []
signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});
function iscrizione() {
	danger_alert.innerHTML=""
	
	if (reg_nome=="" || reg_password=="" || reg_email=="") {
		if (reg_nome=="") {
			gestisciDanger("nome");
		}
		if (reg_password=="") {
			gestisciDanger("password");
		}
		if (reg_email=="") {
			gestisciDanger("email");
		}
		return danger_alert.style.display="block";
	}
	if (window.localStorage.length!=0) {
			utenti= JSON.parse(window.localStorage.getItem('utenti'));
	}
	
	let utente = {			// oggetto json registrazione 										
		nome : reg_nome,
		password : reg_password,
		email : reg_email
	}
	utenti.push(utente);
	window.localStorage.setItem('utenti',JSON.stringify(utenti))
	//window.location.href="home.html"
	console.log(utenti)
	alert(reg_nome+" ti sei registrato con successo! ora puoi loggarti")

} 
function gestisciDanger(params){
	danger_alert.innerHTML += "ti manca compilare il campo : " + params +"<br>";
}

function controlloEmail(){
	if (window.localStorage.length!=0) {
			utenti= JSON.parse(window.localStorage.getItem('utenti'));
	}else{
		return
	}
	
	if(utenti.filter(x => x.email==reg_email)!=undefined ){
		danger_alert.style.display= "block";
		danger_alert.innerHTML=""
		danger_alert.innerHTML = "email gia registrata!";
	}
}
function accesso(event) {      //PRIMO MODO 
	event.preventDefault(); 
	utentiRegistrati= JSON.parse(window.localStorage.getItem('utenti'))

	let log_email= document.getElementById('accessoEmail').value;
	let log_password= document.getElementById('accessoPassword').value;
	//console.log(window.localStorage.length)
	if (window.localStorage.length==0) {    //controllo dello storage, se vuoto gli dico di registrarsi!
		
		danger_alert.style.display= "block";
		danger_alert.innerHTML=""
		//console.log("non registrato")	
		return danger_alert.innerHTML = "non ti sei ancora registrato!";
	}else if (log_email==""|| log_password=="") {
				danger_alert.style.display= "block";
				danger_alert.innerHTML=""
				return danger_alert.innerHTML = "uno dei due campi login è vuoto!";
	}

	for (var i = 0; i <utentiRegistrati.length; i++) {
		if (utentiRegistrati[i].email==log_email) {
			if (utentiRegistrati[i].password==log_password) {
				alert("login avvenuto con successo!")
				window.location.href=formLogin.getAttribute("action") 
			}else{
				danger_alert.style.display= "block";
				danger_alert.innerHTML=""
				return danger_alert.innerHTML = "password errata!";
			}
			
		}

	}
	 // vado a prendere il contenuto dell' attributo action
	//console.log(window.localStorage.getItem('utenti'))


}

/*formLogin.addEventListener("submit",(event)=>{     //SECONDO MODO	 in questo modo vado a dire cosa fare dopo che si clicca submit
	event.preventDefault(); 
	utentiRegistrati= JSON.parse(window.localStorage.getItem('utenti'))

	let log_email= document.getElementById('accessoEmail').value;
	let log_password= document.getElementById('accessoPassword').value;
	//console.log(window.localStorage.length)
	if (window.localStorage.length==0) {    //controllo dello storage, se vuoto gli dico di registrarsi!
		
		danger_alert.style.display= "block";
		danger_alert.innerHTML=""
		//console.log("non registrato")	
		return danger_alert.innerHTML = "non ti sei ancora registrato!";
	}

	for (var i = 0; i <utentiRegistrati.length; i++) {
		if (utentiRegistrati[i].email==log_email) {
			if (utentiRegistrati[i].password==log_password) {
				alert("login avvenuto con successo!")
			}/*else{
				danger_alert.style.display= "block";
				danger_alert.innerHTML=""
				return danger_alert.innerHTML = "password errata!";
			}
			
		}
	}
	//window.location.href=formLogin.getAttribute("action")  // vado a prendere il contenuto dell' attributo action
	//console.log(window.localStorage.getItem('utenti'))

}) */