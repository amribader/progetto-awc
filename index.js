"use strict;"
// @ts-nocheck

//condition ? exprIfTrue : exprIfFalse 

//nel caso non funzionasse provare ad xcreare il token nel momento in cui si effettua il login
function reload(){
    location.reload();
}
//
//reload();

function hideElement(id) {
    document.getElementById(id).style.display = "none";
}

function showElement(id) {
    document.getElementById(id).style.display = "block";
}


const container = document.getElementById("container");
//container.style.display = "none";


const SettingsAccount = document.getElementById("SettingsAccount");

SettingsAccount.style.display = "none";
//SettingsAccount.style.display = "block";

modifyProfile.style.display = "none"; //nico

modifyAccount.style.display = "none"; //io

modifyPreference.style.display = "none";

cancellaUtente.style.display = "none";

document.getElementById('divPlaylist').style.display = "none";
document.getElementById('CreaPlaylist').style.display = "none";
document.getElementById('divCommunity').style.display = "none";
document.getElementById('MyAllCommunity').style.display = "none";





let users = [];

users = JSON.parse(window.localStorage.users); //stessa cosa di window.localStorage.getItem("users"); 

//users.push();

//users = window.localStorage.getItem("users");

const sessionID = window.sessionStorage.getItem("sessionID");
////////console.log(sessionID)
////////////////console.log(users)

if (!sessionID) { //se è undifined
    window.location.replace("index.html");
}

let utenteLoggato;
//avendo scelto la sincronitcità le altre funzioni sono più veloci e quindi si generano errori.
function getToken() {              //funzione per far accedere il client all'api
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
        .then((response) => {
            //console.log(response)
            if (response.ok) {//Contenuto ricevuto
                //console.log("OK")
            }
            if (response.status >= 100 && response.status < 200) {
                //console.log("Informazioni per il client ->"+response.message);
            }
            if (response.status >= 300 && response.status < 399) {
                //console.log("Redirezione ->"+response.message);
            }
            if (response.status >= 400 && response.status < 499) {
                //console.log("Richiesta errata ->"+response.message);
            }
            if (response.status >= 500 && response.status < 599) {
                //console.log("Errore sul server ->"+response.message);
            }
            return response.json()
        }).catch(error => {
            alert("Si è verificato un errore")
            window.location.replace("index.html");
            return //console.log("Si è verificato un errore! ->",error)
        })
        .then((tokenResponse) => {
            /////console.log(tokenResponse)//questa api non presenta il classico.ok quindi procedo senza i classici controlli
            //console.log(tokenResponse)
            if(!tokenResponse.access_token){//se è undifined
                //console.log("Si è verificato un errore! ->"+tokenResponse.error_description);
                return
            }
            window.localStorage.setItem("access_token", tokenResponse.access_token)
            getCategories();
        }).catch(error => console.log("Si è verificato un errore!",error))

}
getToken();


function customizePage() {
    ////////////console.log("customized")
    ////////////////console.log(users)
    //(JSON.parse(sessionStorage.getItem("sessionID"))) ? sessionID = (JSON.parse(sessionStorage.getItem("sessionID"))) : window.location.replace("login.html");
    ////////////////console.log(sessionID);


    /*
     * SECONDO MODO CON IL METODO FILTER
     */

    const results = users.find(element => {
        ////////////////console.log(element.sessionID);
        return element.sessionID === sessionID;
    });

    ////////////////console.log(results)

    utenteLoggato = results;

    ////////////////console.log(utenteLoggato)
    //////////////////console.log(utenti.findIndex(results))

    if (!results) { //SE NON TROVA UN UTENTE CON QUELLA STESSA SESISONE restituisce true se l'array è vuoto
        alert("dentro if")
        return;
    }

    /*
	
        ////////////////console.log(sessionID)
        ////////////////console.log(typeof sessionID)
        const users = localStorage.getItem("users");
        div = document.getElementById("container_personal_info")
	
        //////////////////console.log(div);
    */
    const personal_info = document.getElementById("container_personal_info")
    personal_info.innerHTML = ""
    personal_info.innerHTML += "<div><img src='' class='img-fluid' alt=''></div>";
    personal_info.innerHTML += "<span id='span' class='home_text'><small>" + results.email + "</small><h1>Benvenuto</h1></span><h2 class=''><strong>" + results.nome + "!</strong></h2>";

    //div.innerHTML="<br>CIAO<br><br>CIAO<br><br>CIAO<br><br>CIAO<br><br>CIAO<br><br>CIAO<br><br>CIAO<br><br>CIAO<br>";

}

customizePage();
/*
Una volta ottenuti i Client ID e Client Secret andranno inseriti nel codice javascript e utilizzati per ottenere
un token di accesso. l'access token è necessario per interagire con le API.
Il token ha una validità di un'ora dopo di che dovrà essere rigenerato
*/


function getCategories() {

    const access_token = localStorage.access_token;

    fetch("https://api.spotify.com/v1/browse/categories", {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
        },
    })
        .then((response) => {
            
            if (response.ok) {//Contenuto ricevuto
                console.log("OK")
                return response.json()
            }
            if (response.status >= 100 && response.status < 200) {
                console.log("Informazioni per il client");
            }
            if (response.status >= 300 && response.status < 399) {
                console.log("Redirezione");
            }
            if (response.status >= 400 && response.status < 499) {
                console.log("Richiesta errata");
            }
            if (response.status >= 500 && response.status < 599) {
                console.log("Errore sul server");
            }
            //console.log(response)
            //console.log(response.ok)
            //return response.json()//lo ritorno in ogni caso visto che l'errore //nno fuunziona più
        }).catch(error => console.log("Si è verificato un errore!"))
        .then((results) => {
            console.log(results)
            console.log(results.ok)
            

            ////////////////console.log("album ", results)
            //.innerHTML= ;
            return showCategories(results);
        }

        );

}

//getCategories();//faccio si che venga richimata da getToken, eesendo questa una funzione più veloce di get token, provaca degli errori

let cards = []


function showCategories(results) {


    //div_categories = document.getElementById("categories")
    /* for(i=0;i<results.items.length;i++){
        divCategories.innerHTML+= results.items[i].icons 
    } */
    ////////////////console.log("resultCat", results.categories.items)
    ////////////////console.log("resultCat", typeof results.categories.items)

    results.categories.items.forEach(element => { // qui mostriamo le categorie tramite un for 
        //////////////////console.log(element)
        cards.push(element)
        //div_categories.innerHTML+="<div id='categoryChild' class='row'></div>"

        //createCard(categoryChild, element)
        //div_categories.innerHTML+="<br>"
    });
    //////////////console.log(cards)
    createCardGrid(cards)
}

/* 
function createCard(div, cat_elem) {//id del div,elem,
    categoryChild=document.getElementById(div)
    ////////////////console.log(cat_elem)
    ////////////////console.log(cat_elem.icons.url)

    cat_elem.icons.forEach(element => {
        ////////////////console.log(element.url)
    });
*/
// div.innerHTML += "<div class='col card'><img src='" + cat_elem.icons[0].url + "' width='" + cat_elem.icons.width + "'height='" + cat_elem.icons.height + "' class='card-img-top' alt='" + cat_elem.name + "'><div class='card-body box'><p class='card-text box_details'>" + cat_elem.name + "'</p></div></div>" */
//div.innerHTML+="<br>"



/* }
"<div class='card' style='width: 18rem;'> <img src='' class='card-img-top' alt=''><div class='card-body'><p class='card-text'>.</p></div></div>"
 */

function creaGriglia(cat_elem) {
    let c = 0;
    //////////////console.log(cat_elem)
    div = document.getElementById("container");
    for (i = 0; i < 5; i++) { //righe
        div.innerHTML += "<div class='row' id='row" + i + "'>"
        for (j = 0; j < 4; j++) {
            document.getElementById("row" + i).innerHTML += "<div class='col-sm'>"
            /* createCard("row"+i,) */
            document.getElementById("row" + i).innerHTML += "<div class='card' style='width: 12rem;'> <img src=' " + cat_elem[c].icons[0].url + "' width='" + cat_elem[c].icons.width + "'height='" + cat_elem[c].icons.height + " ' class='card-img-top' alt='" + cat_elem[c].name + "'><div class='card-body'><p class='card-text'>" + cat_elem[c].name + "</p></div></div>"
            document.getElementById("row" + i).innerHTML += "</div>"
            c++
        }
        div.innerHTML += "<br><br><br></div>" //fine riga
    }
    /* div.innerHTML+="</div>"  */
}

function createCardGrid(cat_elem) {
    //console.log(cat_elem)
    let c = 0;
    //////////////console.log(cat_elem)
    //////////////console.log(cat_elem[0])
    //////////////console.log(cat_elem[0].id)
    //////////////console.log(cat_elem[0].icons)
    //////////////console.log(cat_elem[0].icons[0].url)
    //////////////console.log(cat_elem[0].icons.url)
    //////////////console.log(typeof cat_elem[0].icons.url)
    //console.log(Math.ceil(cat_elem.length / 4), Math.floor(cat_elem.length / 5))
    div = document.getElementById("container");
    for (i = 0; i < Math.ceil(cat_elem.length / 4); i++) { //righe
        for (j = 0; j < Math.floor(cat_elem.length / 5); j++) {

            ////////////////console.log(cat_elem[c]);
            //////////////console.log(c);
            //console.log(cat_elem[c])
            div.innerHTML += "<label  class='card'><input name='chk' id='" + cat_elem[c].id + "' class='card__input' type='checkbox'/><div class='card__body'><div class='card__body-cover'><img class='card__body-cover-image' src='" + cat_elem[c].icons[0].url + "' width='" + cat_elem[c].icons[0].width + "'height='" + cat_elem[c].icons[0].height + " ' alt='" + cat_elem[c].name + "' /><span class='card__body-cover-checkbox'> <svg class='card__body-cover-checkbox--svg' viewBox='0 0 12 10'><polyline points='1.5 6 4.5 9 10.5 1'></polyline></svg></span></div><header class='card__body-header'><h2 class='card__body-header-title'>" + cat_elem[c].name + "</h2><p class='card__body-header-subtitle'>" + cat_elem[c].name + "</p></header></div>"


            //div.innerHTML += "<label id='"+cat_elem[c].id+"' class='card' ><input name='chk' class='card__input' type='checkbox'/><div class='card__body'><div class='card__body-cover'><img class='card__body-cover-image' src='" + cat_elem[c].icons[0].url + "' width='" + cat_elem[c].icons[0].width + "'height='" + cat_elem[c].icons[0].height + " ' alt='" + cat_elem[c].name + "' /><span class='card__body-cover-checkbox'> <svg class='card__body-cover-checkbox--svg' viewBox='0 0 12 10'><polyline points='1.5 6 4.5 9 10.5 1'></polyline></svg></span></div><header class='card__body-header'><h2 class='card__body-header-title'>" + cat_elem[c].name + "</h2><p class='card__body-header-subtitle'>" + cat_elem[c].name + "</p></header></div>"

            c++;
        }
    }
}

