import React, { Component } from 'react'
import { NavLink } from "react-router-dom";


export default class LoginButton extends Component {

    render() {
        return (
            <li>
                <NavLink to="/login">{this.props.token? "Switch User" : "Login"}</NavLink>
            </li>
        )
    }
}
