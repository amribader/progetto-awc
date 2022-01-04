"use strict;"
// @ts-nocheck

//condition ? exprIfTrue : exprIfFalse 

let users = [];

users = JSON.parse(window.localStorage.users);                //stessa cosa di window.localStorage.getItem("users"); 

//users.push();

//users = window.localStorage.getItem("users");

const sessionID = window.sessionStorage.getItem("sessionID");

console.log(users)

if (!sessionID) {//se è undifined
	window.location.replace("login.html");
}


function customizePage() {

	console.log(users)
	//(JSON.parse(sessionStorage.getItem("sessionID"))) ? sessionID = (JSON.parse(sessionStorage.getItem("sessionID"))) : window.location.replace("login.html");
	console.log(sessionID);


	/*
	* SECONDO MODO CON IL METODO FILTER
	*/

	const results = users.find(element => {
		console.log(element.sessionID);
		return element.sessionID === sessionID;
	});

	console.log(results)
	//console.log(utenti.findIndex(results))

	if (!results) {//SE NON TROVA UN UTENTE CON QUELLA STESSA SESISONE restituisce true se l'array è vuoto
		alert("dentro if")
		return;
	}

	/*
	
		console.log(sessionID)
		console.log(typeof sessionID)
		const users = localStorage.getItem("users");
		div = document.getElementById("container_personal_info")
	
		//console.log(div);
	*/
	const personal_info = document.getElementById("container_personal_info")

	personal_info.innerHTML = "<span id='span' class='home_text'><small>" + results.nome + "</small><h1 class=''>" + results.nome + "</h1><h3>" + results.nome + ".</h3><a class='green_btn' role='button' href='#'>Web Player</a></span>";

	//div.innerHTML="<br>CIAO<br><br>CIAO<br><br>CIAO<br><br>CIAO<br><br>CIAO<br><br>CIAO<br><br>CIAO<br><br>CIAO<br>";

}
/*
Una volta ottenuti i Client ID e Client Secret andranno inseriti nel codice javascript e utilizzati per ottenere
un token di accesso. l'access token è necessario per interagire con le API.
Il token ha una validità di un'ora dopo di che dovrà essere rigenerato
*/

function getToken() {
	const client_id = "b0b330b3e4b240ab9b7ca764b5cae0fc"
	const client_secret = "d7a9800054ab4f0f935cc00141f7d349"
	var url = "https://accounts.spotify.com/api/token"
	fetch(url, {
		method: "POST",
		headers: {
			Authorization: "Basic " +
				btoa(`${client_id}:${client_secret}`),
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({ grant_type: "client_credentials" }),
	})
		.then((response) => response.json())
		.then((tokenResponse) => {
			console.log(tokenResponse.access_token)
			window.localStorage.setItem("access_token", tokenResponse.access_token)
			//Sarebbe opportuno salvare il token nel local storage
		}
		)

} 
getToken();
function getCategories() {

	const access_token = localStorage.access_token;

	fetch("https://api.spotify.com/v1/browse/categories", {
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + access_token,
		},
	})
		.then((response) => response.json())
		.then((results) => {
			console.log("album ", results)
			//.innerHTML= ;
			return showCategories(results);
		}

		);

}
getCategories();

function showCategories(results) {
	let cards=[]

	//div_categories = document.getElementById("categories")
	/* for(i=0;i<results.items.length;i++){
		divCategories.innerHTML+= results.items[i].icons 
	} */
	console.log("resultCat", results.categories.items)
	console.log("resultCat", typeof results.categories.items)

	results.categories.items.forEach(element => {          // qui mostriamo le categorie tramite un for 
		//console.log(element)
		cards.push(element)
		//div_categories.innerHTML+="<div id='categoryChild' class='row'></div>"
		
		//createCard(categoryChild, element)
		//div_categories.innerHTML+="<br>"
	});
	creaGriglia(cards)
}

/* 
function createCard(div, cat_elem) {//id del div,elem,
	categoryChild=document.getElementById(div)
	console.log(cat_elem)
	console.log(cat_elem.icons.url)

	cat_elem.icons.forEach(element => {
		console.log(element.url)
	});
*/
	// div.innerHTML += "<div class='col card'><img src='" + cat_elem.icons[0].url + "' width='" + cat_elem.icons.width + "'height='" + cat_elem.icons.height + "' class='card-img-top' alt='" + cat_elem.name + "'><div class='card-body box'><p class='card-text box_details'>" + cat_elem.name + "'</p></div></div>" */
	//div.innerHTML+="<br>"
/* }
"<div class='card' style='width: 18rem;'> <img src='' class='card-img-top' alt=''><div class='card-body'><p class='card-text'>.</p></div></div>"
 */ 
function creaGriglia(cat_elem){
	let c = 0;
	console.log(cat_elem)
    div = document.getElementById("container");
    for (i = 0; i < 5; i++) {//righe
      div.innerHTML += "<div class='row' id='row"+i+"'>"
      for (j = 0; j < 4; j++) {
        document.getElementById("row"+i).innerHTML += "<div class='col-sm'>"
		/* createCard("row"+i,) */
        document.getElementById("row"+i).innerHTML += "<div class='card' style='width: 18rem;'> <img src=' " + cat_elem[c].icons[0].url +"' width='" + cat_elem[c].icons.width + "'height='" + cat_elem[c].icons.height +" ' class='card-img-top' alt='" + cat_elem[c].name + "'><div class='card-body'><p class='card-text'>" + cat_elem[c].name + "</p></div></div>"
        document.getElementById("row"+i).innerHTML += "</div>"
		c++
      }
      div.innerHTML += "</div>"//fine riga
    }
    /* div.innerHTML+="</div>"  */
}


//ora dobbiamo mettere i generi cliccabili e discutere se tenere html1 o 2 