function salvaGeneri(sorgente) {//VIENE CHIMATA AL CLICK DEL PULSANTE SALVA
    let userCard = []; //localStorage.users[users.indexOf(utenteLoggato)].favoriteCategories;
    
    //userCard = users[users.indexOf(utenteLoggato)].favoriteCategories;

    (users[users.indexOf(utenteLoggato)].favoriteCategories) ? userCard = users[users.indexOf(utenteLoggato)].favoriteCategories : "";


    
    

    var element = document.getElementsByName('chk');
    //////////////console.log(element);
    element.forEach(element => {
        //////////////console.log(element);

        if (element.checked) {
            cardId = document.getElementById(element.id)
            //////////////console.log(cardId);
            //////////////console.log(element.id);
            cards.forEach(elem => {
                if (elem.id == element.id) {
                    //////////////console.log(elem)
                    userCard.push(elem);
                }
            });
        }
    });

    //////////////console.log(cards);

    //////////////console.log(userCard);
    //////////////console.log(utenteLoggato);
    //////////////console.log(users.indexOf(utenteLoggato));
    //////////////console.log(users[users.indexOf(utenteLoggato)]);
    //elimino i duplicati
    userCard = [...new Map(userCard.map(item => [item.id, item])).values()]
    
    // Add new data to localStorage Array
    users[users.indexOf(utenteLoggato)]['favoriteCategories'] = userCard;

    // Save back to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    //console.log(sorgente)
    //document.getElementById(sorgente.id).style.display = "none";
    document.getElementById("btnSend").style.visibility = "hidden";
}

const btnSend = document.getElementById("btnSend");
//container = document.getElementById("container");


btnSend.addEventListener('click', () => {
    document.getElementById('container').classList.add("visually-hidden")
    //container.style.display = "none";
    //document.getElementById('container').style.visibility = "collapse";
    //container.style.display = "none";
    Swal.fire( // alert di successo
        'Preferenze salvate con successo!',
        'Ora puoi iniziare a creare le tue playlist!',
        'success'
    )
    SettingsAccount.style.display = "block";
    settingPreference()
});

/* 
const elem = document.getElementById("account");
const modifyAccount = document.getElementById("modifyAccount"); */

const form = document.getElementById('formModifyAccount');
form.addEventListener('submit', logSubmit);


function logSubmit(event) {
    //////////////console.log(event);
    let elem = document.querySelectorAll(".form-check-input");

    elem.forEach(element => {
        if (element.checked) {
            //////////////console.log(element)
            //////////////console.log(element.value)//value email
            //////////////console.log(document.getElementById(element.value))
            //////////////console.log(document.getElementById(element.value).value)//mail associata al campo

            change(element)

        }
    });




    event.preventDefault();
}

function change(element) {    //aggiorna l'utente nello Storage
    let c = element.value;
    //////////////console.log(typeof element.value)
    //////////////console.log(c)
    //////////////console.log(typeof c)
    //////////////console.log(users[users.indexOf(utenteLoggato)])
    //////////////console.log(users[users.indexOf(utenteLoggato)][c])
    ////////////////console.log(users[users.indexOf(utenteLoggato)].element.value)
    //////////////console.log(document.getElementById(element.value).value)
    //const Account = {username:"Fiat", mail:"500", password:"white"};
    users[users.indexOf(utenteLoggato)][c] = document.getElementById(element.value).value
    //users[users.indexOf(utenteLoggato)]['favoriteCategories'] = userCard;

    // Save back to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    customizePage();
}

//modifyAccount.style.display = "none";

/*
function settings() {

   //modifyAccount.style.display = "block";

   const username = document.getElementById("username");
   const email = document.getElementById("email");
   const password = document.getElementById("password");
   const password_conferma = document.getElementById("password_conferma");

   //////////////console.log(elem);

   



}

*/
/*

var formelem = document.querySelectorAll(".form-check-input");

// Select all checkboxes with the name 'settings' using querySelectorAll.
var checkboxes = document.querySelectorAll(".form-check-input");
let enabledSettings = []


// Use Array.forEach to add an event listener to each checkbox.
checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    enabledSettings = 
      Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
      .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
      .map(i => i) // Use Array.map to extract only the checkbox values from the array of objects.
      
    //////////////console.log(enabledSettings)
  })
}); 
*/
function settingProfile() {
    /* hideElement(document.getElementById('modifyAccount'));
    showElement(document.getElementById('modifyProfile')); */
    document.getElementById('cancellaUtente').style.display = "none";
    document.getElementById('divCommunity').style.display = "none";
    modifyAccount.style.display = "none";
    modifyPreference.style.display = "none";
    divPlaylist.style.display = "none";
    document.getElementById('MyAllCommunity').style.display = "none";
    modifyProfile.style.display = "block";

    if (users[users.indexOf(utenteLoggato)]['biografia'] == undefined) {
        users[users.indexOf(utenteLoggato)]['biografia'] = "inserisci una biografia"
        localStorage.setItem('users', JSON.stringify(users));
    }


    if (users[users.indexOf(utenteLoggato)]['biografia'] != 'undefined' || users[users.indexOf(utenteLoggato)]['biografia'] != "") {
        document.getElementById("bio").value = users[users.indexOf(utenteLoggato)]['biografia']
    }
    /* else{
                users[users.indexOf(utenteLoggato)]['biografia']="inserisci una biografia"
                localStorage.setItem('users', JSON.stringify(users));
            } */




}

cambiaNome.addEventListener('click', () => {
    if (document.getElementById('profileName').value == "") {
        return
    }
    //////////////console.log(utenteLoggato.nome);
    //////////////console.log(typeof nome)
    //utenteLoggato.nome = document.getElementById('profileName').value;
    users[users.indexOf(utenteLoggato)].nome = document.getElementById('profileName').value


    localStorage.setItem('users', JSON.stringify(users));

    customizePage();
});

cambiaBio.addEventListener('click', () => {
    users[users.indexOf(utenteLoggato)]['biografia'] = document.getElementById("bio").value
    localStorage.setItem('users', JSON.stringify(users));

})
const cambiaImg = document.getElementById('cambiaImg')

cambiaImg.addEventListener('click', () => {
    const immagineProfilo1 = document.getElementById("immagineProfilo1")
    immagineProfilo1.innerHTML =""
    console.log("ci sono")
    //////////////console.log(document.getElementById('formFile'))
     formFile = document.getElementById("formFile")
    formFile.style.display = "none";
     
    let urlImmagine = pickImg();
    console.log(urlImmagine)
    immagineProfilo1.innerHTML += `<img src="${urlImmagine}" width='180px'>`; //voglio creare un array qui in javascript con link a delle immagini 
    //e quando clicca sul bottone cambia immagine gliene genero una a caso prendendola dall'array
     //\immagineProfilo1.innerHTML+= "<img src="+document.getElementById('formFile').value+">";
    //users[users.indexOf(utenteLoggato)]['fotoProfilo'] = document.getElementById("formFile").value; */
    
})
    
function pickImg(){
    let arrayImg = ["https://images.everyeye.it/img-singole/articolo-111457-850.jpg","https://static.myluxury.it/myluxury/fotogallery/780X0/127091/lauto-piu-bella-di-sempre-la-jaguar-e-type.jpg","https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/duesenberg-1554214397.jpg?crop=1xw:1xh;center,top&resize=768:*","https://ladecimaarte.files.wordpress.com/2020/09/avengers-08.jpg?w=900&h=507","https://ladecimaarte.files.wordpress.com/2020/09/avengers-06.jpg?w=900&h=473","https://ladecimaarte.files.wordpress.com/2020/09/avengers-05.jpg?w=900&h=507","https://ladecimaarte.files.wordpress.com/2020/09/avengers-03.jpg?w=900&h=507","https://ladecimaarte.files.wordpress.com/2020/09/avengers-04.jpg?w=900&h=507","https://ladecimaarte.files.wordpress.com/2020/09/avengers-01.jpg?w=900&h=507","https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ferrari-f8-tributo-1-1-8-1554215427.jpg?resize=980:*","https://ladecimaarte.files.wordpress.com/2020/09/avengers-02.jpg?w=900&h=507"]
    numeroCasuale = Math.floor(Math.random() * 10);
    console.log(numeroCasuale)
    return arrayImg[numeroCasuale]
}

//mio 
function settingAccount() {
    document.getElementById('cancellaUtente').style.display = "none";
    divPlaylist.style.display = "none";
    modifyPreference.style.display = "none";
    modifyProfile.style.display = "none";
    document.getElementById('divCommunity').style.display = "none";
    document.getElementById('MyAllCommunity').style.display = "none";
    modifyAccount.style.display = "block";
}
// Add new data to localStorage Array


// Save back to localStorage
//localStorage.setItem('users', JSON.stringify(users));

function settingPreference() {
    //////////////console.log("sono dentro settingPreference")
    divPlaylist.style.display = "none";
    document.getElementById('cancellaUtente').style.display = "none";
    document.getElementById('modifyProfile').style.display = "none";
    document.getElementById('modifyAccount').style.display = "none";
    document.getElementById('divCommunity').style.display = "none";
    document.getElementById('modifyPreference').style.display = "block";
    document.getElementById('MyAllCommunity').style.display = "none";


    const table = document.getElementById('tablePreference');

    let pref = users[users.indexOf(utenteLoggato)]["favoriteCategories"];
    //////////////console.log(pref)
    table.innerHTML = "";
    pref.forEach(element => {
        //////////////console.log(element)
        table.innerHTML += "<tr><td>" + element.name + "</td><td><button id='btn" + element.id + "' onclick='settingPreferenceID(this)' type='button' class='btn btn-danger'>X</button></td></tr>"
    });

    /*
        <tr>
        <t row">h scope="row3</th>
        <td colspan="2">Larry the Bird</td>
        <td>@twitter</td>
      </tr>
    */

}

/*
Qundo viene cliccato un bottono rosso, allora scateno l'evetno per rimuovere quella 
*/

function settingPreferenceID(sorgente) {
    //////////////console.log(sorgente);
    let preference = users[users.indexOf(utenteLoggato)]['favoriteCategories']
    //////////////console.log((sorgente.id).slice(-((sorgente.id).length - 3)))
    const result = preference.filter(element => element.id == (sorgente.id).slice(-((sorgente.id).length - 3))) //il -3 toglie la parte con "btn"

    //////////////console.log(preference)

    // result è un array che contiene gli elementi da eliminare 
    result.forEach(element => {
        //////////////console.log(element);
        //////////////console.log(preference.indexOf(element));
        preference.splice(preference.indexOf(element), 1);
    });

    users[users.indexOf(utenteLoggato)]['favoriteCategories'] = preference;

    localStorage.setItem('users', JSON.stringify(users));

    //////////////console.log(users);
    const table = document.getElementById('tablePreference');
    //table.innerHTML = "<tr><td>NON SONO PRESENTI PREFERENZE</td></tr>"
    settingPreference();

}

/*
const settingPreferenceID = document.getElementById("settingPreferenceID");

settingPreferenceID.addEventListener('click', () => {

    const redbtn = document.querySelectorAll(".btn-danger");
    //////////////console.log(redbtn);


    redbtn.forEach(element => {
        //////////////console.log(element)
        element.addEventListener('click', (this) => {
            //////////////console.log(element)
            //////////////console.log(this)
        })
    });

});

*/
/*

var formelem = document.querySelectorAll(".form-check-input");

// Select all checkboxes with the name 'settings' using querySelectorAll.
var checkboxes = document.querySelectorAll(".form-check-input");
let enabledSettings = []


// Use Array.forEach to add an event listener to each checkbox.
checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    enabledSettings = 
      Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
      .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
      .map(i => i) // Use Array.map to extract only the checkbox values from the array of objects.
      
    //////////////console.log(enabledSettings)
  })
}); 
*/


function deleteUser() {
    document.getElementById('modifyProfile').style.display = "none";
    document.getElementById('modifyAccount').style.display = "none";
    document.getElementById('modifyPreference').style.display = "none";
    document.getElementById('divPlaylist').style.display = "none";
    document.getElementById('divCommunity').style.display = "none";
    document.getElementById('MyAllCommunity').style.display = "none";
    document.getElementById('cancellaUtente').style.display = "block";
}

