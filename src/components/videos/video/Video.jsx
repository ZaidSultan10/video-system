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

        <video style={{border:'1px solid white'}} src={videoName} poster={image} width="320" height="240" controls>

        </video>
    </div>
  )
}

export default Video