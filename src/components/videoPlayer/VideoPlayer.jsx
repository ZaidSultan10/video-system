import React from 'react'
import './_videoPlayer.css'

const VideoPlayer = () => {
  // not yet implemented.. will implement in phase 2
  return (
    <div style={{display:'flex',justifyContent:'center',marginTop:'20px'}}>
        <video width={600} height={400}>
          <source src="movie.mp4" type="video/mp4"/>
        </video>
    </div>
  )
}

export default VideoPlayer