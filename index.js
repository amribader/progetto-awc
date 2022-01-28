"use strict;"
// @ts-nocheck

//condition ? exprIfTrue : exprIfFalse 

function hideElement(id) {
    document.getElementById(id).style.display = "none";
}
function showElement(id) {
    document.getElementById(id).style.display = "block";
}

const SettingsAccount = document.getElementById("SettingsAccount");

SettingsAccount.style.display = "none";

modifyProfile.style.display = "none"; //nico

modifyAccount.style.display = "none"; //io

modifyPreference.style.display = "none";

cancellaUtente.style.display = "none";

document.getElementById('divPlaylist').style.display = "none";
document.getElementById('CreaPlaylist').style.display = "none";



let users = [];

users = JSON.parse(window.localStorage.users); //stessa cosa di window.localStorage.getItem("users"); 

//users.push();

//users = window.localStorage.getItem("users");

const sessionID = window.sessionStorage.getItem("sessionID");

////console.log(users)

if (!sessionID) { //se è undifined
    window.location.replace("index.html");
}

let utenteLoggato;

function customizePage() {

    ////console.log(users)
    //(JSON.parse(sessionStorage.getItem("sessionID"))) ? sessionID = (JSON.parse(sessionStorage.getItem("sessionID"))) : window.location.replace("login.html");
    ////console.log(sessionID);


    /*
     * SECONDO MODO CON IL METODO FILTER
     */

    const results = users.find(element => {
        ////console.log(element.sessionID);
        return element.sessionID === sessionID;
    });

    ////console.log(results)

    utenteLoggato = results;

    ////console.log(utenteLoggato)
    //////console.log(utenti.findIndex(results))

    if (!results) { //SE NON TROVA UN UTENTE CON QUELLA STESSA SESISONE restituisce true se l'array è vuoto
        alert("dentro if")
        return;
    }

    /*
	
        ////console.log(sessionID)
        ////console.log(typeof sessionID)
        const users = localStorage.getItem("users");
        div = document.getElementById("container_personal_info")
	
        //////console.log(div);
    */
    const personal_info = document.getElementById("container_personal_info")
    personal_info.innerHTML += "<div><img src='' class='img-fluid' alt=''></div>";
    personal_info.innerHTML += "<span id='span' class='home_text'><small>" + results.email + "</small><h1 class=''>" + results.nome + "</h1><h3>" + results.password + "</h3><a class='green_btn' role='button' href='#'>Web Player</a></span>";

    //div.innerHTML="<br>CIAO<br><br>CIAO<br><br>CIAO<br><br>CIAO<br><br>CIAO<br><br>CIAO<br><br>CIAO<br><br>CIAO<br>";

}

customizePage();
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
            ////console.log(tokenResponse.access_token)
            window.localStorage.setItem("access_token", tokenResponse.access_token)
            //Sarebbe opportuno salvare il token nel local storage
        })

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
            ////console.log("album ", results)
            //.innerHTML= ;
            return showCategories(results);
        }

        );

}

getCategories();

let cards = []


function showCategories(results) {


    //div_categories = document.getElementById("categories")
    /* for(i=0;i<results.items.length;i++){
        divCategories.innerHTML+= results.items[i].icons 
    } */
    ////console.log("resultCat", results.categories.items)
    ////console.log("resultCat", typeof results.categories.items)

    results.categories.items.forEach(element => { // qui mostriamo le categorie tramite un for 
        //////console.log(element)
        cards.push(element)
        //div_categories.innerHTML+="<div id='categoryChild' class='row'></div>"

        //createCard(categoryChild, element)
        //div_categories.innerHTML+="<br>"
    });
    //console.log(cards)
    createCardGrid(cards)
}

/* 
function createCard(div, cat_elem) {//id del div,elem,
    categoryChild=document.getElementById(div)
    ////console.log(cat_elem)
    ////console.log(cat_elem.icons.url)

    cat_elem.icons.forEach(element => {
        ////console.log(element.url)
    });
*/
// div.innerHTML += "<div class='col card'><img src='" + cat_elem.icons[0].url + "' width='" + cat_elem.icons.width + "'height='" + cat_elem.icons.height + "' class='card-img-top' alt='" + cat_elem.name + "'><div class='card-body box'><p class='card-text box_details'>" + cat_elem.name + "'</p></div></div>" */
//div.innerHTML+="<br>"
/* }
"<div class='card' style='width: 18rem;'> <img src='' class='card-img-top' alt=''><div class='card-body'><p class='card-text'>.</p></div></div>"
 */

