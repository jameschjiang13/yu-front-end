import { useHistory } from "react-router-dom";

import React from 'react'

export default function StockCard(props) {

    let history = useHistory()

    let handleClick = (e) => {
        history.push(`/${props.symbol.toLowerCase()}`)
    }
    return (
            <div className="cardd">
                <div class="col-sm-12" >
                    <div class="card text-white bg-secondary mb-3">
                        <h5 class="card-title">{props.name}</h5>
                        <p class="card-text">Symbol: {props.symbol} </p>
                        <p class="card-text">Sector: {props.sector} </p>
                        <a onClick={handleClick} class="btn btn-primary">More Details</a>
                    </div>
                </div>
            </div>
    )
}

