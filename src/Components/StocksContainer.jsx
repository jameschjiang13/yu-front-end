import React from 'react'
import StockCard from './StockCard'

export default function StocksContainer(props) {
    let componentsArr = props.StocksList.map((stock) => {
        return <StockCard
        key = {stock.id}
        name = {stock.Name}
        symbol = {stock.Symbol}
        sector = {stock.Sector}
        />
    }
    )
    return (
        <div class="stock-list">
            {componentsArr}
        </div>
    )
}
