import React, {useEffect, useState} from "react";
import './HotelCard.css'
import RedirectButton from "../RedirectButton";
import {useNavigate} from "react-router-dom";

const HotelCard=({hotel, userID}) =>{

    const navigate = useNavigate();
    const handleClick=() =>{
        navigate(`/Hotels/${hotel.id}`, {state: {userID, hotel}});
    }
    function getAverageRating(hotel){
        if(!hotel.reviews || hotel.reviews.length===0)
            return 0;
        const totalRating = hotel.reviews.reduce((sum, review) => sum + review.rating, 0);

        const averageRating = totalRating / hotel.reviews.length;

        return averageRating;
    }
    return(
        <div className={'card'}>
            <div className={'image'}/>
            <div className={'writingCont'}>
                <h4 className={'hname'}>{hotel.name}</h4>
                <h5 className={'rating'}>Rating: {getAverageRating(hotel)} stars!</h5>
            </div>
            <button className={'redirectButton'} onClick={handleClick}>About</button>
        </div>
        );
}

export default HotelCard;