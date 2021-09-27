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
    console.log(deck);
    return deck;
}


crearDeck();

// Esta funcion me permite perdir carta
const pedirCarta = () => {

    // const carta = '2C';
    const carta = deck.pop(); //La ultima carta 

    // const index = deck.indexOf(carta);
    // console.log(index);
    // deck.splice(index, 1);

    console.log(deck);
    return '2C';
}

pedirCarta();