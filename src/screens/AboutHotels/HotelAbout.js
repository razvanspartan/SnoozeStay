import React, {useState} from "react";
import './HotelAbout.css'
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios';
import {Frame1} from "../../assets/IconSvg";
import RedirectButton from "../../cards/RedirectButton";
import InputArea from "../../cards/inputArea";
import ReviewCard from "../../cards/ReviewComponent/ReviewCard";


const HotelAbout =() =>{
    const { hotelId} = useParams();
    const location = useLocation();
    const { userID, hotel } = location.state;
    const [reviews, setReviews] = useState(hotel.reviews || []);
    const [formData, setFormData] = useState({
        userId: userID,
        hotelId: Number(hotelId),
        rating: '',
        comment:''
    });
    const [currentView, setCurrentView] = useState('reviews');
    console.log(hotel)
    console.log(hotelId)
    console.log(userID)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            console.log(formData)
            const response = await axios.post("http://localhost:8080/saveReview", formData)
            console.log(response.data)
            setReviews(prevReviews => [...prevReviews, response.data])
        }catch(error){
            console.log("Couldnt save review", {error})
        }

    }

    return(
        <div className={'fullContainer'}>
            <div className={'imageCont'}>
                <div className={'blackLayerImg'}>
                </div>
                <h3 className={'hotelname'}>{hotel.name}</h3>
            </div>

            <div className={'buttonContainer'}>
                <button className={'styleButton'} onClick={()=> setCurrentView("reviews")}>Reviews</button>
                <button className={'styleButton'} onClick={()=> setCurrentView("rooms")}>Rooms</button>
            </div>

            {currentView === 'reviews' && (

                <div className={'biggerCont'}>
                    <form onSubmit={handleSubmit}>
                        <div className={'inputContainer3'}>
                            <label className={'labelText'}>Leave a comment</label>
                            <input
                                type="text"
                                name="comment"
                                id="email/pass"
                                value={formData.comment}
                                onChange={handleChange}
                            />
                            <label htmlFor="quantity" className={'labelText'}>Rating (between 1 and 5):</label>
                            <input type="number" id="quantity" name="rating" min="1" max="5" value={formData.rating} onChange={handleChange}/>
                            <button type="submit" className={'styleButton'} onClick={() => setCurrentView("reviews")}>Submit</button>
                        </div>
                    </form>
                    {reviews && reviews.length > 0 ? (
                        <div>
                        {reviews.map((review, index) => (
                                    <ReviewCard key={index} review={review}></ReviewCard>
                                ))}
                            </div>
                        ) : (
                            <h5>Nothing to show</h5>
                        )}


                </div>
                )}

        </div>
    )
}

export default HotelAbout;