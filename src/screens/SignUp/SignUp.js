import React, {useState} from "react";
import './SignUp.css'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import {Frame1} from "../../assets/IconSvg";
import RedirectButton from "../../cards/RedirectButton";
import InputArea from "../../cards/inputArea";

const SignUp = () =>{
    const[error, setError] = useState(0)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email:'',
        password:''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const navigate = useNavigate();
    const  handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/usersRegister', formData)
            const userID = await response.data.id;
            console.log(response.data)
            navigate("/Hotels", {state: {userID: userID}});
        }catch(error){
            console.error('Error', error)
            setError(1)
        }


    }
    return(
        <div className={'cardContainer'}>
            <div className={'formContainer'}>
                <h4 className={'formHeader'}>Sign up</h4>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className={'FNLNContainer'}>
                            <div className={'inputContainer'}>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                                <label className={formData.firstName ? 'hidden' : 'text'}>First name..</label>
                            </div>
                            <div className={'inputContainer'}>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                                <label className={formData.lastName ? 'hidden' : 'text'}>Last name..</label>
                            </div>
                        </div>
                        <div className={'inputContainer2'}>
                            <input
                                type="text"
                                name="email"
                                id="email/pass"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <label className={formData.email ? 'hidden' : 'text'}>Email..</label>
                        </div>
                        <div className={'inputContainer2'}>
                            <input
                                type="password"
                                name="password"
                                id="email/pass"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <label className={formData.password ? 'hidden' : 'text'}>Password..</label>
                        </div>
                        <button className={'submitButton'}>Submit</button>
                    </form>
                    <p className={error!==1 ? 'hidden' : ''}>Something went wrong</p>
                </div>
                <div className={'imageContainer'}>
                    <div className={'blackLayer'}>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;