import React from 'react'
import './Pokecard.css'

//get images from this address, suffixed with {id}.png
const baseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"


const Pokecard = ({mon}) =>{
    return (
        <div className="Pokecard">
            <h3 className="Pokecard-name">{mon.name}</h3>
            <img src={`${baseUrl}${mon.id}.png`} alt={mon.name}></img>
            <p>Type: {mon.type}</p>
            <p>EXP: {mon.base_experience}</p>
        </div>
    )
}

export default Pokecard