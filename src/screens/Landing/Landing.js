import React, {useEffect, useState} from "react";
import './Landing.css'
import {Link} from 'react-router-dom'
import {Frame1} from "../../assets/IconSvg";
import RedirectButton from "../../cards/RedirectButton";

const Landing=() =>{

    return(

        <div className={'mainContainer'}>
            <div className={'layerBlack'}/>
            <div className={'textContainer'}>
                <div className={'headTextCont'}>
                <h2 className={'text'}>Discover your</h2> <h2 className={'textColor'}> ideal </h2>  <h2 className={'textInline'}>stay!</h2></div>
                <p>Welcome to SnoozeStay, your one-stop destination for hassle-free hotel booking.
                    Explore top-rated accommodations tailored to your needs. Book confidently and experience comfort and convenience like never before.</p>
                <RedirectButton to={'/SignUp'} className={'signUpButton'}>Get started</RedirectButton>
            </div>
        </div>

    );
}
export default Landing;