import React, { useEffect, useRef, useState } from 'react'
import './style.scss'
import * as tf from '@tensorflow/tfjs'
import Webcam from 'react-webcam'
import {loadGraphModel} from '@tensorflow/tfjs-converter'

const Monitoring = () => {
    const video = useRef()
    // const webRef = useRef()
    // const [image, setImage] = useState([])
    // const captureImage = () => {
    //     const img = webRef.current.getScreenshot()
    //     setImage([...image, img])
    // }
    const loadModel= async ()=>{
        const model = await tf.loadLayersModel('http://localhost:5000/video/model')
        console.log(model)
        return model
    }
    const init=async()=>{
        console.log('init...')
        await setUpCamera()
        console.log('set up camrea success')
    }
    const setUpCamera=()=>{
        return new Promise((resolve,reject)=>{
            navigator.getUserMedia=navigator.getUserMedia||
                navigator.webkitGetUserMedia||
                navigator.MozGetUserMedia||
                navigator.msGetUserMedia
            if( navigator.getUserMedia){
                navigator.getUserMedia(
                    {video:true},
                    stream=>{
                        video.current.srcObject=stream
                        video.current.addEventListener('loadeddata',resolve)
                    },
                    error=>reject(error)
                )
            }else{
                reject()
            }
        })
    }
    useEffect(()=>{
        // init()
        Promise.all([ loadModel()])
        .then(values => {
          console.log(values[0])
        })
        .catch(error => {
          console.error(error);
        });

        return ()=>{

        }
    },[])
    return (
        <div className='monitorMain'>
            <video 
            ref={video}
            className='monitorVideo' 
            autoPlay 
            style={{borderRadius:'20px'}}/>
            {/* <div className="webcam">
                <Webcam ref={webRef} style={{borderRadius:'20px'}} />
            </div>
            <div className="monitorControl">
                <button className='btn' onClick={() => captureImage()}>Chụp</button>
            </div>
            <div className="listImage">
                {
                    image.map((item, index) => {
                        return (
                            <div className="item">
                                <img src={item} alt="" key={index} />
                            </div>
                        )
                    })
                }

            </div> */}
        </div>
    )
}

export default Monitoring