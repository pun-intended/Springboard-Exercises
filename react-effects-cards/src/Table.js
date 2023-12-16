import Card from "./Card";
import React, {useState, useEffect, useRef} from "react";
import axios from "axios"


function Table() {
    
    const [cards, setCards] = useState([])
    const [deck, setDeck] = useState(null)

    const shuffleBtn = useRef()

    useEffect(() => {
        async function getDeck() {
            const newDeck = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
            setDeck(newDeck.data)
        }
        getDeck()
    }, [])

    async function shuffle(){
        shuffleBtn.disabled = true
        const shuffledDeck = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle/`)
        setCards([])
        setDeck(shuffledDeck.data)
        shuffleBtn.disabled = false

    }
    async function drawCard(){
        if (deck.remaining < 1){
            alert("No cards remaining")
        } else {
            const card = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=13`)
            setDeck({
                "deck_id": deck.deck_id,
                "remaining": card.data.remaining
                })
            const image = card.data.cards[0].image
            setCards([
                <Card img={image} />,
                ...cards
        ])
        }
    }

    return(
        <div className="Table">
            <button className="Table-draw-btn" onClick={drawCard}>Draw a card</button>
            {cards? 
            cards[0] : "Please draw a card"}
            <button className="Table-shuffle-btn" onClick={shuffle} ref={shuffleBtn}>Shuffle</button>
        </div>
    )
}

export default Table