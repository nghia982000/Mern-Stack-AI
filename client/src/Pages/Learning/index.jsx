import React, { useEffect, useLayoutEffect, useMemo, useState, useRef } from 'react'

import './style.scss'
import {
  Collapse,
  Form,
  Modal,
  Button,
  Radio,
  Space,
  Drawer
} from 'antd'
import { PlayCircleOutlined, FileTextOutlined, FileDoneOutlined, BarsOutlined } from '@ant-design/icons'
import imgCourse from '../../Assets/img/desk.png'
import { useParams } from 'react-router-dom'
import ItemComment from '../../Components/ItemComment'
import ItemDraggable from '../../Components/ItemDraggable'

import * as actions from '../../Store/Actions/course'
import * as actionsVideo from '../../Store/Actions/video'
import * as actionsComment from '../../Store/Actions/comment'
import * as actionsQuestion from '../../Store/Actions/quizzes'
import * as actionsHistory from '../../Store/Actions/history'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectDetailCourse } from '../../Store/Selectors/course'
import { selectVideos } from '../../Store/Selectors/video'
import { selectListComment } from '../../Store/Selectors/comment'
import { selectGetListQuestions } from '../../Store/Selectors/quizzes'
import { selectListTestResult } from '../../Store/Selectors/history'

const { Panel } = Collapse

