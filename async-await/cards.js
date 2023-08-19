const URL = "https://deckofcardsapi.com/api/deck"
let $draw = $("#draw")
let $table = $("#table")


class Deck {
    constructor(){
        this.id;
        this.remaining;
    }
    async init(){
        let res = await axios.get(`${URL}/new/shuffle/?deck_count=1`)
        this.id = res.data.deck_id
        this.remaining = res.data.remaining
    }
    async drawCard(){
        let card;
        let res = await axios.get(`${URL}/${this.id}/draw`)
        let cardImage = res["data"]["cards"][0]["image"]
        this.remaining = res.data.remaining
        card = `<img src="${cardImage}"></img>`
        $table.append(card)
    }
    
}

let deck = new Deck()
deck.init()

$draw.click(function(){
    if(deck.remaining > 50){
        deck.drawCard()
    }
});