bottoneCancellaUtente.addEventListener('click', () => {
    copiaUtentiSenzaCancellato = users
    //////////////console.log(users)
    /*  for(i=0;i<users.length;i++){
         if users[i]==utenteLoggato{
             
         }
     } */
    copiaUtentiSenzaCancellato.splice(users.indexOf(utenteLoggato), 1)
    localStorage.setItem('users', JSON.stringify(copiaUtentiSenzaCancellato));
    sessionStorage.removeItem("sessionID")
    //////////////console.log(copiaUtentiSenzaCancellato)
    window.location.replace("index.html");

})

function settingPlaylist() {
    document.getElementById('modifyProfile').style.display = "none";
    document.getElementById('modifyAccount').style.display = "none";
    document.getElementById('modifyPreference').style.display = "none";
    document.getElementById('cancellaUtente').style.display = "none";
    document.getElementById('CreaPlaylist').style.display = "none";
    document.getElementById('MyPlaylist').style.display = "none";
    document.getElementById('divPlaylist').style.display = "block";
    document.getElementById('divCommunity').style.display = "none";
    document.getElementById('MyAllCommunity').style.display = "none";

    document.getElementById('PublicPlaylist').style.display = "none";

}

btnAddPreference = document.getElementById("btnAddPreference");

btnAddPreference.addEventListener('click', () => {
    //////////////console.log("sono dentro ")

    //qui
    f()
    document.getElementById('container').classList.remove("visually-hidden")
    //container.style.display = "none";
    //document.getElementById('container').style.visibility = "visible";
    //document.getElementById('container').style.display = "block";
    document.getElementById('SettingsAccount').style.display = "none";
    document.getElementById("btnSend").style.visibility = "visible";
    //document.getElementById("btnSend").style.display = "block";
    /* document.getElementById('AccountSetting').style.display = "none";
    document.getElementById('modifyProfile').style.display = "none";
    document.getElementById('modifyAccount').style.display = "none";
    document.getElementById('modifyPreference').style.display = "none";
    document.getElementById('cancellaUtente').style.display = "none";
    document.getElementById('divPlaylist').style.display = "none";
    document.getElementById('container').style.display="block";  */
});

function f(){
    let userCard = users[users.indexOf(utenteLoggato)].favoriteCategories
    let element = document.getElementsByName('chk');
    //////////////console.log(element);
    let result = userCard.map(item => item.id); 

    console.log(result)
    element.forEach(elem => {
        elem.checked = false;
        if(result.includes(elem.id)){
            console.log(elem)
            elem.checked = true;
        }    
    });
    

    //console.log(result)

}

liNewPlaylist.addEventListener('click', () => {

    //document.getElementById('SettingsAccount').style.display = "none";
    //document.getElementById('CreaPlaylist').style.display = "block";

    document.getElementById('PublicPlaylist').style.display = "none";
    document.getElementById('AccountSetting').style.display = "block";
    document.getElementById('modifyProfile').style.display = "none";
    document.getElementById('modifyAccount').style.display = "none";
    document.getElementById('modifyPreference').style.display = "none";
    document.getElementById('MyPlaylist').style.display = "none";
    document.getElementById('cancellaUtente').style.display = "none";
    document.getElementById('divCommunity').style.display = "none";
    //document.getElementById('divPlaylist').style.display = "block";
    document.getElementById('MyAllCommunity').style.display = "none";

    document.getElementById('CreaPlaylist').style.display = "block";
})










//PARTE 2 GESTIONE PLAYLIST


const createPlaylist = document.getElementById("createPlaylist");

createPlaylist.addEventListener('submit', () => {
    ////////////console.log("on submit")
    event.preventDefault();
    let playlists;
    const collaborative = document.getElementById("collaborative")
    const playlistdescription = document.getElementById("playlistDescription")
    const playlistName = document.getElementById("playlistName")
    const tagPlaylist = document.getElementById("tagPlaylist")
    ////////////console.log(collaborative)
    ////////////console.log(playlistdescription)
    ////////////console.log(playlistName)
    //const collaborative = document.getElementById("playlistImage")//per ora no


    //console.log(tracks)
    //Tolgo i doppioni dall'array tracks così facendo se l'untet aggiunge la stessa canzoni più volte
    //verrà visualizzata solamente una volta. 
    const uniqueObjects = [...new Map(tracks.map(item => [item.id, item])).values()]
    //console.log(uniqueObjects);
    //console.log(tracks)
            

    users[users.indexOf(utenteLoggato)]['Playlists'] ? playlists = users[users.indexOf(utenteLoggato)]['Playlists'] : playlists = [];

    let playlist = { // oggetto json registrazione 										
        collaborative: collaborative.checked,
        description: playlistdescription.value,
        images: [{
            url: "",
            height: 300,
            width: 300
        }],
        name: playlistName.value,
        tag: tagPlaylist.value,
        tracks: uniqueObjects,
        id: Date.now()
    }


    ////////////console.log(collaborative.checked)

    if (collaborative.checked) {


        let publicPlaylists;
        ////////////console.log(publicPlaylists)
        localStorage.publicPL ? publicPlaylists = JSON.parse(localStorage.publicPL) : publicPlaylists = [];
        ////////////console.log(publicPlaylists)
        publicPlaylists.push(playlist)
        ////////////console.log(publicPlaylists)
        localStorage.setItem('publicPL', JSON.stringify(publicPlaylists));
    }

    ////////////console.log(tracks)
    ////////////console.log(playlist)

    playlists.push(playlist);

    ////////////console.log(playlists)

    users[users.indexOf(utenteLoggato)]['Playlists'] = playlists
    localStorage.setItem('users', JSON.stringify(users));


    tracks = [];
    //uniqueObjects = [];

    Swal.fire( // alert di successo
        'Hai aggiunto la playlist con successo!',
        'Ora puoi iniziare a goderti le tue playlist!',
        'success'
    )
    createPlaylist.reset();
    //qui
    
    const trackList = document.getElementById("trackList")
    trackList.innerHTML = "";

});

const searchTrack = document.getElementById("searchTrack")

var resultsTracks;


searchTrack.addEventListener('keyup', searchTrackSpotify)


function searchTrackSpotify() {//NON SI PUò CREARE UNA PLAYLIST SENZA PRIMA AVER AGGIUNTO UNA CANZONE
    ////////////console.log("keyup")
    if(!searchTrack.value.length){//se è vuoto, non faccio la ricerca il campo deve contenere almeno un paramenteo
        return
    }
    //console.log("va bene ")
    const url = "https://api.spotify.com/v1/search?type=album,artist,playlist,track,show,episode&q=" + searchTrack.value;
    getTrack(url, "trackList");
}


function getTrack(url, div) {

    const access_token = localStorage.access_token;

    async function fetchTrack() {           // async e await  abilitano la gestione di funzioni asincrone eseguite tramite un approccio sincrono. 
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + access_token,
            },
        })
        //console.log(response.ok)
        if (response.ok) {//Contenuto ricevuto
            //console.log("OK"+response.status)
        }
        if (response.status >= 100 && response.status < 200) {
            //console.log("Informazioni per il client ->"+response.message);
        }
        if (response.status >= 300 && response.status < 399) {
            //console.log("Redirezione ->"+response.message);
        }
        if (response.status >= 400 && response.status < 499) {
            //console.log("Richiesta errata ->"+response.message);
        }
        if (response.status >= 500 && response.status < 599) {
            //console.log("Errore sul server ->"+response.message);
        }

        //console.log(response)
        const tracks = await response.json();
        return tracks;
    }
    fetchTrack().then((results) => {
        //console.log(results)
        createTrackDetail(results.tracks.items, div)
        resultsTracks = results.tracks.items
        btnAddTrackPlaylist();
    });
}

/*
function getTrack(url) {

    const access_token = localStorage.access_token;


    fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
        },
    })
        .then((response) => response.json())
        .then((results) => {
            //////////////console.log(results)
            createTrackDetail(results.tracks.items)
        });

        
}
*/

function createTrackDetail(results, div) {     //crea la tabella con le informazioni della ricerca 

    trackList = document.getElementById(div);
    trackList.innerHTML = '';

    //console.log(results)
    //////////////console.log(results.tracks)
    //////////////console.log(typeof results)

    results.forEach((element,index) => {
        trackList.innerHTML += "<br><div class='row trackBorder' id='rowItem" + element.id + "' ></div>"
        //console.log(element,index)
        
        //////////////console.log(element.id)
        let img
        let height =64;
        let width = 64;
        if(!element.album.images.length){//se è undefind
            img = "image-not-found-icons.jpg"
        }else{
            img = element.album.images[2].url;
            height = element.album.images[2].height
            width = element.album.images[2].width
        
            
        }
        
        //////////////console.log(img)

        const title = element.name;
        const albumName = element.album.name
        const artist = element.artists[0].name;



        const html =
            `
    <div class="col-1">
        <img src="${img}" height="${height}" width="${width}" alt="">        
    </div>
    <div class="col-4">
        <label for="Genre" class="form-label col-sm-12"><strong>${title}</strong></label>
        <label for="artist" class="form-label col-sm-12"><strong>${artist}</strong></label>
    </div>
    <div class="col-5">
    <label for="artist" class="form-label col-sm-12"><strong>${albumName}</strong></label>
    </div> 
    <div class="col-2">
    <button type="button" id='${element.id}' class="btn btn-dark">AGGIUNGI</button>
    </div> 
    
    `;
        /*
        const html = 
        `
        <div class="col-1">
            <img src="${img}" height="${element.album.images[2].height}" width="${element.album.images[2].width}" alt="">        
        </div>
        <div class="col-3">
            <label for="Genre" class="form-label col-sm-12">${title}:</label>
            
        </div>
         <div class="col-3">
            <label for="artist" class="form-label col-sm-12">By ${artist}:</label>
        </div>  
    
        <div class="col-3">
        <button type="button" class="btn btn-dark">Dark</button>
        </div> 
        
        `;*/
        const rowItem = document.getElementById("rowItem" + element.id)
        //////////////console.log(rowItem)
        rowItem.insertAdjacentHTML('beforeend', html)

    });

}

var tracks = [];

function btnAddTrackPlaylist() { // pulsante nero per aggiungere le canzoni 
    ////////////console.log("sono dentro ")
    const btnAddItem = document.querySelectorAll(".btn-dark")
    ////////////console.log(btnAddItem)
    ////////////console.log(resultsTracks)

    btnAddItem.forEach(element => {
        element.addEventListener('click', () => {
            ////////////console.log(this);
            ////////////console.log(element);

            const found = resultsTracks.find(elem => elem.id == element.id);

            ////////////console.log(found)

            if (!found) { // se non trova una canzone, ma tanto la troverà sempre lo teniamo per sicurezza
                ////////////console.log("non lo trovato")
                return;
            }

            //AGGIUNGO LA TRACK ALL'ARRAY PLAYLIST
            tracks.push(found);
            //QUI
            Swal.fire({ // alert di successo
                title:'Canzone aggiunta con successo!',
                text:'Ora puoi iniziare a goderti le tue playlist!',
                icon:'success',
                footer: 'Ricorda di premere su salva per completare la creazione'
            })
        });
    });
}


/*
createTrackDetail(img, title, artist) {

    const detailDiv = document.querySelector(DOMElements.divSongDetail);
    // any time user clicks a new song, we need to clear out the song detail div
    detailDiv.innerHTML = '';

    const html = 
    `
    <div class="row col-sm-12 px-0">
        <img src="${img}" alt="">        
    </div>
    <div class="row col-sm-12 px-0">
        <label for="Genre" class="form-label col-sm-12">${title}:</label>
    </div>
    <div class="row col-sm-12 px-0">
        <label for="artist" class="form-label col-sm-12">By ${artist}:</label>
    </div> 
    `;

    detailDiv.insertAdjacentHTML('beforeend', html)
}
*/
/*

{
    "collaborative": true,
    "description": "string",
    "images": [
      {
        "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n",
        "height": 300,
        "width": 300
      }
    ],
    "name": "string"
  }*/

