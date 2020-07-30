import React, { Component } from 'react'
// import { Redirect } from "react-router-dom";
export default class Logout extends Component {

    state = {
        navigate: false
    }

    handleClick = (e) => {
        localStorage.clear("token")
        this.setState({
            navigate: true
        })
        this.props.logoutFunction()
    }
    

    render() {
        // if (this.state.navigate) {
        //     return <Redirect to="/login" push={true} />
        // }
        return (
            <button class="logout-button" onClick={this.handleClick}>Log Out</button>
        )
    }
}
