import React, { useEffect, useMemo, useRef, useState } from 'react'
import { initNotifications, notify } from '@mycv/f8-notification'
import { Link, useNavigate } from 'react-router-dom'
import './style.scss'
import * as tf from '@tensorflow/tfjs'
import axios from 'axios'
import { Howl, Howler } from 'howler'
import {
    DollarCircleOutlined,
    SearchOutlined,
    ReadOutlined,
    HeartOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    ArrowLeftOutlined
} from "@ant-design/icons"
import { DatePicker, TimePicker, Spin, Select, Space, Input, Form, Button, Modal, notification } from 'antd'
import imgFrame from '../../Assets/img/cameraFrame.jpg'
import imgMonitor from '../../Assets/img/monitor.png'
import LogoAD from '../../Assets/img/logoUser.png'
import backgroundMonitor from '../../Assets/img/backgroundgif.webp'

import * as actionsAuth from '../../Store/Actions/auth'
import * as actionsHistory from '../../Store/Actions/history'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectIsAuthenticated, selectUser } from '../../Store/Selectors/auth'

import soundUrl from '../../Assets/mp3/CENSORBEEP.mp3'
const { Option } = Select
var sound = new Howl({
    src: [soundUrl]
})

// sound.play()

const Monitoring = ({ selectIsAuthenticated, selectUser, createActive }) => {
    const class_Name = { 0: 'Leaving', 1: 'Tired', 2: 'Turn around', 3: 'Using Phone', 4: 'Working' }
    const video = useRef()
    const [step1, setStep1] = useState(false)
    const [step2, setStep2] = useState(false)
    const [model, setModel] = useState()
    const navigate = useNavigate()
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
    useEffect(() => {
        if (!selectIsAuthenticated) {
            navigate('/')
        }
    }, [selectIsAuthenticated])
    const arrRemind = useRef([])
    const addItemRemind = (value) => {
        if (arrRemind.current.some((item) => item !== value)) {
            arrRemind.current = []
        }
        if (arrRemind.current.length % 5 == 0) {
            if (remind !== arrRemind.current[0]) {
                setRemind(arrRemind.current[0])
            }
        }
        arrRemind.current.push(value)
    }
    const [stateRemind, setStateRemind] = useState(false)
    useEffect(() => {
        console.log(remind)
        if (remind) {
            switch (remind) {
                case 'Tired':
                    showNotification('Bạn có vẻ đang mệt', LogoAD, 'Nhắc nhở')
                    break
                case 'Using Phone':
                    showNotification('Bạn đang dùng điện thoại hãy tập trung vào công việc', LogoAD, 'Nhắc nhở')
                    break
                case 'Turn around':
                    showNotification('Bạn đang không tập trung', LogoAD, 'Nhắc nhở')
                    break
                case 'Leaving':
                    sound.play()
                    showNotification('Bạn đã rời khỏi nơi làm việc', LogoAD, 'Nhắc nhở')
                    break
            }
        }
    }, [remind])
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
                        window.stream = stream
                        setMediaStream(stream)
                        video.current.srcObject = window.stream
                        video.current.onloadedmetadata = () => {
                            resolve()
                        }
                    },
                    error => reject(error)
                )
            } else {
                reject()
            }
        })
    }
    const adjust = (value) => {
        if (value[0].className === 'Using Phone' && value[0].probability <= 0.8) {
            return 'Working'
        } else {
            return value[0].className
        }
    }
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

        let newKq = adjust(kq)
        console.log(newKq)
        addItemRemind(newKq)
        addResult(newKq)
        setState(newKq)
        // requestAnimationFrame(() => {
        //     detectFrame(video, model)
        // })
        await sleep(1000)
        detectFrame(video, model)
        tf.engine().endScope()
    }
    const sleep = (ms = 0) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    const process_input = (video) => {
        var inputImage = tf.browser.fromPixels(video)
        let normalizationOffset = tf.scalar(255.0)
        let tensor = inputImage
            .resizeNearestNeighbor([224, 224])
            .toFloat()
            .div(normalizationOffset)
            .expandDims()
        return tensor
    }
    useEffect(() => {
        if (step1) {
            Promise.all([loadModel(), setUpCamera()])
                .then(values => {
                    console.log(values[0])
                    setModel(values[0])
                    setStep2(true)
                    handleStart()
                    setLoading(false)
                })
                .catch(error => {
                    console.error(error)
                })

        }
    }, [step1])
    const offWebcam = () => {
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
        setUnit1(true)
        setUnit4(false)
        setStep2(false)
        setStep1(false)
        loop.current = false
        console.log(result.current)
        info()
        // alert(`Focus on work:${Math.floor(percent(result.current).Working)}%`)
    }
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
    useEffect(async () => {
        if (time === timer) {
            sound.play()
            setLoading(true)
            const point = selectUser.point
            clearInterval(countRef.current)
            const rep = await createActive({
                result: result.current,
                precent: percent(result.current),
                time,
                userId: selectUser._id,
                role:'monitor'
            })
            if (rep.data.success) {
                setTimer(0)
                setIsPaused(false)
                offWebcam()
                setIsActive(false)
                setStep2(false)
                setStep1(false)
                setUnit1(true)
                setUnit4(false)
                loop.current = false
                arrRemind.current = []
                setLoading(false)
                info(rep.data.newPoint - point)
            }
            // alert(`Focus on work:${Math.floor(percent(result.current).Working)}%`)
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
        return newResult
    }
    useEffect(() => {
        // console.log('reset')
        result.current = {
            'Leaving': 0,
            'Tired': 0,
            'Turn around': 0,
            'Using Phone': 0,
            'Working': 0
        }
    }, [loop.current])
    useEffect(() => {
        if (isActive && model) {
            console.log(model)
            loop.current = true
            detectFrame(video.current, model)
        }
    }, [isActive])

    const [unit2, setUnit2] = useState(false)
    const [unit3, setUnit3] = useState(false)
    const [unit4, setUnit4] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleChange = (value) => {
        setTime(value)
        setUnit3(true)

    }
    const showNotification = (text, icon, head1) => {
        const permission = Notification.permission;
        if (permission == "default") {
            Notification.requestPermission()
        } else if (permission == "denied") {
            alert('We cannot display notifs. Please enables notifs.')
        } else if (permission == "granted") {
            const notification = new Notification(head1, {
                body: text,
                icon: icon
            })
        }
    }
    const [unit1, setUnit1] = useState(true)
    const info = (point) => {
        const focusWorking = Math.floor(percent(result.current).Working)
        Modal.info({
            title: 'Kết quả giám sát của bạn',
            content: (
                <div>
                    <p>Bạn tập đã trung vào công việc là:{focusWorking}%</p>
                    {
                        point && (
                            <p>Bạn được cộng {point} xu vào tài khoản</p>
                        )
                    }
                    {
                        focusWorking >= 80 ? (
                            <>
                                <p> Độ tập trung của bạn ở đang ở mức tốt bạn có gắng duy trì để hình thành thói 1 thói quên tốt cho bản thân. </p>
                                <p>Bạn nên tập trung làm việc trong 20 phút và dành 5 phút nghỉ để tránh hại mắt và gây mệt mỏi .</p>
                            </>
                        ) : (
                            focusWorking >= 60 && focusWorking < 80 ? (
                                <>
                                    <p> Bạn nên tập trung hơn vào công việc để có một năng xuất làm việc hiểu quả và chất lượng.</p>
                                    <p>Bạn nên tập trung làm việc trong 20 phút và dành 5 phút nghỉ để tránh hại mắt và gây mệt mỏi .</p>
                                </>
                            ) : (
                                <>
                                    <p> Có vẻ như bạn đang không thực sự tập trung rồi . Hãy tạm gác những việc khác sau khi hoàn thành công việc đã nhé.Hạn chế sử dụng điện thoại , rời mắt khỏi màn hình và có thể dành thời gian nghỉ ngắn nếu mệt mỏi , việc giữ tư thế ngồi thẳng cũng sẽ cải thiện năng suất làm việc và sức khỏe cột sống.Hơi khó khăn nhưng sớm thôi bạn sẽ hình thành thói quen và bất ngờ về năng suất công việc của mình , nó sẽ giúp bạn tiết kiệm được rất nhiều thời gian .</p>
                                    <p>Bạn nên tập trung làm việc trong 20 phút và dành 5 phút nghỉ để tránh hại mắt và gây mệt mỏi .</p>
                                </>
                            )
                        )
                    }
                </div>
            ),

            onOk() {

            },
        })
    }
    const confirm = () => {
        Modal.confirm({
            title: 'Thông báo',
            content: (
                <div>
                    <p>Nếu bạn dừng đột ngột sẽ không được cộng xu</p>
                </div>
            ),

            onOk() {
                handlePause()
            },
            onCancel() {
                return
            }
        })
    }
    return (
        <div className='monitorMain' style={{ backgroundImage: `url(${backgroundMonitor})` }}>

            <div className="monitorHandle">
                {
                    unit1 && (
                        <div className="monitorHandleTitle" onClick={() => (
                            setUnit1(false),
                            setUnit2(true)
                        )}>
                            bắt đầu giám sát
                        </div>
                    )
                }
                {
                    unit2 && (
                        <div className="monitorHandleTime">
                            <p className='monitorHandleTimeTitle'>Chọn thời gian muốn giám sát</p>
                            <Select
                                placeholder='Chọn thời gian'
                                size='large'
                                style={{
                                    width: 150,
                                    color: '#222222'
                                }}
                                onChange={handleChange}
                            >
                                <Option value={60}>1 phút</Option>
                                <Option value={300}>5 phút</Option>
                                <Option value={600}>10 phút</Option>
                                <Option value={900}>15 phút</Option>
                                <Option value={1200}>20 phút</Option>
                                <Option value={1500}>25 phút</Option>
                                <Option value={1800}>30 phút</Option>
                            </Select>
                            {
                                unit3 && (
                                    <div className="monitorHandleAction">
                                        <p onClick={() => (
                                            setUnit3(false),
                                            setUnit2(false),
                                            setUnit4(true),
                                            setStep1(!step1),
                                            setLoading(true)
                                        )}>Bắt đầu</p>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
                {
                    unit4 && (
                        <>
                            <div className="monitorVideoFrame" style={{ backgroundImage: `url(${imgFrame})` }}>
                                <video
                                    ref={video}
                                    className='monitorVideo'
                                    autoPlay
                                    style={{ backgroundImage: `url(${imgMonitor})`, borderRadius: '20px' }}
                                >
                                </video>
                            </div>
                            <div className='monitorHandleBtn'>
                                <p>{formatTime(timer)}</p>
                                <div className="monitorHandleAction">
                                    <p onClick={confirm}>Dừng</p>
                                </div>
                            </div>
                        </>
                    )
                }

            </div>
            {
                !unit4 && (
                    <div className="returnHome" onClick={() => navigate('/')}>
                        <ArrowLeftOutlined /><span>Quay lại trang chủ</span>
                    </div>
                )
            }
            {
                loading && (
                    <div className="loadingSpin">
                        <Spin size='large' />
                    </div>
                )
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    selectIsAuthenticated,
    selectUser,
})
const mapDispatchToProps = (dispatch) => ({
    checkLoginRequest: () => dispatch(actionsAuth.checkLoginRequest()),
    createActive: (payload) => actionsHistory.createActive(dispatch)(payload)
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Monitoring)