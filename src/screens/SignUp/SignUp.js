import React, {useState} from "react";
import './SignUp.css'
import {Link} from 'react-router-dom'
import {Frame1} from "../../assets/IconSvg";
import RedirectButton from "../../cards/RedirectButton";
import InputArea from "../../cards/inputArea";

const SignUp = () =>{
    const [formData, setFormData] = useState({
        FN: '',
        LN: '',
        Email:'',
        Password:''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    return(
        <div className={'cardContainer'}>
            <div className={'formContainer'}>
                <h4 className={'formHeader'}>Sign up</h4>
                <div>
                    <form>
                        <div className={'FNLNContainer'}>
                            <div className={'inputContainer'}>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="FN"
                                    value={formData.FN}
                                    onChange={handleChange}
                                />
                                <label className={formData.FN ? 'hidden' : 'text'}>First name..</label>
                            </div>
                            <div className={'inputContainer'}>
                                <input
                                    type="text"
                                    name="LN"
                                    id="lastName"
                                    value={formData.LN}
                                    onChange={handleChange}
                                />
                                <label className={formData.LN ? 'hidden' : 'text'}>Last name..</label>
                            </div>
                        </div>
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

export default SignUp;