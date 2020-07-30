import React from 'react'
import Logo from './Logo'
import ProfileIcon from './ProfileIcon'
import LoginButton from './LoginButton'
import RegisterButton from './RegisterButton'
import HomeIcon from './HomeIcon'
import Logout from './Logout'

export default function Header(props) {
    return (
        <div>
            {/* <li class="logo"><Logo/></li> */}
            <header class="header">
                <ul className="nav">
                        <li><HomeIcon/></li>
                        <li><ProfileIcon/></li>
                        <li><LoginButton
                        token = {props.token}
                        /></li>
                        <li><RegisterButton/></li>
                        <li><Logout
                        logoutFunction = {props.logoutFunction}
                        /></li>
                </ul>
            </header>
        </div>
    )
}
