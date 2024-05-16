import React, {useState} from "react";
import './SignIn.css'
import {Link, useNavigate} from 'react-router-dom'
import {Frame1} from "../../assets/IconSvg";
import RedirectButton from "../../cards/RedirectButton";
import InputArea from "../../cards/inputArea";

const SignIn = () =>{
    const [formData, setFormData] = useState({
        Email:'',
        Password:''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const navigate = useNavigate();
    const handleSubmit = (e) =>{
        e.preventDefault();
        navigate('/Hotels')

    }
    return(
        <div className={'cardContainer'}>
            <div className={'formContainer'}>
                <h4 className={'formHeader'}>Sign in</h4>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className={'inputContainer2'}>
                            <input
                                type="text"
                                name="Email"
                                id="email/pass"
                                value={formData.Email}
                                onChange={handleChange}
                            />
                            <label className={formData.Email ? 'hidden' : 'text'}>Email..</label>
                        </div>
                        <div className={'inputContainer2'}>
                            <input
                                type="text"
                                name="Password"
                                id="email/pass"
                                value={formData.Password}
                                onChange={handleChange}
                            />
                            <label className={formData.Password ? 'hidden' : 'text'}>Password..</label>
                        </div>
                        <button className={'submitButton'}>Submit</button>
                    </form>
                </div>
                <div className={'imageContainer'}>
                    <div className={'blackLayer'}>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;