import React, { Component } from 'react'
import { NavLink } from "react-router-dom";

export default class RegisterButton extends Component {
    render() {
        return (
            <li>
                <NavLink to="/register">Register</NavLink>
            </li>
        )
    }
}
