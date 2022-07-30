import React, { useEffect, useState } from 'react'
import './_videos.css'
// import Lion from '../../assets/lion.jpg'
import db from '../../firebase/firebase.js'
import Video from './video/Video'

const Videos = () => {

  const [getVideo, setGetVideo] = useState('')

 useEffect(() => {
  db.collection('video').onSnapshot(snapshot => {
    setGetVideo(snapshot.docs.map(doc => ({id: doc.id , video : doc.data()})))
  })
 }, [])
  return (
    <div className='videos__main'>
      <h1 style={{color:'white'}}>
        {`All Videos`}
      </h1>
      <div className='videos'>
        {
          getVideo && getVideo.map((item) => (
            <Video videoName={item.video.videoName} image={item.video.thumbnail} id={item.id} />
          ))
        }
      </div>
    </div>
  )
}

export default Videos