function creaGriglia(cat_elem) {
    let c = 0;
    //console.log(cat_elem)
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
    let c = 0;
    //console.log(cat_elem)
    //console.log(cat_elem[0])
    //console.log(cat_elem[0].id)
    //console.log(cat_elem[0].icons)
    //console.log(cat_elem[0].icons[0].url)
    //console.log(cat_elem[0].icons.url)
    //console.log(typeof cat_elem[0].icons.url)
    div = document.getElementById("container");
    for (i = 0; i < 4; i++) { //righe
        for (j = 0; j < 5; j++) {

            ////console.log(cat_elem[c]);
            //console.log(c);

            div.innerHTML += "<label  class='card'><input name='chk' id='" + cat_elem[c].id + "' class='card__input' type='checkbox'/><div class='card__body'><div class='card__body-cover'><img class='card__body-cover-image' src='" + cat_elem[c].icons[0].url + "' width='" + cat_elem[c].icons[0].width + "'height='" + cat_elem[c].icons[0].height + " ' alt='" + cat_elem[c].name + "' /><span class='card__body-cover-checkbox'> <svg class='card__body-cover-checkbox--svg' viewBox='0 0 12 10'><polyline points='1.5 6 4.5 9 10.5 1'></polyline></svg></span></div><header class='card__body-header'><h2 class='card__body-header-title'>" + cat_elem[c].name + "</h2><p class='card__body-header-subtitle'>" + cat_elem[c].name + "</p></header></div>"


            //div.innerHTML += "<label id='"+cat_elem[c].id+"' class='card' ><input name='chk' class='card__input' type='checkbox'/><div class='card__body'><div class='card__body-cover'><img class='card__body-cover-image' src='" + cat_elem[c].icons[0].url + "' width='" + cat_elem[c].icons[0].width + "'height='" + cat_elem[c].icons[0].height + " ' alt='" + cat_elem[c].name + "' /><span class='card__body-cover-checkbox'> <svg class='card__body-cover-checkbox--svg' viewBox='0 0 12 10'><polyline points='1.5 6 4.5 9 10.5 1'></polyline></svg></span></div><header class='card__body-header'><h2 class='card__body-header-title'>" + cat_elem[c].name + "</h2><p class='card__body-header-subtitle'>" + cat_elem[c].name + "</p></header></div>"

            c++;
        }
    }
}

function salvaGeneri() {
    let userCard = [];//localStorage.users[users.indexOf(utenteLoggato)].favoriteCategories;

    //userCard = users[users.indexOf(utenteLoggato)].favoriteCategories;

    (users[users.indexOf(utenteLoggato)].favoriteCategories) ? userCard = users[users.indexOf(utenteLoggato)].favoriteCategories : "";





    var element = document.getElementsByName('chk');
    //console.log(element);
    element.forEach(element => {
        //console.log(element);

        if (element.checked) {
            cardId = document.getElementById(element.id)
            //console.log(cardId);
            //console.log(element.id);
            cards.forEach(elem => {
                if (elem.id == element.id) {
                    //console.log(elem)
                    userCard.push(elem);
                }
            });
        }
    });

    //console.log(cards);

    //console.log(userCard);
    //console.log(utenteLoggato);
    //console.log(users.indexOf(utenteLoggato));
    //console.log(users[users.indexOf(utenteLoggato)]);

    // Add new data to localStorage Array
    users[users.indexOf(utenteLoggato)]['favoriteCategories'] = userCard;

    // Save back to localStorage
    localStorage.setItem('users', JSON.stringify(users));
}

const btnSend = document.getElementById("btnSend");
const container = document.getElementById("container");


btnSend.addEventListener('click', () => {
    container.style.display = "none";

    Swal.fire(                                       // alert di successo
        'Preferenze salvate con successo!',
        'Ora puoi iniziare a creare le tue playlist!',
        'success'
    )
    SettingsAccount.style.display = "block";
});

/* 
const elem = document.getElementById("account");
const modifyAccount = document.getElementById("modifyAccount"); */

const form = document.getElementById('formModifyAccount');
form.addEventListener('submit', logSubmit);


