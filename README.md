# progetto-awc
progetto applicazioni web e cloud 

Premessa

La specifica del problema che deve essere affrontato `e per sua natura incompleta e pu`o essere ambigua. Il candidato deve essere in grado di valutare eventuali soluzioni alternative e giustificare le scelte implementative
adottate. Le motivazioni delle scelte fatte vanno inoltre documentate nel
progetto. Il lavoro consiste di cinque fasi principali: i) analisi dei requisiti; ii) identificazione delle funzionalit`a da sviluppare; iii) progettazione
della struttura e della presentazione delle pagine web; iv) progettazione
della sorgente di informazioni statica o dinamica; v) implementazione
dell’applicazione stessa.

2 Requisiti

Il progetto si pone l’obiettivo di sviluppare l’applicazione web Gestione
di Comunita Musicali Online (GCMO) ` che implementa un sito di
gestione di playlist musicali. GCMO gestisce il processo di organizzazione
di playlist musicali di pi`u utenti e la loro condivisione. E composto da `
due macro-scenari principali:
– gestione delle playlist;
– gestione delle condivisioni.
L’applicazione prevede una fase di registrazione utente dove verranno
collezionate informazioni quali nome utente, indirizzo email, password,
preferenze musicali, gruppi preferiti.
Di seguito sono analizzate in dettaglio le caratteristiche dei due macroscenari introdotti. Il primo macro-scenario (gestione delle playlist) consiste nella gestione di liste musicali. Gli utenti devono potersi collegare
all’applicazione, modificare i propri dati/preferenze e cancellarsi. Per ogni
utente si dovranno gestire le informazioni inserite nella fase di registrazione. Un utente, una volta registrato, pu`o collegarsi all’applicazione
e creare/modificare/cancellare liste musicali contententi un elenco di
canzoni. L’elenco delle canzoni viene acquisito tramite le API REST
del portale Spotify (https://developer.spotify.com/documentation
web-api/reference). Per ogni canzone dovranno essere gestite le informazioni principali quali titolo, cantante, genere, durata e anno di pubblicazione. Un utente, successivamente, pu`o collegarsi all’applicazione
e modificare/cancellare playlist esistenti di cui `e proprietario. Per ogni
playlist un utente deve inserire una descrizione testuale e uno o pi`u tag
descrittivi.
Il secondo scenario (gestione delle condivisioni) consiste nella classica
condivisione di oggetti all’interno di un’applicazione web. Gli utenti possono decidere quale delle playlist da loro composte rendere pubbliche ad
altri utenti. In un’area dedicata del portale gli utenti possono ricercare
le playlist pubbliche, visualizzare le informazioni principali (elenco delle
canzoni, durata, tag e descrizione) e decidere se importarle nel proprio
profilo. La ricerca delle playlist pubbliche deve fornire come criteri di
ricerca almeno i tag associati e le canzoni in esse contenute.
3 Composizione gruppi e operazioni richieste
Lo svolgimento del progetto `e una prova d’esame da svolgere individualmente o in gruppi di al pi`u due persone. Pi`u il gruppo `e numeroso
maggiori sono le funzionalit`a richieste per sostenere l’esame.
3.1 Operazioni per gruppi di una o due persone
Le operazioni base che devono essere presentate al momento della discussione del progetto sono le seguenti:
– Registrazione e login al sito
– Aggiunta/Modifica/Cancellazione delle playlist private.
– Aggiunta/Cancellazione delle playlist pubbliche.
– Visualizzazione di informazioni relative alle playlist, alle canzoni, agli
utenti.
– Visualizzazione delle canzoni.
– Ricerca delle canzoni (ad es., tipologia, autore, cantante, genere).
– Visualizzazione delle playlist private e delle pubbliche di altri utenti.
Allo startup dell’applicazione, tutti i dati necessari devono essere
disponibili (in formato XML o JSON), memorizzati nel web storage e
visualizzati nell’applicazione web.
Le operazioni in questa sezione sono quelle che tutti i gruppi (indipendentemente dalla loro composizione) devono presentare all’esame.
Operazioni e funzionalit`a aggiuntive possono essere implementate a piacere. Le pagine web devono essere implementate utilizzando HTML5
CSS3 e JavaScript, e devono seguire un paradigma di separazione tra la
struttura (HTML5) e la rappresentazione (CSS3) della pagina web.
Le informazioni visualizzate all’interno delle pagine del sito web devono essere memorizzate e accedute nel web storage del browser in formato XML o JSON. Devono essere perci`o previste operazioni per la presentazione e modifica delle informazioni.
