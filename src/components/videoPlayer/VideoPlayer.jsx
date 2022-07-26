import React from 'react'
import './_videoPlayer.css'
import YouTube from 'react-youtube';

const VideoPlayer = () => {

    const opts={
        height: '390',
        width: '600px',
        playerVars:{
            autoplay:1,
        },
    };

  return (
    <div style={{color:'white',display:'flex',justifyContent:'center'}}>
        <YouTube videoId={'OyfNUysk1oTAsBQC'} opts={opts} />
    </div>
  )
}

export default VideoPlayer