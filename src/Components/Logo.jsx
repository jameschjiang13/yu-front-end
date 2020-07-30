import React from 'react'
import IconYu from '../IconYu.png'
import { NavLink } from "react-router-dom";

export default function Logo() {
    return (
        <div>
            <NavLink to="/"><img src={IconYu} height="55px" width="45px" alt="Yu" /></NavLink>
        </div>
    )
}
