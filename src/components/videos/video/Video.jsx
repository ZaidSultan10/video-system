import React from 'react'
import './_video.css'
import {useSelector} from 'react-redux'

const Video = ({image,id,videoName}) => {
    // id will be used in phase 2
  return (
    <div className='video'>
        <video src={videoName} poster={image} controls>

        </video>
    </div>
  )
}

export default Video