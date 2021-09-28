/**
 * 2C = Two of Clubs
 * 2D = Two of Diamond
 * 2H = Two of Heart
 * 2S = Two os Spade
 */

let deck            = [];
const tipos         = ['C', 'D', 'H', 'S'];
const especiales    = ['A', 'J', 'Q', 'K'];

// Esta funcion crea un nuevo deck 
const crearDeck = () => {
    for (let i=2; i <= 10; i++) {
        
        for(let tipo of tipos ) {
            deck.push(i + tipo);
        }

        
    }

    for(let tipo of tipos) {
        for ( let esp of especiales ) {
            deck.push( esp + tipo);
        }
    }

    // console.log(deck);
    deck = _.shuffle(deck);
    // console.log(deck);
    return deck;
}


crearDeck();

// Esta funcion me permite perdir carta
const pedirCarta = () => {

    if ( deck.length === 0) {
        throw 'No hay cartas en el deck';
    }

    // const carta = '2C';
    const carta = deck.pop(); //La ultima carta 

    // const index = deck.indexOf(carta);
    // console.log(index);
    // deck.splice(index, 1);

    // console.log(carta);
    // console.log(deck);
    return carta;
}

// pedirCarta();

const valorCarta = (carta) => {

    const valor = carta.substring(0 , carta.length - 1); //Se remueve la ultima letra
    // let puntos = 0;
    // El valo si so numeros es su equivalente , pero en caso de letras es dif
    // if ( isNaN(valor)) {
    //     console.log('No ex un numero');  
    //     puntos = (valor === 'A') ? 11 : 10;
    // }else {
    //     console.log('Es un numero');
    //     puntos = valor * 1; //Si multiplico el valor por numero, se convierte en version numerica
    // }
    // Vaor esta siendo un string y hay que trasnformalo a numero 
    // console.log(puntos + 5) ;
    return ( isNaN(valor)) ? (valor === 'A') ? 11 : 10 :  valor * 1;
}

// let valor = valorCarta('9D');
let valor = valorCarta(pedirCarta());
// console.log({valor});