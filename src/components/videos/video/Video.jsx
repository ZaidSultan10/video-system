import React from 'react'
import './_video.css'
import {useSelector} from 'react-redux'

const Video = ({image,id,videoName}) => {
    // console.log('video --> ',videoName)
    const {ref} = useSelector(state => state.videoReducer)
    console.log('ref -->',ref)
  return (
    <div className='video'>
        {/* <img ref={ref} onClick = {() => console.log('id -->',id)} src={image} alt='img' /> */}

        <video src={videoName} poster={image} controls>

        </video>
    </div>
  )
}

export default Video