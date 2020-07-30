import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import DeleteButton from './DeleteButton';

// import StockCard from './StockCard'

export default class UserProfile extends Component {
    render() {
        let pendingArr = this.props.userObj.portfolio_lists.filter((portfolioItem) => {
            return portfolioItem.pending === true
        }
        )

        let filedArr = this.props.userObj.portfolio_lists.filter((portfolioItem) => {
            return portfolioItem.pending === false
        }
        )

        let pendingComponents = pendingArr.map((portfolio) => {
            return  <div class="pending-card">
                         <div class="p-3 mb-2 bg-dark text-white">
                            <NavLink to={`/${portfolio.stock.Symbol.toLowerCase()}`}>{portfolio.stock.Name}</NavLink>
                            {portfolio.volume>0? <div class="buy-volume">Buy Volume: {portfolio.volume}</div> : <div class="sell-volume">Sell Volume: {-portfolio.volume}</div>}
                            <div>Price: {portfolio.price}</div>
                            <DeleteButton
                            portfolioObj = {portfolio}
                            deleteFunction = {this.props.deleteFunction}
                            />
                        </div>
                </div>
        }
        )


        let filedComponents = filedArr.map((portfolio) => {
            return <div class="filed-card">
                    <div class="p-3 mb-2 bg-light text-dark">
                        <NavLink to={`/${portfolio.stock.Symbol.toLowerCase()}`}>{portfolio.stock.Name}</NavLink>
                        {portfolio.volume>0? <div class="buy-volume">Buy Volume: {portfolio.volume}</div> : <div class="sell-volume">Sell Volume: {-portfolio.volume}</div>}
                        <div>Price: {portfolio.price}</div>
                    </div>
                </div>
        }
        )
        return (
            <div class="user-profile">
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-greeting">
                            <div class="p-3 mb-2 bg-primary text-light">
                                <h1>Hi {this.props.userObj.username}!</h1>
                                <h5>Here you can see all orders</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4"></div>
                    <div class="col-md-3">
                        <div class="user-box">
                            {/* <h4>{this.props.userObj.username}'s profile</h4>
                            <h5>Your Manageable Fund: ${this.props.userObj.manageable_fund}</h5> */}
                            <div class="p-3 mb-2 bg-dark text-light">
                                {/* <h5>Hi {this.props.userObj.username}!</h5> */}
                                <h5>Your Manageable Fund is ${this.props.userObj.manageable_fund}</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <br/>
                <div class="row">
                    <div class="col-md-6">
                        <h3 class="transaction-title">Pending Transactions:</h3>
                        <div class="pending-table"> 
                        {pendingComponents}</div>
                    </div>

                    <div class="col-md-6">
                        <h3 class="transaction-title">Filed Transactions:</h3>
                        <div class="filed-table">
                            {filedComponents}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
