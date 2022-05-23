import React, { useEffect, useMemo, useRef, useState } from 'react'
import './style.scss'
import * as tf from '@tensorflow/tfjs'
import axios from 'axios'
import { Howl, Howler } from 'howler'
// import Webcam from 'react-webcam'
// import { loadGraphModel } from '@tensorflow/tfjs-converter'
// // tf.setBackend('webgl')
import {
    DollarCircleOutlined,
    SearchOutlined,
    ReadOutlined,
    HeartOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined
} from "@ant-design/icons"
import { DatePicker, TimePicker, Select, Space, Input, Form, Button } from 'antd'
import { notification } from 'antd'
import imgFrame from '../../Assets/img/cameraFrame.jpg'
import imgMonitor from '../../Assets/img/monitor.png'
import LogoAD from '../../Assets/img/logoUser.png'

import * as actionsAuth from '../../Store/Actions/auth'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectIsAuthenticated, selectUser } from '../../Store/Selectors/auth'

import soundUrl from '../../Assets/mp3/CENSORBEEP.mp3'
var sound = new Howl({
    src: [soundUrl]
})

// sound.play()

const Monitoring = ({ selectIsAuthenticated, selectUser }) => {
    const class_Name = { 0: 'Leaving', 1: 'Tired', 2: 'Turn around', 3: 'Using Phone', 4: 'Working' }
    const video = useRef()
    const [step1, setStep1] = useState(false)
    const [step2, setStep2] = useState(false)
    const [model, setModel] = useState()
    const [time, setTime] = useState()
    const [state, setState] = useState()
    const [mediaStream, setMediaStream] = useState()
    const loop = useRef(false)
    const [timer, setTimer] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [remind, setRemind] = useState('')
    const countRef = useRef(null)
    const result = useRef({
        'Leaving': 0,
        'Tired': 0,
        'Turn around': 0,
        'Using Phone': 0,
        'Working': 0
    })
    // console.log(result.current)
    const arrRemind = useRef([])
    const addItemRemind = (value) => {
        // console.log(arrRemind.current.some((item)=>item!==value))
        if (arrRemind.current.some((item) => item !== value)) {
            arrRemind.current = []
        }
        if (arrRemind.current.length >= 10) {
            // console.log(arrRemind.current[0])
            if (remind !== arrRemind.current[0]) {
                setRemind(arrRemind.current[0])
            }
        }
        arrRemind.current.push(value)
        // console.log(arrRemind.current)
    }
    useEffect(() => {
        // if (remind) {
        //     switch(remind)
        //     case 'Tired':

        // }
        if (remind && remind !== 'Working') {
            sound.play()
            notification.open({
                message: remind,
                icon: <CloseCircleOutlined style={{ color: "red" }} />,
            })
        }
    }, [remind])
    const loadModel = async () => {
        const model = await tf.loadLayersModel('https://raw.githubusercontent.com/nghia982000/tfjs-model/main/model.json')
        return model
    }
    // const init = async () => {
    //     console.log('init...')
    //     await setUpCamera()
    //     console.log('set up camrea success')
    // }
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
    useEffect(() => {
        console.log("Component Did Mount")

        return function cleanup() {
            // handlePause()
            // offWebcam()
            // loop.current = false
            // alert("Component Will Unmount")
            console.log("Component Will Unmount")
            if (mediaStream) {
                mediaStream.getTracks().forEach((track) => {
                    track.stop()
                })
            }
        }
    }, [])
    // const onFinish = (values) => {
    //     addItemRemind(values.test)
    // }
    const addResult = (value) => {
        result.current[value] = result.current[value] + 1
        console.log(result.current)
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
        addItemRemind(kq[0].className)
        addResult(kq[0].className)
        setState(kq[0].className)
        requestAnimationFrame(() => {
            detectFrame(video, model)
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
        // console.log(model)
        if (step1) {
            Promise.all([loadModel(), setUpCamera()])
                .then(values => {
                    console.log(values[0])
                    setModel(values[0])
                    setStep2(true)
                    // detectFrame(video.current, values[0])
                })
                .catch(error => {
                    console.error(error)
                })
        }
    }, [step1])
    const offWebcam = () => {
        // console.log(mediaStream)
        mediaStream.getTracks().forEach((track) => {
            track.stop()
        })
    }

    const handleStart = () => {
        setIsActive(true)
        setIsPaused(true)
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000)
    }

    const handlePause = () => {
        clearInterval(countRef.current)
        setTimer(0)
        setIsPaused(false)
        offWebcam()
        setIsActive(false)
        setStep2(false)
        setStep1(false)
        loop.current = false
        console.log(result.current)
        alert(`Focus on work:${Math.floor(percent(result.current).Working)}%`)
    }

    // const handleResume = () => {
    //     setIsPaused(true)
    //     countRef.current = setInterval(() => {
    //         setTimer((timer) => timer + 1)
    //     }, 1000)
    // }

    const handleReset = () => {
        clearInterval(countRef.current)
        setIsActive(false)
        setIsPaused(false)
        setTimer(0)
    }
    const formatTime = () => {
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes = `${Math.floor(timer / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

        return `${getHours} : ${getMinutes} : ${getSeconds}`
    }
    useEffect(() => {
        if (time === timer) {
            clearInterval(countRef.current)
            setTimer(0)
            setIsPaused(false)
            offWebcam()
            setIsActive(false)
            setStep2(false)
            setStep1(false)
            loop.current = false
            arrRemind.current = []
            console.log(result.current)
            alert(`Focus on work:${Math.floor(percent(result.current).Working)}%`)
        }
        return () => {
        }
    }, [timer])
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
        axios.post(`https://server-mern-stack-ai.herokuapp.com/monitor/createActive`, {
            result,
            precent: newResult,
            time
        })
            .then(res => {
                console.log(res.data.Active)
            })
        // axios.post(` http://localhost:5000/monitor/createActive`, {
        //     result,
        //     precent: newResult,
        //     time
        // })
        //     .then(res => {
        //         console.log(res.data.Active)
        //     })
        return newResult
    }
    useEffect(() => {
        console.log('reset')
        result.current = {
            'Leaving': 0,
            'Tired': 0,
            'Turn around': 0,
            'Using Phone': 0,
            'Working': 0
        }
        // return () => {
        // }
    }, [loop.current])
    useEffect(() => {
        if (isActive && model) {
            console.log(model)
            loop.current = true
            detectFrame(video.current, model)
        }
        return () => {
            loop.current = false
        }
    }, [isActive])

    return (
        <div className='monitorMain'>

            <div className="monitorVideoFrame" style={{ backgroundImage: `url(${imgFrame})` }}>
                <video
                    ref={video}
                    className='monitorVideo'
                    autoPlay
                    style={{ backgroundImage: `url(${imgMonitor})`, borderRadius: '20px' }}
                >
                </video>
                <p className='state'>{state}</p>
            </div>
            <div className="monitorHandle">
                {
                    !step1 && (
                        <div className="monitorHandleTitle">
                            Monitor your work performance
                        </div>
                    )
                }
                {
                    selectIsAuthenticated && (
                        <div className="monitorHandleUser">
                            <div className="monitorProfile">
                                <div className="monitorProfileLogo">
                                    <img src={LogoAD} alt="" />
                                </div>
                                <div className="monitorProfileName">
                                    <p>{selectUser.username}</p>
                                    {/* <p>999đ</p> */}
                                </div>
                            </div>
                            <div className="monitorPoint">
                                {selectUser.poin} Coin
                            </div>
                        </div>
                    )
                }
                {
                    !step1 && (
                        <div className="monitorHandleAction">
                            <p onClick={() => setStep1(!step1)}>Start monitoring</p>
                            {/* <Form
                                onFinish={onFinish}
                                >
                                <Form.Item name="test">
                                    <Input />
                                </Form.Item>
                                <Button htmlType="submit">Test</Button>
                            </Form> */}
                        </div>
                    )
                }
                {
                    step2 && (
                        <div className="watch">
                            <div className='stopwatch-card'>
                                <p>Choose monitoring time</p>
                                <TimePicker className='selectTime' onChange={value => setTime(value._d.getHours() * 60 * 60 + value._d.getMinutes() * 60 + value._d.getSeconds())} />
                                {
                                    time && (
                                        <>
                                            <p>{formatTime(timer)}</p>
                                            <div className='buttons'>
                                                {
                                                    !isActive && !isPaused ?
                                                        <button onClick={handleStart}>Start</button>
                                                        : (
                                                            isPaused ? <button onClick={handlePause}>Pause</button> :
                                                                <button onClick={handleReset} disabled={!isActive}>Reset</button>
                                                        )
                                                }
                                                {/* <button onClick={handleReset} disabled={!isActive}>Reset</button> */}
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    selectIsAuthenticated,
    selectUser,
})
const mapDispatchToProps = (dispatch) => ({
    checkLoginRequest: () => dispatch(actionsAuth.checkLoginRequest()),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Monitoring)