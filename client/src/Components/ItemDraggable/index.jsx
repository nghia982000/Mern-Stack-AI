import React, { useRef, useState, useEffect } from 'react'
import Draggable from 'react-draggable'
import './style.scss'
import * as tf from '@tensorflow/tfjs'
import axios from 'axios'
import { Modal } from 'antd'

const ItemDraggable = ({ onclose,endVideo,handleEndvideo }) => {
    const class_Name = { 0: 'Leaving', 1: 'Tired', 2: 'Turn around', 3: 'Using Phone', 4: 'Working' }
    const video = useRef()
    const result = useRef({
        'Leaving': 0,
        'Tired': 0,
        'Turn around': 0,
        'Using Phone': 0,
        'Working': 0
    })
    const [zoom, setZoom] = useState('draggable')
    const [mediaStream, setMediaStream] = useState()
    const [step1, setStep1] = useState(false)
    const [step2, setStep2] = useState(false)
    const [model, setModel] = useState()
    const loop = useRef(false)
    const loadModel = async () => {
        const model = await tf.loadLayersModel('https://raw.githubusercontent.com/nghia982000/tfjs-model/main/model.json')
        return model
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
                        setMediaStream(stream)
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
        if (!loop.current) {
            return
        }
        tf.engine().startScope()
        var result = await model.predict(process_input(video)).data()
        let kq = Array.from(result)
            .map(function (p, i) {
                return {
                    probability: p,
                    className: class_Name[i]
                }
            }).sort(function (a, b) {
                return b.probability - a.probability
            })

        console.log(kq[0].className)
        addResult(kq[0].className)
        requestAnimationFrame(() => {
            detectFrame(video, model)
        })
        // await sleep(1000)
        // detectFrame(video, model)
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
    useEffect(()=>{
        if(endVideo){
            handlePause()
            handleEndvideo(true)
        }
    },[endVideo])
    useEffect(() => {
        if (step1) {
            Promise.all([loadModel(), setUpCamera()])
                .then(values => {
                    console.log(values[0])
                    setModel(values[0])
                    setStep2(true)
                })
                .catch(error => {
                    console.error(error)
                })
        }
    }, [step1])
    useEffect(() => {
        if (step2 && model) {
            console.log(model)
            loop.current = true
            detectFrame(video.current, model)
        }
    }, [step2])
    const offWebcam = () => {
        mediaStream.getTracks().forEach((track) => {
            track.stop()
        })
    }
    const handlePause = () => {
        offWebcam()
        setStep2(false)
        setStep1(false)
        loop.current = false
        info()
        // alert(`Focus on work:${Math.floor(percent(result.current).Working)}%`)
    }
    const sleep = (ms = 0) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    const percent = (result) => {
        const arrResult = Object.values(result)
        const total = arrResult.reduce((total, item) => {
            return total + item
        }, 0)
        let newResult = {
            'Leaving': 0,
            'Tired': 0,
            'Turn around': 0,
            'Using Phone': 0,
            'Working': 0
        }
        for (var key in result) {
            newResult[key] = (result[key] / total) * 100
        }
        axios.post(`https://server-mern-stack-ai.herokuapp.com/history/createActive`, {
            result,
            precent: newResult
        })
            .then(res => {
                console.log(res.data.Active)
            })
        return newResult
    }
    const addResult = (value) => {
        result.current[value] = result.current[value] + 1
        console.log(result.current)
    }
    const info = () => {
        Modal.info({
            title: 'Kết quả giám sát của bạn',
            content: (
                <div>
                    <p>Bạn tập đã trung vào công việc là:{Math.floor(percent(result.current).Working)}%</p>
                </div>
            ),

            onOk() {

            },
        })
    }
    return (
        <>
            <Draggable>
                <div className={zoom}>
                    <div className="draggableWebcam">
                        <video autoPlay ref={video} className='draggableVideo'></video>
                    </div>
                    <div className="draggableAction">
                        {
                            !step1 && (
                                <>
                                    <button onClick={() => setStep1(true)}>Bắt đầu</button>
                                    <button onClick={() => (
                                        handleEndvideo(false),
                                        onclose(false)
                                    )}>Đóng</button>
                                </>
                            )
                        }
                        {
                            step2 && (
                                <button onClick={handlePause}>Dừng</button>
                            )
                        }
                        {
                            (zoom === 'draggable') ? (
                                <button onClick={() => setZoom('zoomOut')}>Thu nhỏ</button>
                            ) : (
                                <button onClick={() => setZoom('draggable')}>Phóng to</button>
                            )
                        }
                    </div>
                </div>
            </Draggable>
        </>
    )
}

export default ItemDraggable