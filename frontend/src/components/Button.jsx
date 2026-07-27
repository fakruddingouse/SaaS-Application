import React from 'react'

const Button = ({ name }) => {
    return (
        <button className='text-1xl bg-blue-700 text-white px-3 py-2 rounded cursor-pointer'>
            {name}
        </button>
    )
}

export default Button
