import React from 'react'
import './_button.css'

const Button = ({title,handleSubmit}) => {
  return (
    <div className='button'>
        <button>
            {title}
        </button>
    </div>
  )
}

export default Button