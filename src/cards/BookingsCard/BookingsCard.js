import React, {useEffect, useState} from "react";
import './BookingsCard.css'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import axios from "axios";

const roomTypes = {
    1: "Single Room",
    2: "Double Room",
    3: "Suite Room",
    4: "Matrimonial Room"
};

const BookingCard =({hotel, booking}) =>{
    const [displayDateInput, setDisplayDateInput] = useState(false);
    const [formData, setFormData] = useState({
        checkInDate: '',
        checkOutDate: ''
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleChange=() =>{
        setDisplayDateInput( prevState => !prevState)
    }
    const onClick = async () => {
        try {
            await axios.delete(`http://localhost:8080/bookings/${booking.id}`);

        } catch (error) {
            console.error("Could not cancel booking", error);
        }
    };

    console.log(booking)

    return(
        <div className={'bookContainer'}>
            <div className={'imageR'}/>
            <div className={'writingContR'}>
                <h4 className={'RType'}>{hotel.name}</h4>
                <p className={'bookingDetail'}>Check in:{booking.checkInDate}</p>
                <p className={'bookingDetail'}>Check out:{booking.checkOutDate}</p>
            </div>
            <button className={'cancelButton'} onClick={onClick}>Cancel Booking</button>
        </div>
    )
}

export default BookingCard;