function LogOut() { //logout utente, lo rimando alla prima pagina
    window.location.replace("index.html");
}





//------------------------------------------------------//
//FUNZIONE CHE SU LE MIE PLAYLIST MOSTRA UN DIV CHELE MIE PLAYLIST

document.getElementById("liMyPlaylist").addEventListener('click', () => {
    document.getElementById('CreaPlaylist').style.display = "none";
    document.getElementById('MyPlaylist').style.display = "block";
});

//FUNZIONA CHE MOSTRA L'ELENCO DELLE PLAYLIST PRESENTI

const tableMyPlaylist = document.getElementById("tableMyPlaylist");
const liMyPlaylist = document.getElementById("liMyPlaylist");
liMyPlaylist.addEventListener('click', fillTableMyPL);

function fillTableMyPL() {
    ////////////console.log("click su le tue playlist")

    users[users.indexOf(utenteLoggato)]['Playlists'] ? MyPlaylist = users[users.indexOf(utenteLoggato)]['Playlists'] : MyPlaylist = []; //MyPlaylistIsEmpty();

    ////////////console.log(MyPlaylist)
    ////////////console.log(MyPlaylist.length)

    if (!MyPlaylist.length) {
        tableMyPlaylist.innerHTML = "<tr><td></td><td><strong>NON SONO PRESENTI PLAYLIST</strong></td><td></td><td></td></tr>"
        return;
    }


    //////////////console.log(pref)
    tableMyPlaylist.innerHTML = "";

    MyPlaylist.forEach(element => {

        ////////////console.log(element)
        ////////////console.log(element.tracks)


        track_id = element.id;
        /*
        let track_id = Date.now()

        if (element.tracks.length) {
            //tableMyPlaylist.innerHTML = "<tr><td></td><td><strong>ERRORE : SONO PRESENTI PLAYLIST SENZA CANZONI, QUESTE NON VERRANNO VISUALIZZATE</strong></td><td></td><td></td></tr>"
            //track_id = Date.now()
            //return;
            track_id = element.tracks[0].id
        }
        */
        ////////////console.log(element.tracks.name)
        ////////////console.log(element.tracks.name)
        

        if (element.collaborative) {
            isPublic = "PUBBLICO";
            
        } else {
            isPublic = "PRIVATA";
        }
        /* ////////////console.log(element.tracks[0].id)
        ////////////console.log(element.tracks)
        ////////////console.log(element.tracks[0]) */
        //tableMyPlaylist.innerHTML += "<tr class='accordion-toggle collapsed' id='accordion1' data-toggle='collapse' data-parent='#accordion1' href='#collapseOne'><td class='expand-button' ></td><td>" + element.name + "</td><td>" + element.description + "</td><td>" + isPublic + "</td><td><button onclick='deletePlaylist(this)' id='btnDeleteMyPL" + element.tracks[0].id + "' type='button' class='btn btn-danger'>X</button></td><td><button id='btnShowMyPL" + element.tracks[0].id + "' type='button' class='btn btn-primary'>X</button></td></tr>"
        tableMyPlaylist.innerHTML += "<tr data-bs-toggle='collapse' href='#collapseExample" + track_id + "' role='button' aria-expanded='false' aria-controls='collapseExample' ><td></td><td>" + element.name + "</td><td>" + element.description + "</td><td>" + isPublic + "</td><td><button onclick='deletePlaylist(this)' id='btnDeleteMyPL" + track_id + "' type='button' class='btn btn-danger'>X</button></td><td><button id='btnShowMyPL" + track_id + "' type='button' class='btn btn-primary'>X</button></td></tr>"

        //tableMyPlaylist.innerHTML += "<tr class='hide-table-padding'><td></td><td colspan='3'><div id='collapseOne' class='collapse in p-3'><div class='row'>CIAOOOO</div></div></td></tr>"
        //tableMyPlaylist.innerHTML += "<tr><td class='hiddenRow'><div id='demo3' class='accordian-body collapse'>Demo3 sadasdasdasdasdas</div></td></tr>"
        tableMyPlaylist.innerHTML += "<tr class='collapse' id='collapseExample" + track_id + "'><td colspan='6' ><div id='ModifyPL" + track_id + "'>  <div></td></tr>"

        const ModifyPL = document.getElementById("ModifyPL" + track_id);


        //console.log(element.collaborative)

        const html =
            `
        <div class="container-fluid divModifyPlaylist">
        <br><br>
            <form action="#" name="${element.name}"  id="formModifyPlaylist${track_id}" onsubmit="ModifyPlaylistById(this)">
                
                    
                    <div class="mb-3 row">

                    <label for="playlistName" class="form-label col-auto"><strong>Nome playlist</strong></label>

                    <div class="col-3">
                    <input type="text" name="MPLname" id="MPLname${track_id}" class="form-control" value="${element.name}" >
                    </div>
                    

                    <label for="playlistDescription" class="form-label col-auto"><strong>Descrizione Playlist</strong></label>
                    
                    <div class="col-3">
                    <input type="text" name="MPLdesc" id="MPLdesc${track_id}" class="form-control" value="${element.description}">
                    </div>

                    <label for="tagPlaylist" class="form-label"><strong>Tag playlist</strong></label>
                    <div class="col-3">
                    <input type="text" name="MPLtag_" id="MPLtag_${track_id}" class="form-control" value="${element.tag}">
                    </div>
                    </div>
                    
                
                  <div class="form-check form-switch">
                    <input class="form-check-input"  name="MPLcheck" id="MPLcheck${track_id}" type="checkbox" role="switch"> 
                    <label class="form-check-label" for="flexSwitchCheckDefault"><strong>Playlist pubblica</strong></label>
                </div>
                <hr>

                <div id="Tracks${track_id}" class="container row">
                
                <table class="table table-condensed table-responsive">
                    <thead>
                        <tr class="table">
                            <th class="th-sm col-1" scope="col"><strong>TITOLO</strong></th>
                            <th class="th-sm col-3" scope="col"><strong>ARTISTA</strong></th>
                            <th class="th-sm col-3" scope="col"><strong>ALBUM</strong></th>
                            <th class="th-sm col-2" scope="col"><strong>AGGIUNTO IL</strong></th>
                            <th class="th-sm col-2" scope="col"><strong>DURATION</strong></th>
                            <th class="th-sm col-1" scope="col"><strong>Delete</strong></th>
                        </tr>
                    </thead>
                    <tbody id="tableMyPlaylist">
                    </tbody>
                </table>

                </div>


                <div class="mb-3 center" id="divSearchTrack">
                    <label for="AddsearchTrack" class="form-label"><strong>Cerca canzoni</strong></label>
                    <input type="text" class="form-control center" onkeyup="SearchTrackOnSpotify(this)"; id="AddsearchTrack${track_id}"> 
                  </div>

                  <div class="center">
                <button type="submit" class="btn btn-primary btn-lg" >Salva</button> 
                </div>

            </form>

            <div id="AddtrackList${track_id}" class="container" >
                
                </div>

            </div>
        
        `;

        //document.getElementById("MPLcheck" + track_id).checked =  element.collaborative;
        //////////////console.log(rowItem)
        ModifyPL.insertAdjacentHTML('beforeend', html)

        /////////////////////////////INIZIO PARTE RELATIVA LL'INTSERIMENTO DELLE CANZIONI PRESENTI IN UNA PL
        const TracksElem = document.getElementById("Tracks" + track_id)
        //TracksElem.innerHTML+="<br>"

        element.tracks.forEach(elem => {

            const img = elem.album.images[2].url;

            const title = elem.name;
            const albumName = elem.album.name
            const artist = elem.artists[0].name;
            let duration = elem.duration_ms;

            //convert ms to minute

            const date = new Date(duration);

            duration = `${date.getMinutes()}:${date.getSeconds()}`;
            ////////////console.log(duration)
            //end 

            const release_date = elem.album.release_date;
            const html =
                `
    <div class="col-1">
        <img src="${img}" height="${elem.album.images[2].height}" width="${elem.album.images[2].width}" alt="">        
    </div>
    <div class="col-3">
        <label for="Genre" class="form-label col-sm-12"><strong>${title}</strong></label>
        <label for="artist" class="form-label col-sm-12"><strong>${artist}</strong></label>
    </div>
    <div class="col-3">
    <label for="albumName" class="form-label col-sm-12"><strong>${albumName}</strong></label>
    </div> 
    <div class="col-2">
    <label for="release_date" class="form-label col-sm-12"><strong>${release_date}</strong></label>
    </div> 
    <div class="col-2">
    <label for="duration" class="form-label col-sm-12"><strong>${duration}</strong></label>
    </div> 
    <div class="col-1">
    <button id='btnRemoveTrack${elem.id}' name="btnRemoveTrackName${element.name}" onclick='btnRemoveTrack(this)' type='button' class='btn btn-danger'>X</button>
    </div> 
    <br>
    
    `;

            /*  const rowItem = document.getElementById("rowItem" + element.id)
             //////////////console.log(rowItem)
             TracksElem.insertAdjacentHTML('beforeend', html) */
            TracksElem.insertAdjacentHTML('beforeend', html)
        });

        //console.log(document.getElementById("MPLcheck" + track_id))
        //console.log(document.getElementById("MPLcheck" + track_id).checked)
        document.getElementById("MPLcheck" + track_id).checked = element.collaborative
        //console.log(document.getElementById("MPLcheck" + track_id).checked)
        //console.log(element.collaborative)
        

    });



};

function btnRemoveTrack(sorgente) {
    ////////////console.log("ciao")
    ////////////console.log(sorgente)
    ////////////console.log(sorgente.id)
    ////////////console.log(sorgente.name)
    ////////////console.log(sorgente.name)

    let playlists = users[users.indexOf(utenteLoggato)]['Playlists']

    sorgente.name = sorgente.name.slice(-((sorgente.name).length - 18))
    sorgente.id = sorgente.id.slice(-((sorgente.id).length - 14))

    ////////////console.log(sorgente.id)

    ////////////console.log((sorgente.name).slice(-((sorgente.name).length - 18)))
    ////////////console.log(sorgente.name)



    const results = playlists.find(element => {
        return element.name === sorgente.name
    });

    ////////////console.log(playlists.indexOf(results))
    ////////////console.log(results)
    ////////////console.log(playlists[playlists.indexOf(results)])

    const copyTracks = users[users.indexOf(utenteLoggato)]['Playlists'][playlists.indexOf(results)]
    ////////////console.log(copyTracks)

    ////////////console.log(copyTracks.tracks)

    copyTracks.tracks = copyTracks.tracks.filter(element => !(element.id == (sorgente.id)))
    //copyTracks.tracks = copyTracks.tracks.filter(element => ////////////console.log(element.id))
    ////////////console.log(sorgente.id)

    ////////////console.log(copyTracks.tracks)

    users[users.indexOf(utenteLoggato)]['Playlists'][playlists.indexOf(results)] = copyTracks;

    localStorage.setItem('users', JSON.stringify(users));

    fillTableMyPL();



    /* 
        result.forEach(element => {
            //////////////console.log(element);
            //////////////console.log(preference.indexOf(element));
            copyTracks.tracks.splice(preference.indexOf(element), 1);
        }); */

    //copyPlaylist = users[users.indexOf(utenteLoggato)]['Playlists'][playlists.indexOf(results)]

    /*
    let preference = users[users.indexOf(utenteLoggato)]['Playlists']
    ////////////console.log(sorgente.id)
    ////////////console.log((sorgente.id).slice(-((sorgente.id).length - 13)))
    const result = preference.filter(element => element.tracks[0].id == (sorgente.id).slice(-((sorgente.id).length - 13)))  //il -13 toglie la parte con "btn"

    //////////////console.log(preference)

    // result è un array che contiene gli elementi da eliminare 
    result.forEach(element => {
        //////////////console.log(element);
        //////////////console.log(preference.indexOf(element));
        preference.splice(preference.indexOf(element), 1);
    });

    users[users.indexOf(utenteLoggato)]['Playlists'] = preference;

    localStorage.setItem('users', JSON.stringify(users));


    fillTableMyPL();


    ////////////console.log(sorgente)
    ////////////console.log(sorgente.name)
    const results = playlists.find(element => {
        return element.name === sorgente.name
    });

    ////////////console.log(playlists.indexOf(results))
    ////////////console.log(results)
    ////////////console.log(playlists[playlists.indexOf(results)])

    copyPlaylist = users[users.indexOf(utenteLoggato)]['Playlists'][playlists.indexOf(results)]

*/

}



