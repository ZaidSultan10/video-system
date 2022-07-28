import React,{ useRef, useState,createRef, useEffect } from 'react'
import './_button.css'
import db from '../../firebase/firebase'
// import firebase from 'firebase';
import moment from 'moment'
// import Boy from '../../assets/boy.jpg'
import { useScreenshot } from 'use-react-screenshot'
import { useDispatch } from 'react-redux'
import { setVideoRef } from '../../actions/videoAction'
// import { getStorage, ref } from "firebase/storage";
import Modal from 'react-modal';
import Geo from '../../assets/_Geometric80s12_preview.mp4'
import {storage} from '../../firebase/firebase.js'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Button = ({title,inputFlag}) => {

  const fileRef = useRef();

  const refs = createRef(null)
  const dispatch = useDispatch()
  // const ref = createRef(null)
  // const storage = getStorage();
  const [image, takeScreenshot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0
  })
  const [getVideoUrl, setGetVideoUrl] = useState('')
  const [fileError,setFileError] = useState(false)
  const [getVideo,setGetVideo] = useState('')
  
  const getImage = () => {
    if(getVideoUrl){
      takeScreenshot(refs.current)
    }
    dispatch(setVideoRef(refs))
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width:'80%',
      height:'400px'
    },
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleChange = (e) => {
    const [file] = e.target.files;
    console.log(file);
    if(file?.type !== 'video/mp4' && file?.type !== 'video/ogg'){
      console.log('i am in if')
      setFileError(`File Not Supported`)
      setTimeout(() => {
        setFileError('')
      },3000)
    }else{
      setGetVideo(file)
      const storageRefs = storageRef(storage, `/media/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRefs, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log('snapshot -->',snapshot)
        },
        (err) => console.log(err),
        () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                console.log('url -->',url);
                setGetVideoUrl(url)
            });
        }
      );
    }
  };

  const submitVideoAndThumbnail = () => {
    if(getVideo !== ''){
      db.collection('video').add({
      videoName:getVideoUrl,
      size:getVideo.size,
      thumbnail:image ? image : '',
      type:getVideo.type,
      timeStamp : moment().format('YYYY-MMM-DD hh:mm:ss')
    })
   }else if(getVideo === '' && image === null){
    setFileError(`Please Select Video`)
      setTimeout(() => {
        setFileError('')
      },3000)
   }
  }

  const selectFile = () => {
    fileRef.current.click()
  }

  console.log('image -->',image)

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button style={{color:'white'}} onClick={selectFile}>
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
          {
            fileError && fileError !== '' && (
              <span style={{color:'white'}}>{fileError}</span>
            )
          }
          {getVideoUrl && (
          <div style={{backgroundColor:'white'}}>
            <video src= { getVideoUrl } type="video/mp4" width={300} height={180} ref={refs} autoPlay loop controls>
              {/* <source src= { getVideoUrl } type="video/mp4" /> */}
            </video>
          </div>)
          }
          {/* <video src= { Geo } type="video/mp4" width={300} height={300} ref={refs} autoPlay loop controls>

          </video> */}
          <div>
            <button style={{color:'white'}} onClick={getImage}>
              {`Capture Screenshot`}
            </button>
          </div>

          {
            getVideoUrl && image && (
              <img crossOrigin="anonymous" width={300} height={300} src={image} alt={'Screenshot'} />
            )
          }
          <div>
            <button style={{color:'white'}} onClick={() =>{submitVideoAndThumbnail();closeModal()}}>
              {`Submit Video And Thumbnail`}
            </button>
          </div>
      </Modal>
      <div className='button'>
          <button onClick={inputFlag ? openModal : getImage}>
              {title}
          </button>
      </div>
    </>
  )
}

export default Button