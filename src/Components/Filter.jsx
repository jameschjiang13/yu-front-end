import React, { Component } from 'react'

export default class Filter extends Component {

    handleChange = (e) => {
        this.props.filterFunction(e.target.value)
    }
    
    render() {
        return (
            <div>
                <div>
                    <select class="filter" onChange={this.handleChange}>
                        <option value="">All Sectors</option>
                        <option value="Communication Services">Communication Services</option>
                        <option value="Consumer Discretionary">Consumer Discretionary</option>
                        <option value="Consumer Staples">Consumer Staples</option>
                        <option value="Energy">Energy</option>
                        <option value="Financials">Financials</option>
                        <option value="Health Care">Health Care</option>
                        <option value="Industrials">Industrials</option>
                        <option value="Materials">Materials</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Technology">Technology</option>
                        <option value="Utilities">Utilities</option>
                    </select>
                </div>
            </div>
            
        )
    }
}