//${element.tracks[0].id}


//CAMBIARE L'ORIGNALE PARAMETRIZZANDO LA FUNZIONE
function SearchTrackOnSpotify(sorgente) {
    ////////////console.log(sorgente);
    ////////////console.log(sorgente.id);
    ////////////console.log((sorgente.id).slice(-((sorgente.id).length - 14)));
    let id = (sorgente.id).slice(-((sorgente.id).length - 14));
    ////////////console.log(sorgente.name);
    const AddsearchTrack = document.getElementById("AddsearchTrack" + id);
    ////////////console.log(AddsearchTrack)
    ////////////console.log(AddsearchTrack.value)
    
    if(!AddsearchTrack.value.length){//se è vuoto, non faccio la ricerca il campo deve contenere almeno un paramenteo
        return
    }

    const urlSearch = "https://api.spotify.com/v1/search?type=album,artist,playlist,track,show,episode&q=" + AddsearchTrack.value;

    getTrack(urlSearch, "AddtrackList" + id)


    ////////////console.log(tracks)
    /* ////////////console.log(playlist)

playlists.push(playlist);

////////////console.log(playlists)

users[users.indexOf(utenteLoggato)]['Playlists'] = playlists
localStorage.setItem('users', JSON.stringify(users));
*/

    //tracks = [];


}


//NON VIENE UTILIZZATA
function MyPlaylistIsEmpty() {

    ////////////console.log("non sono presenti playlist")
    tableMyPlaylist.innerHTML = "<tr><td>NON SONO PRESENTI PLAYLIST</td></tr>"
    return;
}

function deletePlaylist(sorgente) {
    ////////console.log(sorgente);
    let preference = users[users.indexOf(utenteLoggato)]['Playlists']
    ////////console.log(sorgente.id)
    ////////console.log((sorgente.id).slice(-((sorgente.id).length - 13)))
    const result = preference.filter(element => element.id == (sorgente.id).slice(-((sorgente.id).length - 13))) //il -13 toglie la parte con "btn"

    ////////console.log(preference)
    ////////console.log(result)

    // result è un array che contiene gli elementi da eliminare 
    result.forEach(element => {
        ////////console.log(element);
        ////////console.log(preference.indexOf(element));
        preference.splice(preference.indexOf(element), 1);
    });
    ////////console.log(preference)
    users[users.indexOf(utenteLoggato)]['Playlists'] = preference;

    localStorage.setItem('users', JSON.stringify(users));


    fillTableMyPL();

}

/* funzione che modifica i campi delle playlist e anche le canzoni poi  */
function ModifyPlaylistById(sorgente) {

    event.preventDefault();


    users[users.indexOf(utenteLoggato)]['Playlists'] ? playlists = users[users.indexOf(utenteLoggato)]['Playlists'] : playlists = [];
    /*
        let playlist = {			// oggetto json registrazione 										
            collaborative: collaborative.checked,
            description: playlistdescription.value,
            images: [{
                url: "",
                height: 300,
                width: 300
            }],
            name: playlistName.value,
            tag : tagPlaylist.value,
            tracks: tracks
        }
    
        ////////////console.log(tracks)
        ////////////console.log(playlist)
    
        playlists.push(playlist);
    
        ////////////console.log(playlists)
    
        users[users.indexOf(utenteLoggato)]['Playlists'] = playlists
        localStorage.setItem('users', JSON.stringify(users));
    
    
        tracks = []; */
    ////////////console.log(sorgente)
    ////////////console.log(sorgente.name)
    const results = playlists.find(element => {
        return element.name === sorgente.name
    });

    ////////////console.log(playlists.indexOf(results))
    ////////////console.log(results)
    ////////////console.log(playlists[playlists.indexOf(results)])

    copyPlaylist = users[users.indexOf(utenteLoggato)]['Playlists'][playlists.indexOf(results)]


    /* ////////////console.log(copyPlaylist)
    ////////////console.log(sorgente.MPLname)
    ////////////console.log(sorgente.MPLdesc.value)
    ////////////console.log(sorgente.MPLtag_.value)
    ////////////console.log(sorgente.MPLcheck.checked) */


    copyPlaylist.name = sorgente.MPLname.value
    copyPlaylist.description = sorgente.MPLdesc.value
    copyPlaylist.tag = sorgente.MPLtag_.value
    copyPlaylist.collaborative = sorgente.MPLcheck.checked
    //copyPlaylist.tracks = sorgente.MPLcheck.checked

    ////////console.log(copyPlaylist.collaborative)
    if (copyPlaylist.collaborative) {


        let publicPlaylists = [];
        ////////console.log(publicPlaylists)
        localStorage.publicPL ? publicPlaylists = JSON.parse(localStorage.publicPL) : publicPlaylists = [];
        ////////console.log(publicPlaylists)

        const results = publicPlaylists.find(element => { element.id == copyPlaylist.id });
        //let   newPL   = publicPlaylists[publicPlaylists.indexOf(results)]
        ////////console.log(results)
        if (!results) {
            ////////console.log("non ho trovato nulla nello storage")
            publicPlaylists.push(copyPlaylist)
            ////////console.log(publicPlaylists)
            //rimuovo i duplicati per ogni evenienza, anche se l'ho gia fatto sopra
            const uniqueObjects = [...new Map(publicPlaylists.map(item => [item.id, item])).values()]
            //salvo nel localstorage
            localStorage.setItem('publicPL', JSON.stringify(uniqueObjects));

        } else {
            //SE TROVO UNA CORRISPONDENZA ALLORA DEVO PROCEDERE MODIFICANDO L'ELEMENTO GIA ESISTENTE
            ///newPL = copyPlaylist;
            ////////console.log(publicPlaylists)
            publicPlaylists[publicPlaylists.indexOf(results)] = copyPlaylist;

            ////////console.log(copyPlaylist)
            //////////console.log(newPL)

            //publicPlaylists.push(copyPlaylist)
            ////////console.log(publicPlaylists)
            localStorage.setItem('publicPL', JSON.stringify(publicPlaylists));


        }
        //ELSE SE NON è PUBBLICA(è PRIVATA) DEVO CONTROLLARE CHE SIA NELLO STORAGE, SE LO è LA ELIMINON NON ESSENDO PIù PUBBLICA, IN CASO CONTRARIO CIOè PROCEDO NORMALMENTE
    } else {

        let publicPlaylists = [];//uguale portare fuori

        localStorage.publicPL ? publicPlaylists = JSON.parse(localStorage.publicPL) : publicPlaylists = []; //uguale portare fuori

        ////////console.log(publicPlaylists)
        ////////console.log(publicPlaylists.id)
        ////////console.log(copyPlaylist)
        ////////console.log(copyPlaylist.id)

        const results = publicPlaylists.find(element => { element.id === copyPlaylist.id });//stampa undefind
        //let   newPL   = publicPlaylists[publicPlaylists.indexOf(results)]
        ////////console.log(results)

        if (!results) {//se trovo nello storag va eliminato
            publicPlaylists = publicPlaylists.filter(element => !(element.id == copyPlaylist.id))
            ////////console.log(publicPlaylists);
            localStorage.setItem('publicPL', JSON.stringify(publicPlaylists));

        }

    }

    tracks.push(...copyPlaylist.tracks)
    //console.log(tracks)
    tracks = [...new Map(tracks.map(item => [item.id, item])).values()]
    //console.log(tracks)
    ////////////console.log()
    copyPlaylist.tracks = []
    copyPlaylist.tracks.push(...tracks)
            
    ////////////console.log(tracks)
    //console.log(users[users.indexOf(utenteLoggato)]['Playlists'][playlists.indexOf(results)])
    
    users[users.indexOf(utenteLoggato)]['Playlists'][playlists.indexOf(results)] = copyPlaylist

    localStorage.setItem('users', JSON.stringify(users));

    // utenteLoggato = results;

    fillTableMyPL();
    tracks = []; 
}



//const AddsearchTrack = document.getElementById("AddsearchTrack")
//AddsearchTrack.addEventListener('keyup', searchTrackSpotify)

// se si crea una playlist vuota non me la salva perchè non si può creare una playlist senza canzoni  RISOLTO
//stampare un alert CREAZIONE PLAYLIST AVVENUTA CON SUCCESSO!










//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//FASE DUE 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* 
Il secondo scenario (gestione delle condivisioni) consiste nella classica
condivisione di oggetti all’interno di un’applicazione web. Gli utenti possono decidere quale delle playlist da 
loro composte rendere pubbliche ad altri utenti. 
In un’area dedicata del portale gli utenti possono ricercare
le playlist pubbliche, visualizzare le informazioni principali (elenco delle
canzoni, durata, tag e descrizione) e decidere se importarle nel proprio
profilo. La ricerca delle playlist pubbliche deve fornire come criteri di
ricerca almeno i tag associati e le canzoni in esse contenute */

const liPublicPlaylist = document.getElementById("liPublicPlaylist");

liPublicPlaylist.addEventListener('click', () => {
    document.getElementById('AccountSetting').style.display = "block";
    document.getElementById('modifyProfile').style.display = "none";
    document.getElementById('modifyAccount').style.display = "none";
    document.getElementById('modifyPreference').style.display = "none";
    document.getElementById('MyPlaylist').style.display = "none";
    document.getElementById('cancellaUtente').style.display = "none";
    document.getElementById('PublicPlaylist').style.display = "block";
    document.getElementById('CreaPlaylist').style.display = "none";
    document.getElementById('divCommunity').style.display = "none";
    document.getElementById('MyAllCommunity').style.display = "none";




    let PublicPL;
    (localStorage.getItem("publicPL")) ? PublicPL = JSON.parse(localStorage.getItem("publicPL")) : PublicPL = [];


    fillPublicPlaylist(PublicPL, "tablePublicPlaylist");


});

