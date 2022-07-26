import React from 'react'
import Button from '../../components/button/Button'
import Videos from '../../components/videos/Videos'
import './_mainPage.css'

const MainPage = () => {
  return (
    <div className='mainPage'>
        <div className='mainPage__top'>
            <Button title={`Select`} />
            <Button title={`Capture`} />
        </div>
        <div className='mainPage__bottom'>
            <Videos />
        </div>
    </div>
  )
}

export default MainPage