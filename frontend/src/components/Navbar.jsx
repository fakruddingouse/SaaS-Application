import React from 'react'
import Button from './Button'

const Navbar = ({ user }) => {
  return (
    <div className='flex justify-between p-4 bg-slate-100'>
            <h1 className='text-3xl text-gray-900 m-3'>Home Page</h1>
            {!user && 
                <button 
                    className='border-2 bg-blue-400 cursor-pointer' 
                    onClick={() => navigate("/login")}
                >
                    Login / Signup
                </button>
            }
            {user && 
                <div className='flex gap-10 m-4'>
                    <Button name="Dashboard" />
                    <Button name="Services" />
                    <Button name="Blog" />
                    <Button name="Contact" />
                </div>
            }
        </div>
  )
}

export default Navbar
