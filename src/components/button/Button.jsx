import React,{ useRef, useState,createRef, useEffect } from 'react'
import './_button.css'
import db from '../../firebase/firebase'
import moment from 'moment'
import Modal from 'react-modal';
import {storage} from '../../firebase/firebase.js'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import captureVideoFrame from 'capture-video-frame';
import ReactPlayer from 'react-player'

const Button = ({title,inputFlag}) => {

  const fileRef = useRef();
  const refs = useRef()
  const [getVideoUrl, setGetVideoUrl] = useState('')
  const [fileError,setFileError] = useState(false)
  const [getVideo,setGetVideo] = useState('')
  const [loading,setLoading] = useState(false)
  const [getImages,setGetImages] = useState('')
  const [getImageUrl,setGetImageUrl] = useState('')
  const [fileName,setFileName] = useState('')
  
  const getImage = async () => {
    if(getVideo){
      let capImage = captureVideoFrame(refs.current.getInternalPlayer())
      setGetImages(capImage)
      const storageRefs = storageRef(storage, `/media/${fileName.name}`);
      const imageStorageRef = storageRef(storage, `/image/${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRefs, fileName);
      const uploadImageTask = uploadBytesResumable(imageStorageRef, capImage?.blob);
      setLoading(true)
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log('snapshot -->',snapshot)
        },
        (err) => console.log(err),
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                setGetVideoUrl(url)
                setLoading(false)
            });
        }
      );
      uploadImageTask.on(
        "state_changed",
        (snapshot) => {
          console.log('snapshot -->',snapshot)
        },
        (err) => console.log(err),
        () => {
            // download url
            getDownloadURL(uploadImageTask.snapshot.ref).then((url) => {
                setGetImageUrl(url)
            });
        }
      );
    }else if(getVideo === ''){
      setFileError('please upload video')
      setTimeout(() => {
        setFileError('')
      },3000)
    }
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
      height:'700px'
    },
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setGetVideoUrl('')
    setGetVideo('')
    setFileName('')
    setGetImageUrl('')
    setGetImages('')
    setLoading(false)
  }

  const handleChange = (e) => {
    const [file] = e.target.files;
    console.log(file);
    if(file?.type !== 'video/mp4' && file?.type !== 'video/ogg'){
      setFileError(`File Not Supported`)
      setTimeout(() => {
        setFileError('')
      },3000)
    }else{
      setGetVideo(URL.createObjectURL(file))
      setFileName(file)
    }
  };

  const submitVideoAndThumbnail = () => {
    if(getVideo !== '' && getImages!== '' && getVideoUrl !=='' && getImageUrl!==''){
      db.collection('video').add({
      videoName:getVideoUrl,
      thumbnail:getImageUrl,
      timeStamp : moment().format('YYYY-MMM-DD hh:mm:ss')
    })
    setGetVideoUrl('')
    setGetVideo('')
    setFileName('')
    setGetImageUrl('')
    setGetImages('')
   }else if(getVideo === '' || getImages === ''){
    setFileError(`To Submit Make Sure You Select Video and Thumbnail`)
      setTimeout(() => {
        setFileError('')
      },3000)
   }
  }

  const selectFile = () => {
    fileRef.current.click()
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div style={{display:'flex',justifyContent:'center',border:'1px solid white',padding:'20px'}}>
          <button style={{color:'white',cursor:'pointer',border:'1px solid white',width:'100px',height:'40px',borderRadius:'12px'}} onClick={selectFile}>
                {title}
          </button>
        </div>
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
            getVideo &&
              (<div style={{display:'flex',justifyContent:'center',border:'1px solid white',padding:'20px'}}>
                <ReactPlayer width={300} height={180} playing={true} loop={true} url={getVideo} ref={refs} controls={true} />
              </div>)  
          }
          <div style={{display:'flex',justifyContent:'center',border:'1px solid white',padding:'20px'}}>
            <button disabled={getVideo === '' ? true : false} style={{color:'white',cursor:'pointer',border:'1px solid white',width:'150px',height:'40px',borderRadius:'12px',backgroundColor:`${getVideo === '' ? 'red' : 'black'}`}} onClick={getImage}>
              {`Capture Screenshot`}
            </button>
          </div>
          {
            getVideo && getImages && (
              <div style={{display:'flex',justifyContent:'center',border:'1px solid white',padding:'20px'}}>
                <img style={{borderRadius:'12px',border:'1px solid white'}} width={300} height={180} src={getImages.dataUri} alt={'Screenshot'} crossOrigin="anonymous" />
              </div>
            )
          }
          {
            loading ? (
              <div style={{display:'flex',justifyContent:'center',border:'1px solid white',padding:'20px'}}>
                <span style={{color:'white'}}>
                  {`Video and Thumbnail Uploading Please wait...`}
                </span>
              </div>
            ) : (
              <div style={{display:'flex',justifyContent:'center',border:'1px solid white',padding:'20px'}}>
                <button disabled={getVideo === '' || getImages === '' ? true : false} style={{color:'white',cursor:'pointer',border:'1px solid white',width:'150px',height:'40px',borderRadius:'12px',backgroundColor:`${getVideo === '' || getImages === '' ? 'red' : 'black'}`}} onClick={() =>{
                  submitVideoAndThumbnail();
                  if(getVideo !== '' && getImages !== ''){
                    closeModal()
                  }
                  }}>
                  {`Submit Video And Thumbnail`}
                </button>
              </div>
            )
          }
          {
            fileError && fileError !== '' && (
              <div style={{display:'flex',justifyContent:'center',border:'1px solid white',padding:'20px'}}>
                  <span style={{color:'white'}}>{fileError}</span>
              </div>
            )
          }
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