function logSubmit(event) {
    //console.log(event);
    let elem = document.querySelectorAll(".form-check-input");

    elem.forEach(element => {
        if (element.checked) {
            //console.log(element)
            //console.log(element.value)//value email
            //console.log(document.getElementById(element.value))
            //console.log(document.getElementById(element.value).value)//mail associata al campo

            change(element)

        }
    });




    event.preventDefault();
}

function change(element) {
    let c = element.value;
    //console.log(typeof element.value)
    //console.log(c)
    //console.log(typeof c)
    //console.log(users[users.indexOf(utenteLoggato)])
    //console.log(users[users.indexOf(utenteLoggato)][c])
    ////console.log(users[users.indexOf(utenteLoggato)].element.value)
    //console.log(document.getElementById(element.value).value)
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

   //console.log(elem);

   



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
      
    //console.log(enabledSettings)
  })
}); 
*/
function settingProfile() {
    /* hideElement(document.getElementById('modifyAccount'));
    showElement(document.getElementById('modifyProfile')); */
    document.getElementById('cancellaUtente').style.display = "none";
    modifyAccount.style.display = "none";
    modifyPreference.style.display = "none";
    divPlaylist.style.display = "none";
    modifyProfile.style.display = "block";

    if (users[users.indexOf(utenteLoggato)]['biografia'] == undefined) {
        users[users.indexOf(utenteLoggato)]['biografia'] = "inserisci una biografia"
        localStorage.setItem('users', JSON.stringify(users));
    }


    if (users[users.indexOf(utenteLoggato)]['biografia'] != 'undefined' || users[users.indexOf(utenteLoggato)]['biografia'] != "") {
        document.getElementById("bio").value = users[users.indexOf(utenteLoggato)]['biografia']
    }/* else{
            users[users.indexOf(utenteLoggato)]['biografia']="inserisci una biografia"
            localStorage.setItem('users', JSON.stringify(users));
        } */




}

cambiaNome.addEventListener('click', () => {
    if (document.getElementById('profileName').value == "") {
        return
    }
    //console.log(utenteLoggato.nome);
    //console.log(typeof nome)
    //utenteLoggato.nome = document.getElementById('profileName').value;
    users[users.indexOf(utenteLoggato)].nome = document.getElementById('profileName').value


    localStorage.setItem('users', JSON.stringify(users));

    customizePage();
});

cambiaBio.addEventListener('click', () => {
    users[users.indexOf(utenteLoggato)]['biografia'] = document.getElementById("bio").value
    localStorage.setItem('users', JSON.stringify(users));

})

cambiaImg.addEventListener('click', () => {
    //console.log(document.getElementById('formFile'))
    formFile.style.display = "none";
    immagineProfilo1.innerHTML += "<img src='https://www.italiamaresrl.it/images/header/001_2.jpg' width='10px'>";//voglio creare un array qui in javascript con link a delle immagini 
    //e quando clicca sul bottone cambia immagine gliene genero una a caso prendendola dall'array
    /* immagineProfilo1.innerHTML+= "<img src="+document.getElementById('formFile').value+">";
    users[users.indexOf(utenteLoggato)]['fotoProfilo'] = document.getElementById("formFile").value; */

})

//mio 
function settingAccount() {
    document.getElementById('cancellaUtente').style.display = "none";
    divPlaylist.style.display = "none";
    modifyPreference.style.display = "none";
    modifyProfile.style.display = "none";
    modifyAccount.style.display = "block";
}
// Add new data to localStorage Array


// Save back to localStorage
//localStorage.setItem('users', JSON.stringify(users));

function settingPreference() {
    //console.log("sono dentro settingPreference")
    divPlaylist.style.display = "none";
    document.getElementById('cancellaUtente').style.display = "none";
    document.getElementById('modifyProfile').style.display = "none";
    document.getElementById('modifyAccount').style.display = "none";
    document.getElementById('modifyPreference').style.display = "block";


    const table = document.getElementById('tablePreference');

    let pref = users[users.indexOf(utenteLoggato)]["favoriteCategories"];
    //console.log(pref)
    table.innerHTML = "";
    pref.forEach(element => {
        //console.log(element)
        table.innerHTML += "<tr><td>" + element.name + "</td><td><button id='btn" + element.id + "' onclick='settingPreferenceID(this)' type='button' class='btn btn-danger'>X</button></td></tr>"
    });

    /*
        <tr>
        <th scope="row">3</th>
        <td colspan="2">Larry the Bird</td>
        <td>@twitter</td>
      </tr>
    */

}

