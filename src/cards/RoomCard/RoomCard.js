import React, {useEffect, useState} from "react";
import './RoomCard.css'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import axios from "axios";

const roomTypes = {
    1: "Single Room",
    2: "Double Room",
    3: "Suite Room",
    4: "Matrimonial Room"
};

const RoomCard =({room, userId, onRoomBooked, setCurrentView}) =>{
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        const bookingData = {
            checkInDate: formData.checkInDate,
            checkOutDate: formData.checkOutDate,
            user: { id: userId },
            room: { id: room.id }
        };

        try {
            const response = await axios.post('http://localhost:8080/bookRoom', bookingData);
            onRoomBooked(room.id);
            setCurrentView('reviews');
            console.log("Booking successful:", response.data);
        } catch (error) {
            console.error("Booking failed:", error);
        }
        setDisplayDateInput(false);
    };

    return(
        <div className={`roomContainer ${displayDateInput ? 'expanded' : ''}`}>
            <div className={'imageR'}/>
            <div className={'writingContR'}>
                <h4 className={'RType'}>{roomTypes[room.type]}</h4>
                <h5 className={'price'}>Price: {room.price}</h5>
            </div>
            <button className={`bookButton ${displayDateInput ? 'red' : ''}`} onClick={handleChange}>{displayDateInput ? "Cancel" : "Book!"}</button>
            {displayDateInput && (
            <div className={'checkInOutContainer'}>
                <form onSubmit={handleSubmit}>
                    <div className={'checkInOutContainer'}>
                        <label htmlFor="checkInTime" className={'labelText'}>Choose check in:</label>
                        <input type="datetime-local" id="checkInTime" name="checkInDate"
                        value={formData.checkInDate} onChange={handleInputChange}/>
                        <label htmlFor="checkOutTime" className={'labelText'}>Choose check out:</label>
                        <input type="datetime-local" id="checkOutTime" name="checkOutDate"
                        value={formData.checkOutDate} onChange={handleInputChange}/>
                    </div>
                    <button className={'checkInOutButton'} type="submit">Submit!</button>
                </form>
            </div>
            )}
        </div>
)
}

export default RoomCard;