import React, { Component } from 'react'

export default class SellForm extends Component {

    state = {
        price: null,
        volume: null
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.state.price && this.state.volume) {
            if (this.state.volume >= this.props.volumeSum) {
                return alert(`You don't have enough volume to sell, the maximum you can sell is ${this.props.volumeSum}`)
            } else {
            let orderObj = {
                stock_id: this.props.stockId,
                user_id: this.props.user.id,
                price: this.state.price,
                volume: -this.state.volume,
                pending: true
            } 
            this.props.orderFunction(orderObj)
        }
        } else {
            alert("Invalid input in the sell form")
        }
        
    }
    

    render() {
        return (
            <div class="sell-form">
                Create Sell Order/Stop Order
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name: {this.props.stockName}
                    </label>
                    <br/>
                    <label>
                        Price: 
                        <input name="price" type="number" step="0.001" min="0" value={this.state.price} onChange={this.handleChange} />
                    </label>
                    <br/>
                    <label>
                        Volume: 
                        <input name="volume" type="number" min="0" value={this.state.volume} onChange={this.handleChange} />
                    </label>
                    <br/>
                        <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}