/*
Qundo viene cliccato un bottono rosso, allora scateno l'evetno per rimuovere quella 
*/

function settingPreferenceID(sorgente) {
    //console.log(sorgente);
    let preference = users[users.indexOf(utenteLoggato)]['favoriteCategories']
    //console.log((sorgente.id).slice(-((sorgente.id).length - 3)))
    const result = preference.filter(element => element.id == (sorgente.id).slice(-((sorgente.id).length - 3)))  //il -3 toglie la parte con "btn"

    //console.log(preference)

    // result è un array che contiene gli elementi da eliminare 
    result.forEach(element => {
        //console.log(element);
        //console.log(preference.indexOf(element));
        preference.splice(preference.indexOf(element), 1);
    });

    users[users.indexOf(utenteLoggato)]['favoriteCategories'] = preference;

    localStorage.setItem('users', JSON.stringify(users));

    //console.log(users);
    const table = document.getElementById('tablePreference');
    //table.innerHTML = "<tr><td>NON SONO PRESENTI PREFERENZE</td></tr>"
    settingPreference();

}

/*
const settingPreferenceID = document.getElementById("settingPreferenceID");

settingPreferenceID.addEventListener('click', () => {

    const redbtn = document.querySelectorAll(".btn-danger");
    //console.log(redbtn);


    redbtn.forEach(element => {
        //console.log(element)
        element.addEventListener('click', (this) => {
            //console.log(element)
            //console.log(this)
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
      
    //console.log(enabledSettings)
  })
}); 
*/


function deleteUser() {
    document.getElementById('modifyProfile').style.display = "none";
    document.getElementById('modifyAccount').style.display = "none";
    document.getElementById('modifyPreference').style.display = "none";
    document.getElementById('divPlaylist').style.display = "none";
    document.getElementById('cancellaUtente').style.display = "block";
}

bottoneCancellaUtente.addEventListener('click', () => {
    copiaUtentiSenzaCancellato = users
    //console.log(users)
    /*  for(i=0;i<users.length;i++){
         if users[i]==utenteLoggato{
             
         }
     } */
    copiaUtentiSenzaCancellato.splice(users.indexOf(utenteLoggato), 1)
    localStorage.setItem('users', JSON.stringify(copiaUtentiSenzaCancellato));
    sessionStorage.removeItem("sessionID")
    //console.log(copiaUtentiSenzaCancellato)
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

}

btnAddPreference = document.getElementById("btnAddPreference");

btnAddPreference.addEventListener('click', () => {
    //console.log("sono dentro ")
    document.getElementById('SettingsAccount').style.display = "none";
    document.getElementById('container').style.display = "block";


    /* document.getElementById('AccountSetting').style.display = "none";
    document.getElementById('modifyProfile').style.display = "none";
    document.getElementById('modifyAccount').style.display = "none";
    document.getElementById('modifyPreference').style.display = "none";
    document.getElementById('cancellaUtente').style.display = "none";
    document.getElementById('divPlaylist').style.display = "none";
    document.getElementById('container').style.display="block";  */
});

liNewPlaylist.addEventListener('click', () => {

    //document.getElementById('SettingsAccount').style.display = "none";
    //document.getElementById('CreaPlaylist').style.display = "block";

    document.getElementById('AccountSetting').style.display = "block";
    document.getElementById('modifyProfile').style.display = "none";
    document.getElementById('modifyAccount').style.display = "none";
    document.getElementById('modifyPreference').style.display = "none";
    document.getElementById('MyPlaylist').style.display = "none";
    document.getElementById('cancellaUtente').style.display = "none";
    //document.getElementById('divPlaylist').style.display = "block";
    document.getElementById('CreaPlaylist').style.display = "block";
})










//PARTE 2 GESTIONE PLAYLIST


const createPlaylist = document.getElementById("createPlaylist");

createPlaylist.addEventListener('submit', () => {
    console.log("on submit")
    event.preventDefault();
    let playlists;
    const collaborative = document.getElementById("collaborative")
    const playlistdescription = document.getElementById("playlistDescription")
    const playlistName = document.getElementById("playlistName")
    const tagPlaylist = document.getElementById("tagPlaylist")
    console.log(collaborative)
    console.log(playlistdescription)
    console.log(playlistName)
    //const collaborative = document.getElementById("playlistImage")//per ora no

    users[users.indexOf(utenteLoggato)]['Playlists'] ? playlists = users[users.indexOf(utenteLoggato)]['Playlists'] : playlists = [];

    let playlist = {			// oggetto json registrazione 										
        collaborative: collaborative.checked,
        description: playlistdescription.value,
        images: [{
            url: "",
            height: 300,
            width: 300
        }],
        name: playlistName.value,
        tag : tagPlaylist,
        tracks: tracks
    }

    console.log(tracks)
    console.log(playlist)

    playlists.push(playlist);

    console.log(playlists)

    users[users.indexOf(utenteLoggato)]['Playlists'] = playlists
    localStorage.setItem('users', JSON.stringify(users));


    tracks = [];

});

const searchTrack = document.getElementById("searchTrack")
var resultsTracks;


searchTrack.addEventListener('keyup', () => {
    //console.log("keyup")
    const url = "https://api.spotify.com/v1/search?type=album,artist,playlist,track,show,episode&q=" + searchTrack.value;
    getTrack(url);
})


function getTrack(url) {

    const access_token = localStorage.access_token;

    async function fetchTrack() {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + access_token,
            },
        })
        const tracks = await response.json();
        return tracks;
    }
    fetchTrack().then((results) => {
        //console.log(results)
        createTrackDetail(results.tracks.items)
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
            //console.log(results)
            createTrackDetail(results.tracks.items)
        });

        
}
*/

