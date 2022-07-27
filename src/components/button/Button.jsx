import React,{ useRef } from 'react'
import './_button.css'

const Button = ({title,inputFlag}) => {

  const fileRef = useRef();

  const handleChange = (e) => {
    const [file] = e.target.files;
    console.log(file);
  };

  const selectFile = () => {
    fileRef.current.click()
  }

  const takeScreenshot = () => {
    console.log('i took screenshot')
  }

  return (
    <div className='button'>
        <button onClick={inputFlag ? selectFile : takeScreenshot}>
            {title}
        </button>
        {
          inputFlag && (
            <input
              ref={fileRef}
              onChange={handleChange}
              multiple={false}
              type="file"
              hidden
            />
          )
        }
    </div>
  )
}

export default Button