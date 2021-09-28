/**
 * 2C = Two of Clubs
 * 2D = Two of Diamond
 * 2H = Two of Heart
 * 2S = Two os Spade
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

// variables acumulativas para el juego
let puntosJugador = 0,
    puntosComputadora = 0;

// Espacio para las referencias dle HTML 
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

//Solo meinteresa el primero que coincide coneste ID
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const puntosHTML = document.querySelectorAll('small');

// Esta funcion crea un nuevo deck 
const crearDeck = () => {

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

    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
};

crearDeck();

// Esta funcion me permite perdir carta
const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop(); //La ultima carta 
    return carta;
};

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1); //Se remueve la ultima letra
    return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1;
};

const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        // Necesito ir sumando las cartas, crear variables puntosJugador, y puntosComputadora 
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerHTML = puntosComputadora;

        //Como hacer que aparesca una nueva carta 
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if (puntosMinimos > 21) {
            break;
        }

    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
};

const detenerJuego  = () =>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
};

// let valor = valorCarta('9D');
let valor = valorCarta(pedirCarta());

// Eventos
btnPedir.addEventListener('click', () => {
    // #1 es tomar una carta
    const carta = pedirCarta();
    // Necesito ir sumando las cartas, crear variables puntosJugador, y puntosComputadora 
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerHTML = puntosJugador;

    //Como hacer que aparesca una nueva carta 
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

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

// TODO: borrar
// turnoComputadora(12);