function createTrackDetail(results) {

    trackList = document.getElementById("trackList");
    trackList.innerHTML = '';

    //console.log(results)
    //console.log(results.tracks)
    //console.log(typeof results)

    results.forEach(element => {
        trackList.innerHTML += "<br><div class='row trackBorder' id='rowItem" + element.id + "' ></div>"
        //console.log(element)
        //console.log(element.id)
        const img = element.album.images[2].url;

        //console.log(img)

        const title = element.name;
        const albumName = element.album.name
        const artist = element.artists[0].name;



        const html =
            `
    <div class="col-1">
        <img src="${img}" height="${element.album.images[2].height}" width="${element.album.images[2].width}" alt="">        
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
        //console.log(rowItem)
        rowItem.insertAdjacentHTML('beforeend', html)

    });

}

var tracks = [];

function btnAddTrackPlaylist() {
    console.log("sono dentro ")
    const btnAddItem = document.querySelectorAll(".btn-dark")
    console.log(btnAddItem)
    console.log(resultsTracks)

    btnAddItem.forEach(element => {
        element.addEventListener('click', () => {
            console.log(this);
            console.log(element);

            const found = resultsTracks.find(elem => elem.id == element.id);

            console.log(found)

            if (!found) { //SE NON TROVA UN UTENTE CON QUELLA STESSA SESISONE restituisce true se l'array è vuoto
                console.log("non lo trovato")
                return;
            }

            //AGGIUNGO LA TRACK ALL'ARRAY PLAYLIST
            tracks.push(found);
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



/* var films = []             HO INCOLLATO LA PARTE DELLA RICERCA
     
//document.addEventListener('keyup', ricercaFilm);



function ricercaFilm() {
    var cerca = document.getElementById('cerca');
    term = cerca.value;
    var t = document.getElementById("tabella");
    t.innerHTML = ""

    films
    .filter(film => film.title.toLowerCase().includes(term.toLowerCase()))
    .forEach( film => {
        t.innerHTML = t.innerHTML + "<tr><td>" + film.title + "</td></tr>"
    })
}

fetch('https://swapi.dev/api/films/')
    .then(
        function (response) {
            if (response.status !== 200) {
                //console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            response.json().then(function (data) {
                films = data.results
                ricercaFilm("")
            });
        }
    )
    .catch(function (err) {
        //console.log('Fetch Error :-S', err);
    });
    
*/

function LogOut() {      //logout utente, lo rimando alla prima pagina
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
    console.log("click su le tue playlist")

    users[users.indexOf(utenteLoggato)]['Playlists'] ? MyPlaylist = users[users.indexOf(utenteLoggato)]['Playlists'] : MyPlaylist = [];//MyPlaylistIsEmpty();

    if (!MyPlaylist.length) {
        tableMyPlaylist.innerHTML = "<tr><td></td><td><strong>NON SONO PRESENTI PLAYLIST</strong></td><td></td><td></td></tr>"
        return;
    }


    //console.log(pref)
    tableMyPlaylist.innerHTML = "";

    MyPlaylist.forEach(element => {
        if (element.collaborative) {
            isPublic = "PUBBLICO";
        } else {
            isPublic = "PRIVATA";
        }
        /* console.log(element.tracks[0].id)
        console.log(element.tracks)
        console.log(element.tracks[0]) */
        //tableMyPlaylist.innerHTML += "<tr class='accordion-toggle collapsed' id='accordion1' data-toggle='collapse' data-parent='#accordion1' href='#collapseOne'><td class='expand-button' ></td><td>" + element.name + "</td><td>" + element.description + "</td><td>" + isPublic + "</td><td><button onclick='deletePlaylist(this)' id='btnDeleteMyPL" + element.tracks[0].id + "' type='button' class='btn btn-danger'>X</button></td><td><button id='btnShowMyPL" + element.tracks[0].id + "' type='button' class='btn btn-primary'>X</button></td></tr>"
        tableMyPlaylist.innerHTML += "<tr data-bs-toggle='collapse' href='#collapseExample"+element.tracks[0].id+"' role='button' aria-expanded='false' aria-controls='collapseExample' ><td></td><td>" + element.name + "</td><td>" + element.description + "</td><td>" + isPublic + "</td><td><button onclick='deletePlaylist(this)' id='btnDeleteMyPL" + element.tracks[0].id + "' type='button' class='btn btn-danger'>X</button></td><td><button id='btnShowMyPL" + element.tracks[0].id + "' type='button' class='btn btn-primary'>X</button></td></tr>"

        //tableMyPlaylist.innerHTML += "<tr class='hide-table-padding'><td></td><td colspan='3'><div id='collapseOne' class='collapse in p-3'><div class='row'>CIAOOOO</div></div></td></tr>"
        //tableMyPlaylist.innerHTML += "<tr><td class='hiddenRow'><div id='demo3' class='accordian-body collapse'>Demo3 sadasdasdasdasdas</div></td></tr>"
        tableMyPlaylist.innerHTML += "<tr class='collapse' id='collapseExample"+element.tracks[0].id+"'><td colspan='6' ><div id='ModifyPL'>  <div></td></tr>"

        const ModifyPL = document.getElementById("ModifyPL");

        const html = 
        `
        <div class="container-fluid">
            <form action="" >
                <div class="mb-3">
                  <label for="playlistName" class="form-label"><strong>Nome playlist</strong></label>
                  <input type="text" class="form-control" value="${element.name}" >
                </div>
                <div class="mb-3">
                  <label for="playlistDescription" class="form-label"><strong>Descrizione Playlist</strong></label>
                  <input type="text" class="form-control" value="${element.description}">
                </div>
                <div class="mb-3">
                    <label for="tagPlaylist" class="form-label"><strong>Tag playlist</strong></label>
                    <input type="text" class="form-control" value="${element.tag}">
                  </div>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch">
                    <label class="form-check-label" for="flexSwitchCheckDefault"><strong>Playlist pubblica</strong></label>
                </div>
                <button type="submit" class="btn btn-primary" >Salva</button> 

            </form>
        </div>
        
        `;

        //console.log(rowItem)
        ModifyPL.insertAdjacentHTML('afterbegin', html)


});

};

//NON VIENE UTILIZZATA
function MyPlaylistIsEmpty() {

    console.log("non sono presenti playlist")
    tableMyPlaylist.innerHTML = "<tr><td>NON SONO PRESENTI PLAYLIST</td></tr>"
    return;
}

function deletePlaylist(sorgente) {
    console.log(sorgente);
    let preference = users[users.indexOf(utenteLoggato)]['Playlists']
    console.log(sorgente.id)
    console.log((sorgente.id).slice(-((sorgente.id).length - 13)))
    const result = preference.filter(element => element.tracks[0].id == (sorgente.id).slice(-((sorgente.id).length - 13)))  //il -13 toglie la parte con "btn"

    //console.log(preference)

    // result è un array che contiene gli elementi da eliminare 
    result.forEach(element => {
        //console.log(element);
        //console.log(preference.indexOf(element));
        preference.splice(preference.indexOf(element), 1);
    });

    users[users.indexOf(utenteLoggato)]['Playlists'] = preference;

    localStorage.setItem('users', JSON.stringify(users));


    fillTableMyPL();

}