function fillPublicPlaylist(PublicPL, div) {
    //console.log(PublicPL)
    const tablePublicPlaylist = document.getElementById(div);
    ////console.log(tablePublicPlaylist)
    tablePublicPlaylist.innerHTML = "";
    /*//TOLGO E PARAMETRIZZO LA FUNZIONE PER POTERLA UTLIZZARE ANCHE PER IL RIEMPIMENTO TRAMITE RICERCA DELLE PL PUBBLICHE
    let PublicPL;
    (JSON.parse(localStorage.getItem("publicPL"))) ? PublicPL = JSON.parse(localStorage.getItem("publicPL")) : PublicPL = [];
 */
    if (!PublicPL.length) {
        tablePublicPlaylist.innerHTML = "<tr><td colspan='5'>NON SONO PRESENTI PLAYLIST PUBBLICHE</td></tr>"
        return
    }




    ////////console.log(PublicPL);

    PublicPL.forEach(element => {
        ////////console.log(element)
        ////////console.log(element.id)

        let track_id = element.id
        console.log(track_id)
        /*
        //serve per gestire gli id
        let track_id = Date.now()

        if (element.tracks.length) {
            //tableMyPlaylist.innerHTML = "<tr><td></td><td><strong>ERRORE : SONO PRESENTI PLAYLIST SENZA CANZONI, QUESTE NON VERRANNO VISUALIZZATE</strong></td><td></td><td></td></tr>"
            //track_id = Date.now()
            //return;
            track_id = element.tracks[0].id
        }
        */

        tablePublicPlaylist.innerHTML += "<tr data-bs-toggle='collapse' href='#collapse" + track_id + "' role='button' aria-expanded='false' aria-controls='collapse" + track_id + "' ><td></td><td>" + element.name + "</td><td>" + element.description + "</td><td>" + element.tag + "</td><td><button id='btnAddPublicPL" + track_id + "' onclick='btnAddPublicPL(this)' type='button' class='btn btn-primary'>ADD</button></td></tr>"

        tablePublicPlaylist.innerHTML += "<tr class='collapse' id='collapse" + track_id + "'><td colspan='6' ><div id='PublicPlaylist" + track_id + "'>  <div></td></tr>"



        const html =
            `
        <div class="container-fluid divModifyPlaylist">
        <br><br>
            

                <div id="PLTracks${track_id}" class="container row">
                
                <table class="table table-condensed table-responsive">
                    <thead>
                        <tr class="table">
                            <th class="th-sm col-1" scope="col"><strong>TITOLO</strong></th>
                            <th class="th-sm col-3" scope="col"><strong>ARTISTA</strong></th>
                            <th class="th-sm col-3" scope="col"><strong>ALBUM</strong></th>
                            <th class="th-sm col-2" scope="col"><strong>AGGIUNTO IL</strong></th>
                        </tr>
                    </thead>
                    <tbody id="">
                    </tbody>
                </table>

                </div>
        
        `;

        //////////////console.log(rowItem)
        PublicPlaylist = document.getElementById("PublicPlaylist" + track_id)
        PublicPlaylist.insertAdjacentHTML('beforeend', html)


        /////////////////////////////INIZIO PARTE RELATIVA LL'INTSERIMENTO DELLE CANZIONI PRESENTI IN UNA PL
        const TracksElem = document.getElementById("PLTracks" + track_id)
        //TracksElem.innerHTML+="<br>"
        //console.log(element)
        //console.log(element.tracks)
        element.tracks.forEach(elem => {

            const img = elem.album.images[2].url;

            const title = elem.name;
            const albumName = elem.album.name
            const artist = elem.artists[0].name;
            let duration = elem.duration_ms;

            //convert ms to minute

            const date = new Date(duration);

            duration = `${date.getMinutes()}:${date.getSeconds()}`;
            ////////////console.log(duration)
            //end 

            const release_date = elem.album.release_date;
            const html =
                `
    <div class="col-1">
        <img src="${img}" height="${elem.album.images[2].height}" width="${elem.album.images[2].width}" alt="">        
    </div>
    <div class="col-3">
        <label for="Genre" class="form-label col-sm-12"><strong>${title}</strong></label>
        <label for="artist" class="form-label col-sm-12"><strong>${artist}</strong></label>
    </div>
    <div class="col-4">
    <label for="albumName" class="form-label col-sm-12"><strong>${albumName}</strong></label>
    </div> 
    <div class="col-3">
    <label for="release_date" class="form-label col-sm-12"><strong>${release_date}</strong></label>
    </div> 
    <div class="col-1">
    <label for="duration" class="form-label col-sm-12"><strong>${duration}</strong></label>
    </div> 
    <br>
    
    `;

            /*  const rowItem = document.getElementById("rowItem" + element.id)
             //////////////console.log(rowItem)
             TracksElem.insertAdjacentHTML('beforeend', html) */
            TracksElem.insertAdjacentHTML('beforeend', html)
        });


    });


}

function btnAddPublicPL(sorgente) {
    
    //PRENDO I DATI DALLE PL pubbliche
    (localStorage.getItem("publicPL")) ? PublicPL = JSON.parse(localStorage.getItem("publicPL")) : PublicPL = [];
    //IDENTIFICO LA PLAYLIST SCELTA DALL'UTENTE SFRUTTO sorgente
    
    const btnid = sorgente.id.slice(-((sorgente.id).length - 14))  

    console.log(PublicPL)
    console.log(sorgente)
    console.log(sorgente.id)

    const results = PublicPL.find(element => {
        console.log(element)
        console.log(element.id)
        return element.id == btnid;
    });
    ////////console.log(results)
    console.log(results)


    //PRENDO LA PL DELLUTENTE
    //////////console.log(users[users.indexOf(utenteLoggato)]['Playlists'])
    users[users.indexOf(utenteLoggato)]['Playlists'] ? playlists = users[users.indexOf(utenteLoggato)]['Playlists'] : playlists = [];

    //controllo che io non abbia già questa PL
    //playlists[results] ? alert("Questa PL fa già parte delle tue PL");return : "" ;

    const result = playlists.find(element => {
        return element.id == results.id;
    });

    if (!result) {//se è undifined cioè non ho trovato una corrispondenza nello storage
        playlists.push(results)
        users[users.indexOf(utenteLoggato)]['Playlists'] = playlists;
        localStorage.setItem('users', JSON.stringify(users));
        Swal.fire( // alert di successo
            'Hai aggiunto la playlist con successo!',
            'Ora puoi iniziare a goderti le tue playlist!',
            'success'
        )
        return
    }
    //alert("Questa PL fa già parte delle tue PL")
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Possiedi già questa PL!'
    })
    //return
    /* ////////console.log(result)
    
    ////////console.log(playlists.indexOf(result))
    
    ////////console.log(playlists[playlists.indexOf(result)]);


    ////////console.log(playlists[result])
    ////////console.log(playlists.result)

    ////////console.log(playlists)
    ////////console.log(playlists.indexOf(results))
    ////////console.log(playlists[playlists.indexOf(results)]);
    ////////console.log(playlists[results])
    ////////console.log(playlists.results)
    if(playlists[results]){
        ////////console.log("Questa PL fa già parte delle tue PL")
        alert("Questa PL fa già parte delle tue PL")
        return;
    } */
    //aggiungo la pl alle mie pl/* 
    /*playlists.push(results)
    ////////console.log(playlists)
    users[users.indexOf(utenteLoggato)]['Playlists'] = playlists;
    localStorage.setItem('users', JSON.stringify(users)); */
    //stampa undefind
    //let   newPL   = publicPlaylists[publicPlaylists.indexOf(results)]
    //////////console.log(results)
    /* 
    if (!results){//se trovo nello storag va eliminato
        publicPlaylists = publicPlaylists.filter(element => !(element.id == copyPlaylist.id))
        ////////console.log(publicPlaylists);
        //localStorage.setItem('publicPL', JSON.stringify(publicPlaylists));
        
    } */

    //CONTROLLA CHE NON CI SIA GIA(IO STESSO)

    //SE NON è PRESENTE LA AGGIUNGO ALL'ARRAY PLAYLIST

    //SALVO LE PL NELLO STORAGE
}

const SearchPlaylistInput = document.getElementById("SearchPlaylistInput")

var corrispondenze = [];

SearchPlaylistInput.addEventListener('keyup', () => {
    const tablePublicPlaylist = document.getElementById("tablePublicPlaylist");
    tablePublicPlaylist.innerHTML = "";

    let PublicPL;
    (localStorage.getItem("publicPL")) ? PublicPL = JSON.parse(localStorage.getItem("publicPL")) : PublicPL = [];



    const value = SearchPlaylistInput.value.toLowerCase();
    ////////console.log(value)
    //sentence.includes(word)

    PublicPL.forEach(element => {
        ////////console.log(element.tag)
        ////////console.log(`The word "${value}" ${element.tag.includes(value) ? 'is' : 'is not'} in the sentence`);
        ////////console.log(element.tag.includes(value))
        ////////console.log(element.tracks)
        ////////console.log(element.tracks.name)
        element.tracks.forEach(elem => {
            ////////console.log(elem)
            ////////console.log(elem.name)
            //////////console.log(elem[name])/*
            ////////console.log(`The word "${value}" ${elem.name.includes(value) ? 'is' : 'is not'} in the sentence`);

            if (elem.name.toLowerCase().includes(value)) {
                ////////console.log("si esiste una canzone con questa tag")
                ////////console.log(element)
                corrispondenze.push(element)
            }
        });

        if (element.tag.toLowerCase().includes(value)) {
            ////////console.log("si esiste un una PL con questa tag")
            ////////console.log(element)
            corrispondenze.push(element)
            return;
        }

    })
    ////////console.log("non esiste un una PL con questa tag")
    ////////console.log(corrispondenze)

    uniqueChars = [...new Set(corrispondenze)]
    corrispondenze = [...new Set(corrispondenze)]
    //////////console.log("keyup")
    ////////console.log(corrispondenze)
    ////////console.log(uniqueChars)
    const uniqueObjects = [...new Map(corrispondenze.map(item => [item.id, item])).values()]
    ////////console.log(uniqueObjects)


    fillPublicPlaylist(uniqueObjects, "tablePublicPlaylist");
    corrispondenze = [];
    /*

    uniqueObjects.forEach(elem => {

    tablePublicPlaylist.innerHTML += "<tr><td></td><td>" + elem.name + "</td><td>" + elem.description + "</td><td>" + elem.tag + "</td><td><button id='btnAddPublicPL" + elem.id + "' onclick='btnAddPublicPL(this)' type='button' class='btn btn-primary'>ADD</button></td></tr>"
    });
    */


    /* 
    uniqueObjects.forEach(elem => {

        const img = elem.album.images[2].url;

        const title = elem.name;
        const albumName = elem.album.name
        const artist = elem.artists[0].name;
        let duration = elem.duration_ms;

        //convert ms to minute

        const date = new Date(duration);

        duration = `${date.getMinutes()}:${date.getSeconds()}`;
        ////////////console.log(duration)
        //end 

        const release_date = elem.album.release_date;
        const html =
            `
<div class="col-1">
    <img src="${img}" height="${elem.album.images[2].height}" width="${elem.album.images[2].width}" alt="">        
</div>
<div class="col-3">
    <label for="Genre" class="form-label col-sm-12"><strong>${title}</strong></label>
    <label for="artist" class="form-label col-sm-12"><strong>${artist}</strong></label>
</div>
<div class="col-4">
<label for="albumName" class="form-label col-sm-12"><strong>${albumName}</strong></label>
</div> 
<div class="col-3">
<label for="release_date" class="form-label col-sm-12"><strong>${release_date}</strong></label>
</div> 
<div class="col-1">
<label for="duration" class="form-label col-sm-12"><strong>${duration}</strong></label>
</div> 
<br>

`;

        /*  const rowItem = document.getElementById("rowItem" + element.id)
         //////////////console.log(rowItem)
         TracksElem.insertAdjacentHTML('beforeend', html) */
    /* 
   TracksElem.insertAdjacentHTML('beforeend', html)
}); */
    /*
    }) */

});


