import React, {useState} from "react";
import './Layout.css'
import {Link} from 'react-router-dom'
import {Frame1} from "../../assets/IconSvg";
import RedirectButton from "../../cards/RedirectButton";

const Layout=({children}) =>{
    return (
        <div className='mainLayout'>
            <div className='headerContainer'>
                <div className={'iconContainer'}>
                <Frame1></Frame1>
                </div>
                <h4 className={'iconName'}>SnoozeStay.com</h4>
                <RedirectButton to={"/SignIn"} className={"HButton"}>Sign in</RedirectButton>

            </div>
            <main className={'cover'}>{children}</main>

        </div>
    );
}
export default Layout;