import React, {useState, useEffect} from "react";
import './HotelAbout.css';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewCard from "../../cards/ReviewComponent/ReviewCard";
import RoomCard from "../../cards/RoomCard/RoomCard";
import BookingsCard from "../../cards/BookingsCard/BookingsCard";

const roomTypes = {
    1: "Single Room",
    2: "Double Room",
    3: "Suite Room",
    4: "Matrimonial Room"
};

const HotelAbout = () => {
    const { hotelId } = useParams();
    const location = useLocation();
    const { userID, hotel } = location.state;
    const [reviews, setReviews] = useState(hotel.reviews || []);
    const [formData, setFormData] = useState({
        userId: userID,
        hotelId: Number(hotelId),
        rating: '',
        comment: ''
    });
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        // Fetch rooms data
        const fetchRooms = async () => {
            try {
                const response = await axios.get("http://localhost:8080/getRooms");
                setRooms(response.data);
            } catch (error) {
                console.error("Could not fetch rooms", error);
            }
        };
        fetchRooms();
    }, []);
    const [bookedRooms, setBookedRooms] = useState([]);

    const handleRoomBooked = (roomId) => {
        const updatedRooms = hotel.rooms.filter(room => room.id !== roomId);
        setBookedRooms(prevRooms => [...prevRooms, roomId]);
    };
    const [currentView, setCurrentView] = useState('reviews');
    useEffect(() => {
        if (currentView === 'rooms') {
            const fetchRooms = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/getRooms/${hotelId}`);
                    setRooms(response.data);

                } catch (error) {
                    console.error("Could not fetch rooms", error);
                }
            };
            fetchRooms();
        }
    }, [currentView, hotelId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/saveReview", formData);
            setReviews(prevReviews => [...prevReviews, response.data]);
        } catch (error) {
            console.error("Could not save review", error);
        }
    };
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/${hotelId}/bookings?userId=${userID}`);
                setBookings(response.data);
            } catch (error) {
                console.error("Could not fetch bookings", error);
            }
        };
        fetchBookings();
    }, [hotelId]);
    const availableRooms = rooms.filter(room => room.available && !bookedRooms.includes(room.id));
    return (
        <div className={'fullContainer'}>
            <div className={'imageCont'}>
                <div className={'blackLayerImg'}></div>
                <h3 className={'hotelname'}>{hotel.name}</h3>
            </div>

            <div className={'buttonContainer'}>
                <button className={'styleButton'} onClick={() => setCurrentView("reviews")}>Reviews</button>
                <button className={'styleButton'} onClick={() => setCurrentView("rooms")}>Rooms</button>
                <button className={'styleButton'} onClick={() => setCurrentView("bookings")}>Bookings</button>
            </div>

            {currentView === 'reviews' && (
                <div className={'biggerCont'}>
                    <form onSubmit={handleSubmit}>
                        <div className={'inputContainer3'}>
                            <label className={'labelText'}>Leave a comment</label>
                            <input
                                type="text"
                                id="email/pass"
                                name="comment"
                                value={formData.comment}
                                onChange={handleChange}
                            />
                            <label htmlFor="rating" className={'labelText'}>Rating (between 1 and 5):</label>
                            <input
                                type="number"
                                id="quantity"
                                name="rating"
                                min="1"
                                max="5"
                                value={formData.rating}
                                onChange={handleChange}
                            />
                            <button type="submit" className={'styleButton'}>Submit</button>
                        </div>
                    </form>
                    {reviews.length > 0 ? (
                        <div>
                            {reviews.map((review, index) => (
                                <ReviewCard key={index} review={review} setCurrentView={setCurrentView} />
                            ))}
                        </div>
                    ) : (
                        <h5>Nothing to show</h5>
                    )}
                </div>
            )}

            {currentView === 'bookings' && (
                <div className={'biggerCont'}>
                    {bookings.length > 0 ? (
                        <div className={'someabout'}>
                            {bookings.map((booking, index) => (
                                <BookingsCard key={index} booking={booking} userId={userID} hotel={hotel} />
                            ))}
                        </div>
                    ) : (
                        <h5>No rooms available</h5>
                    )}
                </div>
            )}
            {currentView === 'rooms' && (
                <div className={'biggerCont'}>
                    {availableRooms.length > 0 ? (
                        <div className={'someabout'}>
                            {availableRooms.map((room, index) => (
                                <RoomCard key={index} room={room} userId={userID} />
                            ))}
                        </div>
                    ) : (
                        <h5>No rooms available</h5>
                    )}
                </div>
            )}
        </div>
    );
};

export default HotelAbout;