/* 
function fillTableMyPL() {

    const tablePublicPlaylist = document.getElementById("tablePublicPlaylist");

    let PublicPL;
    (JSON.parse(localStorage.getItem("publicPL"))) ? PublicPL = JSON.parse(localStorage.getItem("publicPL")) : PublicPL = [];

    if (!PublicPL.length) {
        tablePublicPlaylist.innerHTML = "<tr><td colspan='5'>NON SONO PRESENTI PLAYLIST PUBBLICHE</td></tr>"
        return
    }

    tableMyPlaylist.innerHTML = "";

    PublicPL.forEach(element => {

        ////////////console.log(element)
        ////////////console.log(element.tracks)



        let track_id = Date.now()

        if (element.tracks.length) {
            //tableMyPlaylist.innerHTML = "<tr><td></td><td><strong>ERRORE : SONO PRESENTI PLAYLIST SENZA CANZONI, QUESTE NON VERRANNO VISUALIZZATE</strong></td><td></td><td></td></tr>"
            //track_id = Date.now()
            //return;
            track_id = element.tracks[0].id
        }

        ////////////console.log(element.tracks.name)
        ////////////console.log(element.tracks.name)



        tableMyPlaylist.innerHTML += "<tr data-bs-toggle='collapse' href='#collapseExample" + track_id + "' role='button' aria-expanded='false' aria-controls='collapseExample' ><td></td><td>" + element.name + "</td><td>" + element.description + "</td><td>" + isPublic + "</td><td><button onclick='deletePlaylist(this)' id='btnDeleteMyPL" + track_id + "' type='button' class='btn btn-danger'>X</button></td><td><button id='btnShowMyPL" + track_id + "' type='button' class='btn btn-primary'>X</button></td></tr>"

        tableMyPlaylist.innerHTML += "<tr class='collapse' id='collapseExample" + track_id + "'><td colspan='6' ><div id='ModifyPL" + track_id + "'>  <div></td></tr>"

        const ModifyPL = document.getElementById("ModifyPL" + track_id);




        const html =
            `
        <div class="container-fluid divModifyPlaylist">
        <br><br>
            

                <div id="Tracks${track_id}" class="container row">
                
                <table class="table table-condensed table-responsive">
                    <thead>
                        <tr class="table">
                            <th class="th-sm col-1" scope="col"><strong>TITOLO</strong></th>
                            <th class="th-sm col-3" scope="col"><strong>ARTISTA</strong></th>
                            <th class="th-sm col-3" scope="col"><strong>ALBUM</strong></th>
                            <th class="th-sm col-2" scope="col"><strong>AGGIUNTO IL</strong></th>
                            <th class="th-sm col-2" scope="col"><strong>DURATION</strong></th>
                            <th class="th-sm col-1" scope="col"><strong>Delete</strong></th>
                        </tr>
                    </thead>
                    <tbody id="tableMyPlaylist">
                    </tbody>
                </table>

                </div>

            <div id="AddtrackList${track_id}" class="container" >
                
                </div>

            </div>
        
        `;

        //////////////console.log(rowItem)
        ModifyPL.insertAdjacentHTML('beforeend', html)

        /////////////////////////////INIZIO PARTE RELATIVA LL'INTSERIMENTO DELLE CANZIONI PRESENTI IN UNA PL
        const TracksElem = document.getElementById("Tracks" + track_id)
        //TracksElem.innerHTML+="<br>"

        element.tracks.forEach(elem => {

            const img = elem.album.images[2].url;

            const title = elem.name;
            const albumName = elem.album.name
            const artist = elem.artists[0].name;
            let duration = elem.duration_ms;

            //convert ms to minute

            const date = new Date(duration);

            duration = `${date.getMinutes()}:${date.getSeconds()}`;
            ////////////console.log(duration)
            //end 

            const release_date = elem.album.release_date;
            const html =
                `
    <div class="col-1">
        <img src="${img}" height="${elem.album.images[2].height}" width="${elem.album.images[2].width}" alt="">        
    </div>
    <div class="col-3">
        <label for="Genre" class="form-label col-sm-12"><strong>${title}</strong></label>
        <label for="artist" class="form-label col-sm-12"><strong>${artist}</strong></label>
    </div>
    <div class="col-3">
    <label for="albumName" class="form-label col-sm-12"><strong>${albumName}</strong></label>
    </div> 
    <div class="col-2">
    <label for="release_date" class="form-label col-sm-12"><strong>${release_date}</strong></label>
    </div> 
    <div class="col-2">
    <label for="duration" class="form-label col-sm-12"><strong>${duration}</strong></label>
    </div> 
    <div class="col-1">
    <button id='btnRemoveTrack${elem.id}' name="btnRemoveTrackName${element.name}" onclick='btnRemoveTrack(this)' type='button' class='btn btn-danger'>X</button>
    </div> 
    <br>
    
    `;

            /*  const rowItem = document.getElementById("rowItem" + element.id)
             //////////////console.log(rowItem)
             TracksElem.insertAdjacentHTML('beforeend', html) */
/*  TracksElem.insertAdjacentHTML('beforeend', html)
});



});



}; */



//Nelle PL pubblica mancano i vontrolli, se se modifica una PL pubblica nella sezione playlist publiche mostra sia la vecchia che la nuova PL

//QUANDO SI CAMBIA IL NOME DELL UTENTE IL RIQUADRO SOPRA SI DUPLIA, PRIMA CANCELLLARE POI RIEMPITE, e lo stesso accade quando faccio cambia email

// non devono esserci due utenti con lo stesso nome

//IPOTESI : DUE PL NON DEVONO AVERE LO STESSO NOME

//IL CAMPO ID è STATO AGGIUNTO ALLA FINE PER UNA MIGLIORE GESTIONE DELLE COMUNITà 
//QUINID NON è STATO UTILIZZATO NEL RESTO DEL PROGRAMMA

//DARE UN INPUT ALLUTENTE NEL MOMENTO IN CUI CREA UNA PL

//IN LE TUE PL IL CAMPO CHECK è SEMPRE SETTATO SU PRIVATO(FALSE), AGGIUNGERE IL CONTROLLO PER CUI è SETTATO IN BASE ALLA PREFERENZA SCELTA IN FASE DI CREAZIONE
//IL NOME DELLA PL DEVE ESSERE UNIVOCO

//CE UN PROBLEMA QUANDO SI ELIMINA UN PL, LE ELIMINA TUTTE

//ORA COME ORA SE UN UTENTE CREA UN PL, UN ALTRO PUO ANDARE E RENDERLA PRIVATA E QUINID NON ACCESSIBILE A TUTTI, PER RISOLVERE AGGIUNGERE UN CAMPO OWNER FRA I VARI ATTRIBUTII DELLA PL, E FARE UN CONTROLLO SOLAMENTE IL PROPRIETARIO PUò FARE UNA MODIFICA

//non si può creare una comunità se non sono presenti altri utenti e non sono in possesso di PL.

//IPOTESI I MEMBRI DELLA PL NON POSSONO AGGIUNGERE PL, SOLAMENTE IL PROPRIETARIO PUò IN FASE DI CREAIZONE (ABBIMAO PRESO ALLA LETTERA LA CONSEGNA.)

//quando modifico gli array potrei utilizzare il metodo map


btnCommunity.addEventListener('click', () => {     // funzione che mostra il div delle comunità
    document.getElementById('AccountSetting').style.display = "block";
    document.getElementById('modifyProfile').style.display = "none";
    document.getElementById('modifyAccount').style.display = "none";
    document.getElementById('modifyPreference').style.display = "none";
    document.getElementById('MyPlaylist').style.display = "none";
    document.getElementById('cancellaUtente').style.display = "none";
    document.getElementById('PublicPlaylist').style.display = "none";
    document.getElementById('CreaPlaylist').style.display = "none";
    document.getElementById('divPlaylist').style.display = "none";
    document.getElementById('MyAllCommunity').style.display = "none";
    document.getElementById('divCommunity').style.display = "block";

    document.getElementById('scegliUtenti').innerHTML = "<br><strong>Scegli che utenti inserire nella tua comunità : <strong><br> ";


    const listaUtenti = JSON.parse(window.localStorage.users);
    //////////console.log(users)
    const utenti = listaUtenti.filter(element => !(element.email == utenteLoggato.email))
    ////////console.log(utenti)

    //console.log($utenti)
    
    //cc pl e user
    if (!utenti.length || !utenteLoggato.Playlists){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Non è possibile creare una comunità prima di avere delle playlist, oppure non ci sono altri utenti registrati alla piattaforma'
        })
        return
    }

    utenti.forEach(element => {            // mostro gli utenti che posso scegliere da mettere nella comunità da creare
        // if(element.nome!= utenteLoggato.nome){
        ////////console.log(element)
        scegliUtenti.innerHTML += "<br>" + "<input class='form-check-input' type='checkbox' role='switch' id='scegli_" + element.email + "'>" + element.nome;
        //   }
    });

    scegliUtenti.innerHTML += "<br><br>"

    document.getElementById('scegliPlaylist').innerHTML = "<strong> Scegli le playlist da inserire nella comunità <strong><br>"
    ////console.log(utenteLoggato)
    utenteLoggato.Playlists.forEach(element => {
        document.getElementById('scegliPlaylist').innerHTML += "<br><input type='checkbox' id='scegli_PL" + element.id + "'>" +" "+ element.name
    });


});

function AddCommunity_nf() {      // creo l'oggetto comunità e lo aggiungo al local Storage

    //aggiungere un campo owner


    let comunita = []
    utentiCommunity = []
    playlistCommunity = []
    event.preventDefault();
    const nomeCommunity = formCom.nomeCom
    const descCommunity = formCom.descCom
    /* ////////console.log(formCom.nomeCom.value);
    ////////console.log(formCom.descCom.value); */
    for (i = 0; i < users.length; i++) {                   //controllo che utenti ha scelto 

        switchUtenteId = "scegli_" + users[i].nome   //prendo l id di ogni singola checkbox per verificarla

        check = document.getElementById(switchUtenteId)

        // ////////console.log(users[i].nome)
        // ////////console.log(check)
        //  ////////console.log(switchUtenteId)
        ////////console.log(users[i].nome, check.checked)

        if (check.checked == true) {        //se true vuol dire che ha scelto l'utente quindi lo aggiungo 
            utentiCommunity.push(users[i])
        }
    }

    for (j = 0; j < utenteLoggato.Playlists.length; i++) {      //controllo che playlist ha scelto             //NB CAPIRE SE UNO DEI DUE CICLI VA ALL INFINTO PERCHè DA QUI NON STAMPA PIU NULLA

        checkBoxPlaylistId = "scegli_" + utenteLoggato.Playlists[j].name  // prendo l id di ogni singola checkbox playlist

        checkPlaylist = document.getElementById(checkBoxPlaylistId)

        if (checkPlaylist.checked == true) {
            playlistCommunity.push(utenteLoggato.Playlists[j])
        }

    }
    ////////console.log(playlistCommunity)
    //nb si possono condividere playlist solo nel momento in cui si crea la comunità

    let community = {
        nome: nomeCommunity.value,
        descrizione: descCommunity.value,
        utenti_community: utentiCommunity,
        playlists_community: playlistCommunity
    }
    ////////console.log(community)
    ////////console.log(comunita)
    comunita.push(community)


    //users[users.indexOf(utenteLoggato)]['Comunità'] = comunita

    localStorage.setItem('community', JSON.stringify(comunita));
    // non riesco a mettere la comunità nel local storage

    //const SearchPlaylist = document.getElementById('SearchPlaylist');   ???
};

// ho creato il div della comunità devo implementare le funzoinalità e fargli scegliere 
// che utenti inserire nella comunità ( una check con tutti gli utenti dove mette le spunte sugli utenti che vuole aggiungere )
// non abbiamo fatto il controllo che due utenti abbiano lo stesso nome NB!!!!!

const liMyCommunity = document.getElementById("liMyCommunity");
liMyCommunity.addEventListener('click', fillCommunity)
//document.getElementById('MyAllCommunity').style.display = "block";

