import React from 'react';
import ReactCardFlip from 'react-card-flip';

const Card = ({ isFlipped, buttonId, cardNumber, handleCardClick}) => (
    <ReactCardFlip isFlipped={isFlipped} flipSpeedBackToFront={1} flipSpeedFrontToBack={1}>
        <button id={buttonId} className={`card card-front ${cardNumber === -1 ? "card-hide" : ""}`} onClick={handleCardClick} key="front">
        </button>
        <button id={buttonId} className={`card card-back ${cardNumber === -1 ? "card-hide" : ""}`} onClick={handleCardClick} key="back">
            {cardNumber}
        </button>
    </ReactCardFlip>
);

export default Card;