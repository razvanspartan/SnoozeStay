import React, {useEffect, useState} from "react";
import './ReviewCard.css'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import axios from "axios";

const ReviewCard =({review}) =>{
    console.log(review)
    const[userEmail, setUserEmail] = useState("");

    useEffect(() =>{
        const fetchEmail = async() =>{
            try{
                const response = await axios.get(`http://localhost:8080/users/${review.id}`)
                setUserEmail(response.data.email);
            }catch(error){
                console.error("Error fetching user stuff", error)
            }
        }
        fetchEmail();
    }, [review.id]);
    return(
        <div className={'reviewContainer'}>
            <p className={'reviewerName'}>{userEmail}</p>
            <p className={'ratingStyle'}>Rating: {review.rating}</p>
            <p className={'comment'}>{review.comment}</p>
        </div>
    )
}

export default ReviewCard;