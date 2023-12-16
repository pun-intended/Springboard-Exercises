import React, { useState } from "react";
import backOfCard from "./back.png";
import {useFlip} from "./hooks.js";
import "./PlayingCard.css"

/* Renders a single playing card. */
function PlayingCard({ front, back = backOfCard }) {
  const [isFacingUp, toggle] = useFlip(true);
  return (
    <img
      src={isFacingUp ? front : back}
      alt="playing card"
      onClick={toggle}
      className="PlayingCard Card"
    />
  );
}

export default PlayingCard;
