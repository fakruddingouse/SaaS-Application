import React from 'react'

const Button = ({ name }) => {
    return (
        <button className='text-0.5xl bg-blue-700 px-2 text-white rounded cursor-pointer'>
            {name}
        </button>
    )
}

export default Button
