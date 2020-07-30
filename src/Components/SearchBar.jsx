import React, { Component } from 'react'

export default class SearchBar extends Component {

    handleInput = (e) => {
        this.props.searchFunction(e.target.value)
    }
    
    render() {


        return (
            <div class="search-bar">
                <input type="text" id="myInput" onChange={this.handleInput} value={this.props.searchedTerm} placeholder="Search for stocks.."></input>
            </div>
        )
    }
}
