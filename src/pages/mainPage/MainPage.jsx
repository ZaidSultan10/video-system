import React from 'react'
import Button from '../../components/button/Button'
import VideoPlayer from '../../components/videoPlayer/VideoPlayer'
import Videos from '../../components/videos/Videos'
import './_mainPage.css'

const MainPage = () => {
  return (
    <div className='mainPage'>
        <div className='mainPage__top'>
            <Button title={`Select`} inputFlag={true} />
            <Button title={`Capture`} />
        </div>
        <div className='mainPage__center'>
            <VideoPlayer />
        </div>
        <div className='mainPage__bottom'>
            <Videos />
        </div>
    </div>
  )
}

export default MainPage