function fillCommunity() {
    document.getElementById('AccountSetting').style.display = "block";
    document.getElementById('modifyProfile').style.display = "none";
    document.getElementById('modifyAccount').style.display = "none";
    document.getElementById('modifyPreference').style.display = "none";
    document.getElementById('MyPlaylist').style.display = "none";
    document.getElementById('cancellaUtente').style.display = "none";
    document.getElementById('PublicPlaylist').style.display = "none";
    document.getElementById('CreaPlaylist').style.display = "none";
    document.getElementById('divPlaylist').style.display = "none";
    document.getElementById('MyAllCommunity').style.display = "none";
    document.getElementById('divCommunity').style.display = "none";
    document.getElementById('MyAllCommunity').style.display = "block";
    let myCommunity = [];
    ////console.log(utenteLoggato)
    ////////console.log((users[users.indexOf(utenteLoggato)]))
    //devo vedere le comunità a cui io faccio parte.
    let community;
    (localStorage.getItem("community")) ? community = JSON.parse(localStorage.getItem("community")) : community = [];
    ////console.log(community);
    let result;
    //controllo se l'utente loggato fa parte di qualche comunità 
    result = community.forEach(element => {
        //element.utenti_community.filter(elem => {
        //return    elem.email == utenteLoggato.email;
        //})
        ////console.log(element)
        ////console.log(element.utenti_community)
    });
    //let PublicPL = [];//array con le pl di quella specifica comunità
    ////////console.log(typeof community);
    community.forEach(element => {
        ////console.log(element)
        ////console.log(element.utenti_community)
        //////console.log(element[utenti_community])
        element.utenti_community.forEach(elem => {//inizialmente fatta con il metodo filter ma non ha funzionale
            //////console.log(elem.email, ":",utenteLoggato.email)
            ////console.log(elem)
            if (elem.email == utenteLoggato.email) {
                ////console.log("SI")
                //PublicPL.push(...element.playlist_Community)
                ////console.log(element)
                result = element
                return
            }
            ////console.log("NO")
        });

    })

    ////console.log(PublicPL);
    /*
    if (!result) {
        ////////console.log("L'utente loggato non ha appartiene a nessuna Comunità")
        
    }*/
    result ? myCommunity.push(result) : //console.log("L'utente loggato non ha appartiene a nessuna Comunità")
    ////console.log(myCommunity)
    //fillPublicPlaylist(PublicPL,"tableCommunityPlaylist");

    //constrollo se l'utente loggato è il proprietario di una qualche comunità
    result = community.filter(elem => {
        ////////console.log(elem);
        ////////console.log(elem.owner.email);
        return elem.owner.email == utenteLoggato.email;
        //return ////////console.log(element);
    });
    ////////console.log(typeof community);
    ////////console.log(result);

    if (!result) {//se è undifined
        ////////console.log('Lutente loggato è il proprietario di una nessuna Comunità: ${result}')
        // return
    }
    myCommunity.push(...result);
    /* 
    community.forEach(element => {
        ////////console.log(element)
    }); */
    //community = community.filter(element =>element[])
    //////////console.log(community.utenti_community)
    //////////console.log(typeof community.utenti_community)
    //////////console.log(community.utenti_community.includes(utenteLoggato))
    //////////console.log(Array.from(community.utenti_community).includes(utenteLoggato));
    //community.utenti_community.includes(utenteLoggato) ? ////////console.log("trovato") : ////////console.log("non ho trovato")
    fillTableMyCommunity(myCommunity, "tableMyAllCommunity")
    /* let PublicPL = [];
    fillTableMyCommunity(myCommunity, "tableMyAllCommunity")
    ////console.log(myCommunity)
    myCommunity.forEach(element => {
        ////console.log(element);
        PublicPL.push(...element.playlist_Community)
    });
    ////console.log(PublicPL)
    //fillPublicPlaylist(PublicPL,"tableCommunityPlaylist"); */



    //GESTIRE BENE I VARI RETURN
}

function fillTableMyCommunity(community, div) {//primo parametro array da popolare, mentre il sencono è il div dove inseire il tutto

   



    //let id;
    ////console.log(id)
    //tableCommunityPL = document.getElementById("tableCommunityPL")
    ////console.log(tableCommunityPL)
    //tableCommunityPL.innerHTML = ""
    //document.getElementById("tableCommunityPlaylist"+id).remove();

    //aggiungere il campo id con js

    div = document.getElementById(div);
    div.innerHTML = "";
    ////////console.log(div)
    //div.
    ////////console.log(community)

/*
    const results = `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">New message</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <table class="table table-condensed table-responsive" id="tableCommunityPL">
                                      <thead>
                                          <tr class="table">
                                              <th class="th-sm" scope="col">#</th>
                                              <th class="th-sm" scope="col"><strong>Name</strong></th>
                                              <th class="th-sm" scope="col"><strong>Description</strong></th>
                                              <th class="th-sm" scope="col"><strong>TAG</strong></th>
                                              <th class="th-sm" scope="col"><strong>Delete</strong></th>
                                          </tr>
                                      </thead>
                                      
                                  </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Send message</button>
        </div>
      </div>
    </div>
  </div>`

    rowSetting = document.getElementById("rowSetting")
    rowSetting.insertAdjacentHTML('beforeend', results)

*/

    community.forEach((element, index) => {

        //console.log(element, index)
        id = element.communityID
        title = element.nome
        owner = element.owner.nome
        playlist = element.playlist_Community
        memberList = element.utenti_community.map(item => item["nome"]).join('  -  ');


        let html = `<tr><td>${title}</td><td>${owner}</td><td>${memberList}</td><td>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="${id}">PL</button>
    </td></tr>
    `;


        div.insertAdjacentHTML('beforeend', html)

        tableCommunityPL = document.getElementById("tableCommunityPL")

        //console.log(tableCommunityPL)
        html = `<tbody id="tableCommunityPlaylist${id}"></tbody>`;//alt+96
        tableCommunityPL.insertAdjacentHTML('beforeend', html)
        modal(playlist, index);
        svuota(id)

    });


}



function svuota(id) {

    let exampleModal = document.getElementById('exampleModal')
    ////console.log(playlist)
    exampleModal.addEventListener('hide.bs.modal', function (event) {
        //console.log("svuota")
        //var button = event.relatedTarget
        ////console.log(button)
        //console.log(event)
        // Extract info from data-bs-* attributes
        //var recipient = button.getAttribute('data-bs-whatever')
        ////console.log(recipient)
        tableCommunityPlaylist = document.getElementById("tableCommunityPlaylist" + id)
        //console.log(tableCommunityPlaylist)
        tableCommunityPlaylist.innerHTML = "";

    });

}



function modal(playlist, index) {
    let exampleModal = document.getElementById('exampleModal')
    //console.log(playlist)
    exampleModal.addEventListener('show.bs.modal', function (event) {


        //console.log(playlist)
        // Button that triggered the modal
        var button = event.relatedTarget
        //console.log(button)
        // Extract info from data-bs-* attributes
        var recipient = button.getAttribute('data-bs-whatever')
        //console.log(recipient)
        // If necessary, you could initiate an AJAX request here
        // and then do the updating in a callback.
        //
        // Update the modal's content.
        var modalTitle = exampleModal.querySelector('.modal-title')
        //console.log(modalTitle)

        tableCommunityPL = document.getElementById("tableCommunityPL")
        //console.log(tableCommunityPL)
        tableCommunityPlaylist = document.getElementById("tableCommunityPlaylist" + recipient)
        //console.log(tableCommunityPlaylist)

        JSON.parse(localStorage.community) ? comunità = JSON.parse(localStorage.community) : comunità = [];
        let PublicPL = [];
        let playlist_Comm = [];
        const result = comunità.filter(element => element.communityID == recipient);
        console.log(result)

        result.forEach(element => {
            playlist_Comm.push(element.playlist_Community)
        });

        //playlist_Comm.push(...result)
        //console.log(playlist_Comm)
        //console.log(typeof playlist_Comm)
        playlist_Comm.forEach(element => {
            //console.log(element)
            element.forEach(elem => {
                //console.log(elem)
                ////console.log(elem.)
                PublicPL.push(elem)
            })

        });
        console.log(PublicPL)
        ////console.log(...playlist_Comm)
        //PublicPL.push(...playlist_Comm)
        //console.log(PublicPL)
        /* //console.log(typeof result)
        //console.log(...result[playlist_Community])
        //console.log(...result.playlist_Community)
         */
        //PublicPL.push(...playlist_Comm[playlist_Community]);
        ////console.log(PublicPL)
        //tableCommunityPlaylist.innerHTML = "ciao" + recipient;

        //tableCommunityPlaylist = document.getElementById("tableCommunityPL"+recipient)
        fillPublicPlaylist(PublicPL, "tableCommunityPlaylist" + recipient);
        modalTitle.textContent = 'New message to ' + result[0].nome
        //modalTitle.textContent = 'New message to ' + recipient
        

    })

}


//FUNZIONE AGGIUNGE ALLO STORAGE LA COMUNITà
function AddCommunity(event) {      // creo l'oggetto comunità e lo aggiungo al local Storage
    event.preventDefault();
    //aggiungere un campo owner


    (localStorage.community) ? comunità = JSON.parse(localStorage.community) : comunità = [];
    ////////console.log(comunità)
    playlistCommunity = []
    utentiCommunity = []

    const nomeCommunity = formCom.nomeCom
    const descCommunity = formCom.descCom

    utenti = users.filter(element => !(element.email == utenteLoggato.email))//tutti a parte me stesso
    console.log(users)
    console.log(utenti)

    //controllo ridondante ma comunque utile//contract post condizione
    if (!utenti.length || !utenteLoggato.Playlists.length){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Non è possibile creare una comunità prima di avere delle playlist, oppure non ci sono altri utenti registrati alla piattaforma'
        })
        return
    }

    utenti.forEach(element => {
        //controllo che utenti ha scelto 
        //console.log(element)

        let switchUtenteId = "scegli_" + element.email   //prendo l id di ogni singola checkbox per verificarla
        ////////console.log(switchUtenteId)
        check = document.getElementById(switchUtenteId)

        ////////console.log(check)

        //per una questione di sicurezza forse non è meglio inserire tutto l'utente con le sue informzione private

        let utente = {
            nome: element.nome,
            email: element.email
        }


        if (check.checked) {        //se true vuol dire che ha scelto l'utente quindi lo aggiungo 
            utentiCommunity.push(utente)
        }
    });
    //console.log(utenteLoggato)
    //console.log(utenteLoggato.Playlists)
    utenteLoggato.Playlists.forEach(element => {
        //console.log(element)
        checkBoxPlaylistId = "scegli_PL" + element.id  // prendo l id di ogni singola checkbox playlist

        //console.log(checkBoxPlaylistId)

        checkPlaylist = document.getElementById(checkBoxPlaylistId)

        //console.log(checkPlaylist)

        if (checkPlaylist.checked) {
            playlistCommunity.push(element)
        }
    });       //controllo che playlist ha scelto             //NB CAPIRE SE UNO DEI DUE CICLI VA ALL INFINTO PERCHè DA QUI NON STAMPA PIU NULLA

    //provo no
    //fillPublicPlaylist(playlistCommunity,"tableCommunityPlaylist");


    let owner = {
        nome: utenteLoggato.nome,
        email: utenteLoggato.email
    }

    //nb si possono condividere playlist solo nel momento in cui si crea la comunità

    let community = {
        communityID: Date.now(),
        owner,
        nome: nomeCommunity.value,
        descrizione: descCommunity.value,
        utenti_community: utentiCommunity,
        playlist_Community: playlistCommunity
    }

    comunità.push(community)

    document.getElementById('divCommunity').style.display = "none";

    //mostrare il div all community

    localStorage.setItem('community', JSON.stringify(comunità));

    Swal.fire(
        'Comunità creata con successo!',
        'Ora puoi scegliere quali delle tue playlist condivere!',
        'success'
    )
}