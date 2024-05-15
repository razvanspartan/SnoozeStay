import React from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectButton = ({ to, children, className }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
        <button onClick={handleClick} className={className}>
            {children}
        </button>
    );
};

export default RedirectButton;