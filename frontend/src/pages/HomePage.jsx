import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Button from '../components/Button';
import Navbar from '../components/Navbar';

const HomePage = ({ user, setUser }) => {
    const navigate = useNavigate();
    return (
        <Navbar user={user} />
    )
}

export default HomePage
