import React, { useEffect, useRef, useState } from 'react'
import './style.scss'
import * as tf from '@tensorflow/tfjs'
import Webcam from 'react-webcam'
import { loadGraphModel } from '@tensorflow/tfjs-converter'
// tf.setBackend('webgl')

const Monitoring = () => {
    const class_Name = { 0: 'Leaving', 1: 'Tired', 2: 'Turn around', 3: 'Using Phone', 4: 'Working' }
    const video = useRef()
    // const webRef = useRef()
    // const [image, setImage] = useState([])
    // const captureImage = () => {
    //     const img = webRef.current.getScreenshot()
    //     setImage([...image, img])
    // }
    const loadModel = async () => {
        const model = await tf.loadLayersModel('https://raw.githubusercontent.com/nghia982000/tfjs-model/main/model.json')
        // console.log(model.summary())
        // console.log(model)
        return model
    }
    const init = async () => {
        console.log('init...')
        await setUpCamera()
        console.log('set up camrea success')
    }
    const setUpCamera = () => {
        return new Promise((resolve, reject) => {
            navigator.getUserMedia = navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.MozGetUserMedia ||
                navigator.msGetUserMedia
            if (navigator.getUserMedia) {
                navigator.getUserMedia(
                    { video: true },
                    stream => {
                        video.current.srcObject = stream
                        video.current.addEventListener('loadeddata', resolve)
                    },
                    error => reject(error)
                )
            } else {
                reject()
            }
        })
    }
    const detectFrame = async (video, model) => {
        tf.engine().startScope()
        var result = await model.predict(process_input(video)).data()
        let kq = Array.from(result)
            .map(function (p, i) {
                return {
                    probability: p,
                    className: class_Name[i]
                }
            }).sort(function (a, b) {
                return b.probability - a.probability;
            })
        console.log(kq[0].className)
        requestAnimationFrame(() => {
            detectFrame(video, model);
          })
        tf.engine().endScope()
    }
    const process_input = (video) => {
        var inputImage = tf.browser.fromPixels(video)
        let normalizationOffset = tf.scalar(255.0)
        let tensor = inputImage
            .resizeNearestNeighbor([224, 224])
            .toFloat()
            .div(normalizationOffset)
            .expandDims()
        // console.log(tensor)
        return tensor
    }
    useEffect(() => {
        // init()
        Promise.all([loadModel(), setUpCamera()])
            .then(values => {
                console.log(values[0])
                detectFrame(video.current, values[0])
            })
            .catch(error => {
                console.error(error);
            });

        return () => {

        }
    }, [])
    return (
        <div className='monitorMain'>
            <video
                ref={video}
                className='monitorVideo'
                autoPlay
                style={{ borderRadius: '20px' }} />
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