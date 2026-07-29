import React from 'react'
import Button from './Button'
import capitalizeFirstLetter from '../utils/utils.js'
import { useAuth } from '../hooks/useAuth.js'

const Navbar = ({ user }) => {

    const { logout } = useAuth();

    const handleLogout = async (e) => {
        await logout();
    }

  return (
    <div className='flex justify-between p-2 bg-slate-100'>
        <div className='m-2'>
            <h1 className='text-3xl text-gray-900 pb-3'>Home Page</h1>
            <h1>Hello {capitalizeFirstLetter(user.username)}</h1>
        </div>
        {!user && 
            <button 
                className='border-2 bg-blue-400 cursor-pointer' 
                onClick={() => navigate("/login")}
            >
                Login / Signup
            </button>
        }
        {user && 
            <div className='flex gap-10 m-5'>
                <Button name="Dashboard" />
                <Button name="Services" />
                <Button name="Blog" />
                <Button name="Contact" />
                <Button name="Logout" onClick={handleLogout} />
            </div>
        }
    </div>
  )
}

export default Navbar