const Learning = ({
  selectDetailCourse,
  detailCourse,
  getVideo,
  selectVideos,
  createComment,
  getComment,
  selectListComment,
  selectGetListQuestions,
  getListQuestion,
  testResult,
  selectListTestResult,
  getListTestResult
}) => {
  const [video, setVideo] = useState({
    id: '',
    url: '',
    title: ''
  })
  const [role, setRole] = useState()
  const [exercise, setExercise] = useState({
    content: '',
    title: '',
    id: ''
  })
  const [question, setQuestion] = useState({
    data: [],
    title: '',
    id: ''
  })
  const [stateQuizzes, setStateQuizzes] = useState(false)
  const [videoId, setVideoId] = useState()
  const { id } = useParams()
  useLayoutEffect(() => {
    detailCourse(id)
    getVideo(id)
  }, [id])
  const formatTime = (timer) => {
    const getSeconds = `0${Math.floor(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }
  // const endVideo = () => {
  //   console.log('end video')
  //   SetVideoEnd(true)

  // }
  // const loadStart = () => {
  //   console.log('start video')
  //   showModal()
  // }
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }
  // const handleOk = () => {
  //   setIsModalVisible(false)
  //   setOnclose(true)
  // }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  // const testNoti=()=>{
  //   alert('test')
  // }
  const onFinish = async (values) => {
    const data = Object.values(values)
    const response = await testResult({
      id: question.id,
      data: {
        listAnswer: data,
        role: 'quizzes'
      }
    })
    if (response) {
      console.log(response.data.result)
      success(response.data.result)
    }
    getListTestResult(question.id)
    setStateQuizzes(false)
  }
  const success = (result) => {
    const numberTrue = result.filter((item) => item.check)
    Modal.success({
      title: `Kết quả kiểm tra  ${numberTrue.length}/${result.length}`,
      content: (
        <div>
          {
            result.map((item, index) => {
              return (
                <span key={index}>{`Câu ${index + 1}:${(item.check) ? 'Đúng ' : 'Sai '}`}</span>
              )
            })
          }
        </div>
      ),
      onOk() {
      },
    })
  }
  const formatDatetime = (Datetime) => {
    var date = new Date(Datetime)
    return (`${date.getHours()}:${date.getMinutes()} - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`)
  }
  const [lessons, setLessons] = useState([])
  useMemo(() => {
    const newArr = selectVideos.reduce((arr, lesson, index) => {
      const arrSort = selectVideos.filter((item) => {
        return item.lecture === lesson.lecture
      })
      arr.push({
        lecture: lesson.lecture,
        lesson: arrSort
      })
      return arr
    }, [])
    const listLesson = Array.from(new Set(newArr.map(JSON.stringify))).map(JSON.parse)
    setLessons([...listLesson])
  }, [selectVideos])

  const countRef = useRef(null)
  const [timer, setTimer] = useState(0)
  const handleStart = () => {
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
  }
  const handlePause = () => {
    clearInterval(countRef.current)
    setTimer(0)
  }
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <div className='learing'>
      <div className="learingResp" onClick={showDrawer}>
        <BarsOutlined />
      </div>
      <Drawer className='learingDrawerResp' title={selectDetailCourse.title} placement="left" closable={false} onClose={onClose} visible={visible}>
        {
          lessons.length === 0 ? (
            <div>Bài học chưa được cập nhật</div>
          ) : (
            <Collapse accordion >
              {
                lessons.map((item, index) => {
                  return (
                    <Panel header={` Chương ${item.lecture}`} key={index}>
                      {
                        item.lesson.map((lesson, indexArr) => {
                          return (
                            lesson.role === 'exercise' ? (
                              <div key={indexArr} className="itemVideoLearing" onClick={() => {
                                setExercise({
                                  ...exercise,
                                  title: lesson.title,
                                  content: lesson.content,
                                  id: lesson._id
                                })
                                setRole('exercise')
                                setVisible(false)
                              }
                              } >
                                <span>
                                  <FileTextOutlined />
                                  {` Bài ${indexArr + 1}: ${lesson.title}`}
                                </span>
                              </div>

                            ) : lesson.role === 'video' ? (
                              <div key={indexArr} className="itemVideoLearing" style={{ display: 'block' }} onClick={() => {
                                setVideo({
                                  ...video,
                                  url: lesson.url,
                                  title: lesson.title,
                                  id: lesson._id
                                })
                                setRole('video')
                                setVisible(false)
                              }
                              } >
                                <div>
                                  {`Bài ${indexArr + 1}: ${lesson.title}`}
                                </div>
                                <div>
                                  <PlayCircleOutlined style={{ color: '#f9b9a7' }} />
                                  {formatTime(lesson.duration)}
                                </div>
                              </div>
                            ) : (
                              <div key={indexArr} className="itemVideoLearing" onClick={() => {
                                getListTestResult(lesson._id)
                                setQuestion({
                                  ...question,
                                  title: lesson.title,
                                  id: lesson._id
                                })
                                setRole('quizzes')
                                setStateQuizzes(false)
                                setVisible(false)
                              }
                              } >
                                <span>
                                  <FileDoneOutlined />
                                  {` Bài ${indexArr + 1}: ${lesson.title}`}
                                </span>
                              </div>
                            )
                          )
                        })
                      }
                    </Panel>
                  )
                })
              }
            </Collapse>

          )
        }
      </Drawer>
      {/* {
        onclose && <ItemDraggable onclose={setOnclose} endVideo={videoEnd} handleEndvideo={SetVideoEnd} />
      } */}
      <div className="learingLeft">
        {
          role === 'video' ? (
            <>
              <div className="videoFrameTest">
                <video className="learingLeftVideo" style={{ backgroundImage: `url(${selectDetailCourse.image})` }} src={video.url} controls>
                </video>
                {/* <button className='testNoti'>test</button> */}
              </div>
              <div className="learingLeftTitle">
                {video.title}
              </div>
              <div className="learingLeftComment">
                {
                  video.id && (
                    <ItemComment videoId={video.id} createComment={createComment} getComment={getComment} selectListComment={selectListComment} />
                  )
                }
              </div>
            </>
          ) : (
            role === 'exercise' ? (
              <div className="learingLeftExercise">
                <div style={{ width: '80%', margin: '0 auto' }}>
                  <div className="learingLeftExerciseTitle">
                    <h1>{exercise.title}</h1>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: exercise.content }}></div>
                </div>
                <div className="learingLeftComment">
                  {
                    exercise.id && (
                      <ItemComment videoId={exercise.id} createComment={createComment} getComment={getComment} selectListComment={selectListComment} />
                    )
                  }
                </div>
              </div>
            ) : (
              role === 'quizzes' ? (
                <div className="learingLeftQuestion" >
                  <div className="learingLeftQuestionTitle">
                    <h1>{question.title}</h1>
                  </div>
                  {
                    (selectListTestResult.length !== 0 && !stateQuizzes) ? (
                      <div className="learingLeftQuestionHistory">
                        <h2>Kết quả lần làm gần đây:</h2>

                        {
                          selectListTestResult.reverse().map((item, index) => {
                            const numberTrueHistory = item.testResult.filter((item) => item.check)
                            return (
                              <p key={index}>{`${formatDatetime(item.createdAt)} - Kết quả: ${numberTrueHistory.length}/${item.testResult.length}`}</p>
                            )
                          })
                        }
                      </div>
                    ) : ''
                  }
                  {
                    !stateQuizzes && (
                      <Button type="primary" onClick={() => (
                        getListQuestion(question.id),
                        setStateQuizzes(true)
                      )}>{
                          (selectListTestResult.length !== 0) ? 'Làm lại' : 'Bắt đầu làm bài'
                        }</Button>
                    )
                  }
                  <div className="learingLeftQuestionList">
                    {
                      stateQuizzes && (
                        <Form
                          onFinish={onFinish}
                        >
                          {
                            selectGetListQuestions.map((item, index) => {
                              return (
                                <div key={index}>
                                  <h2>{`Câu ${index + 1}: ${item.question}`}</h2>
                                  <Form.Item
                                    name={index + 1}
                                    rules={[{ required: 'true', message: 'Vui lòng chọn đáp án' }]}
                                  >
                                    <Radio.Group >
                                      <Space direction="vertical">
                                        <Radio value={{
                                          "id": `${item._id}`,
                                          "correctAnswer": "A"
                                        }}>{item.answer.A}</Radio>
                                        <Radio value={{
                                          "id": `${item._id}`,
                                          "correctAnswer": "B"
                                        }}>{item.answer.B}</Radio>
                                        <Radio value={{
                                          "id": `${item._id}`,
                                          "correctAnswer": "C"
                                        }}>{item.answer.C}</Radio>
                                        <Radio value={{
                                          "id": `${item._id}`,
                                          "correctAnswer": "D"
                                        }}>{item.answer.D}</Radio>
                                      </Space>
                                    </Radio.Group>
                                  </Form.Item>
                                </div>
                              )
                            })
                          }
                          <Form.Item >
                            <Button type="primary" htmlType="submit" >
                              Nộp bài
                            </Button>
                          </Form.Item>
                        </Form>
                      )
                    }
                  </div>
                </div>
              ) : (
                <div className="learingLeftBackGround" style={{ backgroundImage: `url(${selectDetailCourse.image})` }}>
                </div>
              )
            )
          )
        }
      </div>
      <div className="learingRight">
        <h2>{selectDetailCourse.title}</h2>
        {/* <h2>Nội dung khóa học</h2> */}
        {
          lessons.length === 0 ? (
            <div>Bài học chưa được cập nhật</div>
          ) : (
            <Collapse accordion >
              {
                lessons.map((item, index) => {
                  return (
                    <Panel header={` Chương ${item.lecture}`} key={index}>
                      {
                        item.lesson.map((lesson, indexArr) => {
                          return (
                            lesson.role === 'exercise' ? (
                              <div key={indexArr} className="itemVideoLearing" onClick={() => {
                                setExercise({
                                  ...exercise,
                                  title: lesson.title,
                                  content: lesson.content,
                                  id: lesson._id
                                })
                                setRole('exercise')
                                setVisible(false)
                              }
                              } >
                                <span>
                                  <FileTextOutlined />
                                  {` Bài ${indexArr + 1}: ${lesson.title}`}
                                </span>
                              </div>

                            ) : lesson.role === 'video' ? (
                              <div key={indexArr} className="itemVideoLearing" style={{ display: 'block' }} onClick={() => {
                                setVideo({
                                  ...video,
                                  url: lesson.url,
                                  title: lesson.title,
                                  id: lesson._id
                                })
                                setRole('video')
                                setVisible(false)
                              }
                              } >
                                <div>
                                  {`Bài ${indexArr + 1}: ${lesson.title}`}
                                </div>
                                <div>
                                  <PlayCircleOutlined style={{ color: '#f9b9a7' }} />
                                  {formatTime(lesson.duration)}
                                </div>
                              </div>
                            ) : (
                              <div key={indexArr} className="itemVideoLearing" onClick={() => {
                                getListTestResult(lesson._id)
                                setQuestion({
                                  ...question,
                                  title: lesson.title,
                                  id: lesson._id
                                })
                                setRole('quizzes')
                                setStateQuizzes(false)
                                setVisible(false)
                              }
                              } >
                                <span>
                                  <FileDoneOutlined />
                                  {` Bài ${indexArr + 1}: ${lesson.title}`}
                                </span>
                              </div>
                            )
                          )
                        })
                      }
                    </Panel>
                  )
                })
              }
            </Collapse>

          )
        }
      </div>
      {/* <Modal title="Thông báo" visible={isModalVisible} okText='Giám sát' onOk={handleOk} cancelText='Không' onCancel={handleCancel}>
        <p>Bạn có muốn giám sát quá trình xem video này không</p>
      </Modal> */}
    </div >
  )
}

const mapStateToProps = createStructuredSelector({
  selectDetailCourse,
  selectVideos,
  selectListComment,
  selectGetListQuestions,
  selectListTestResult
})
const mapDispatchToProps = (dispatch) => ({
  detailCourse: (payload) => dispatch(actions.detailCourse(payload)),
  getVideo: (payload) => dispatch(actionsVideo.getVideo(payload)),
  createComment: (payload) => dispatch(actionsComment.createComment(payload)),
  getComment: (payload) => dispatch(actionsComment.getComment(payload)),
  getListQuestion: (payload) => dispatch(actionsQuestion.getQuestionRequest(payload)),
  testResult: (payload) => actionsQuestion.testResult(dispatch)(payload),
  getListTestResult: (payload) => dispatch(actionsHistory.getListTestResultRequest(payload)),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Learning)