import React from 'react';

function CardButton({ activeState, actionCallback, buttonTextTrue, buttonTextFalse }) {
    
    if (activeState) {
        return <button className="primary" onClick={actionCallback}>{buttonTextTrue}</button>
    } else {
        return <button onClick={actionCallback}>{buttonTextFalse}</button>
    }
}

export default CardButton;