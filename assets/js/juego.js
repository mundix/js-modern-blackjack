/**
 * 2C = Two of Clubs
 * 2D = Two of Diamond
 * 2H = Two of Heart
 * 2S = Two os Spade
 */
// Para encapsular con una funcion de flecha o landa, pero seria una funcion anonima, que se llame a si misma
// usando (()=>{})() 
//Esto no hace posible llamar el objeto directamente
(() => {
    //Siempre dejarlo habilitado cuadno uen esten patron
    'use strict' //Le dice a js se estricto a la hroa de usar mi codigo 
    // const personajes = ['ana', 'mercy', 'may'];
    // console.log(personajes);


    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    // variables acumulativas para el juego
    let puntosJugadores = []; //un array de jugadores, donde la posicion del arreglo son lso jugadores

    // Espacio para las referencias dle HTML 
    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');

    //Solo meinteresa el primero que coincide coneste ID
    const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHTML = document.querySelectorAll('small');

    // Esta funcion inicializa el juego. 
    const inicializarJuego = (numJugadores = 1) => {
        deck = crearDeck();
        // console.log({numJugadores});
        //El ultimo jugador siempre sera la compu 
        for (let index = 0; index < numJugadores; index++) {
            puntosJugadores.push(0);
        }
        console.log(puntosJugadores);
    }

    // Esta funcion crea un nuevo deck 
    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {

            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }
        // Method from library undercore.min.js _.shuffle();
        return _.shuffle(deck);
    };


    // Esta funcion me permite perdir carta
    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop(); //La ultima carta
    };

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1); //Se remueve la ultima letra
        return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1;
    };

    //Quiero acumular los puntos de los jugaroes, la compu es un jugador 
    // Turno 0- primer jugador, y el ultimo es la compu 
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerHTML = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const   imgCarta = document.createElement('img');
                imgCarta.src = `assets/cartas/${carta}.png`;
                imgCarta.classList.add('carta');
                divCartasJugadores[turno].append(imgCarta);
    }

    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            // Necesito ir sumando las cartas, crear variables puntosJugador, y puntosComputadora 
            //Es el utlimo jugador el turno 
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);
            //Como hacer que aparesca una nueva carta 
            // const imgCarta = document.createElement('img');
            // imgCarta.src = `assets/cartas/${carta}.png`;
            // imgCarta.classList.add('carta');
            // divCartasComputadora.append(imgCarta);

            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        setTimeout(() => {
            if (puntosMinimos === puntosComputadora) {
                alert('Nedie ganó :`(');
            } else if (puntosMinimos > 21) {
                alert('Computadora gana');
            } else if (puntosComputadora > 21) {
                alert('Jugador Gana');
            } else {
                alert('Computadora Gana !');
            }
        }, 10);

    };

    const detenerJuego = () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[puntosJugadores.length - 1]);
    };

    // let valor = valorCarta('9D');
    //  let valor = valorCarta(pedirCarta()); //Este no esta controlado, si no que se ejecuta a la primera 

    // Eventos
    btnPedir.addEventListener('click', () => {
        // #1 es tomar una carta
        const carta = pedirCarta();
        // Necesito ir sumando las cartas, crear variables puntosJugador, y puntosComputadora 
        const puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta, 0);
        //Como hacer que aparesca una nueva carta 
        // const imgCarta = document.createElement('img');
        // imgCarta.src = `assets/cartas/${carta}.png`;
        // imgCarta.classList.add('carta');
        // divCartasJugadores.append(imgCarta);

        // Ahora necesto controlar la parte de los puntos. 
        // Evaluar si tienemas de 21 perdio 
        if (puntosJugador > 21) {
            console.warn('Lo siento mucho perdiste');
            detenerJuego();
        } else if (puntosJugador === 21) {
            detenerJuego();
            console.warn('21, Genial !!!');
        }

    });

    // Evento detener
    btnDetener.addEventListener('click', () => {
        detenerJuego();
    });

    //  Event Nuevo 
    btnNuevo.addEventListener('click', () => {
        //Reiniciar el deck
        // deck = [];
        // crearDeck();
        console.clear();
        inicializarJuego(2);
        // puntosComputadora = puntosJugador = 0;
        // puntosHTML[0].innerHTML = puntosHTML[1].innerHTML = 0;
        // divCartasJugador.innerHTML = divCartasComputadora.innerHTML = '';
        // btnDetener.disabled = btnPedir.disabled = false;

    });

})();
//Esto se conoce como el "patron moddulo" , patron muy comun que se usa fuera


// TODO: borrar
// turnoComputadora(12);
