import React from 'react'
import { useAuth } from '../hooks/useAuth'

const Button = ({ name, onClick }) => {
    return (
        <button 
        onClick={onClick}
            className='text-0.5xl bg-blue-700 px-2 text-white rounded cursor-pointer' 
        >
            {name}
        </button>
    )
}

export default Button
