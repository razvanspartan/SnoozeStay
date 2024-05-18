import React, {useEffect, useState} from "react";
import './Hotels.css'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {Frame1} from "../../assets/IconSvg";
import RedirectButton from "../../cards/RedirectButton";
import HotelCard from "../../cards/HotelCard/HotelCard";

const Hotels =() =>{
    const location = useLocation();
    const userID = location.state ? location.state.userID : null;
    const [formData, setFormData] = useState({
        radius:''
    });

    const [hotels, setHotels] = useState([]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const radius = formData.radius;
        try{
            const response = await fetch(`http://localhost:8080/withinRadius?radius=${radius}`)
            const data = await response.json();
            setHotels(data);
        }catch(error){
            console.error("Error fetching stuff(hotels):", error)
        }
    }
    return(
        <div className={'HpageMainContainer'}>
            <div className={'hheaderContainer'}>
                <form className={'formContainerH'} onSubmit={handleSubmit}>

                    <p className={'labelText'}>Radius in km:</p>
                    <div className={'inputRContainer'}>
                        <input
                            type="text"
                            name="radius"
                            id="radiusI"
                            value={formData.radius}
                            onChange={handleChange}
                        />
                    </div>

                    <button className={'HsubmitButton'}>Find</button>
                </form>
            </div>
            <div className={'listContainer'}>
                {Array.isArray(hotels) && hotels.map(hotel=> (
                    <HotelCard key={hotel.id} hotel={hotel} userID={userID} />
                ))}
            </div>
        </div>
    );
}

export default Hotels;