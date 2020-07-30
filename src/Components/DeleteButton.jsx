import React, { Component } from 'react'

export default class DeleteButton extends Component {

    handleClick = (e) => {
        this.props.deleteFunction(this.props.portfolioObj)
    }
    

    render() {
        return (
            <button type="button" class="btn btn-warning" onClick={this.handleClick}>
                Delete
            </button>

        )
    }
}
