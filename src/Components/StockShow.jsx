import React, { Component } from 'react'
import BuyForm from './BuyForm'
import SellForm from './SellForm'

export default class StockShow extends Component {

    state = {
        stockObj: {},
        showList: []
    }

    handleInputChange = (e) => {
        let name = e.target.name

        this.state.showList.includes(name)
        ?
        this.setState((prevState) => {
            return {showList: prevState.showList.filter((row) => {
                return row !== name
            }
            )}
        })
        :
        this.setState((prevState) => {
            return {showList: [...prevState.showList, name]}
        })
    }
    

    

    

    componentDidMount() {
        fetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes?region=US&lang=en&symbols=${this.props.symbol.toLowerCase()}`, {
	        "method": "GET",
	        "headers": {
		        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
                // "x-rapidapi-key": "cda4f230dcmsh426d91d9da3a340p1f9a8cjsnce4ac5f11d9f"
                "X-RapidAPI-Key": "b7a05bf1admsh4d9bad370e6f604p1641ddjsn555780791a33"
	        }
        })
        .then(resp => resp.json())
        .then(resp => {this.setState({
            stockObj: resp.quoteResponse.result[0]
        })})
    }

    render() {
        let fullArr = this.props.user.portfolio_lists
        let relavantArr = fullArr.filter((transaction) => {
            return transaction.stock.id === this.props.id
        }
        ) 
        let volumeSum = relavantArr.map((transaction) => {
            return transaction.volume
        }
        ).reduce((a, b) => a + b, 0)

        let priceSum = relavantArr.map((transaction) => {
            return transaction.price*transaction.volume
        }
        ).reduce((a, b) => a + b, 0)
        let averagePrice = volumeSum===0? 0: priceSum/volumeSum

        
        return (
            <div class="stock-show-page">
                <div class="row">
                    <div class="col-md-9">
                        <div class="stock-show">
                            <div class="p-3 mb-2 bg-dark text-white">
                                <form>
                                    On this page, only show: 
                                    <label>
                                    Current Price
                                    <input
                                        name="current-price"
                                        type="checkbox"
                                        checked={!this.state.showList.includes("current-price")}
                                        onChange={this.handleInputChange} />
                                    </label>

                                    <label>
                                    Regular Market Day Range
                                    <input
                                        name="regular-market-day-range"
                                        type="checkbox"
                                        checked={!this.state.showList.includes("regular-market-day-range")}
                                        onChange={this.handleInputChange} />
                                    </label>

                                    <label>
                                    Target Price High
                                    <input
                                        name="target-price-high"
                                        type="checkbox"
                                        checked={!this.state.showList.includes("target-price-high")}
                                        onChange={this.handleInputChange} />
                                    </label>

                                    <label>
                                    Target Price Low
                                    <input
                                        name="target-price-low"
                                        type="checkbox"
                                        checked={!this.state.showList.includes("target-price-low")}
                                        onChange={this.handleInputChange} />
                                    </label>

                                    <label>
                                    Regular Market Volume
                                    <input
                                        name="regular-market-volume"
                                        type="checkbox"
                                        checked={!this.state.showList.includes("regular-market-volume")}
                                        onChange={this.handleInputChange} />
                                    </label>

                                    <label>
                                    Revenue
                                    <input
                                        name="revenue"
                                        type="checkbox"
                                        checked={!this.state.showList.includes("revenue")}
                                        onChange={this.handleInputChange} />
                                    </label>

                                    <label>
                                    Beta
                                    <input
                                        name="beta"
                                        type="checkbox"
                                        checked={!this.state.showList.includes("beta")}
                                        onChange={this.handleInputChange} />
                                    </label>

                                    <label>
                                    Short Ratio
                                    <input
                                        name="short-ratio"
                                        type="checkbox"
                                        checked={!this.state.showList.includes("short-ratio")}
                                        onChange={this.handleInputChange} />
                                    </label>

                                    <label>
                                    Peg Ratio
                                    <input
                                        name="peg-ratio"
                                        type="checkbox"
                                        checked={!this.state.showList.includes("peg-ratio")}
                                        onChange={this.handleInputChange} />
                                    </label>

                                    <label> 
                                    Dividend Rate
                                    <input
                                        name="dividend-rate"
                                        type="checkbox"
                                        checked={!this.state.showList.includes("dividend-rate")}
                                        onChange={this.handleInputChange} />
                                    </label>
                                    
                                
                                </form>

                            <p class="card-text">
                                Name: {this.props.name}
                            </p>
                            <p class="card-text">
                                Symbol: {this.props.symbol}
                            </p>
                            <p class="card-text">
                                Sector: {this.props.sector}
                            </p>
                            <p class="card-text">
                                Current Volume Holding: {volumeSum}
                            </p>
                            <p class="card-text">
                                Average Holding Price: {averagePrice}
                            </p>
                            <p class="card-text">
                                {this.state.showList.includes("current-price")? null : <div>Current Price: {this.state.stockObj.regularMarketPrice}</div>}
                            </p>
                            <p class="card-text">
                                {this.state.showList.includes("regular-market-day-range")? null : <div>Regular Market Day Range: {this.state.stockObj.regularMarketDayRange}</div>}
                            </p>
                            <p class="card-text">
                                {this.state.showList.includes("target-price-high")? null : <div>Target Price High: {this.state.stockObj.targetPriceHigh}</div>}
                            </p>
                            <p class="card-text">
                                {this.state.showList.includes("target-price-low")? null : <div>Target Price Low: {this.state.stockObj.targetPriceLow}</div>}
                            </p>
                            <p class="card-text">
                                {this.state.showList.includes("regular-market-volume")? null : <div>Regular Market Volume: {this.state.stockObj.regularMarketVolume}</div>}
                            </p>
                            <p class="card-text">
                                {this.state.showList.includes("revenue")? null : <div>Revenue: {this.state.stockObj.revenue}</div>}
                            </p>
                            <p class="card-text">
                                {this.state.showList.includes("beta")? null : <div>Beta: {this.state.stockObj.beta}</div>}
                            </p>
                            <p class="card-text">
                                {this.state.showList.includes("short-ratio")? null : <div>Short Ratio: {this.state.stockObj.shortRatio}</div>}
                            </p>
                            <p class="card-text">
                                {this.state.showList.includes("peg-ratio")? null : <div>Peg Ratio: {this.state.stockObj.pegRatio}</div>}
                            </p>
                            <p class="card-text">
                                {this.state.showList.includes("dividend-rate")? null : <div>Dividend Rate: {this.state.stockObj.dividendRate}</div>}
                            </p>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <BuyForm
                            user = {this.props.user}
                            stockName = {this.props.name}
                            stockId = {this.props.id}
                            manageable_fund={this.props.user.manageable_fund}

                            orderFunction = {this.props.orderFunction}
                            />

                        <SellForm
                            user = {this.props.user}
                            stockName = {this.props.name}
                            stockId = {this.props.id}
                            volumeSum = {volumeSum}

                            orderFunction = {this.props.orderFunction}
                            />
                    </div>
                </div>



                <div class="row">
                    <div class="col-md-6">
                        
                    </div>

                    <div class="col-md-6">
                        
                    </div>
                </div>                
            </div>
        )
    }
}
