import React, { useEffect, useLayoutEffect, useState } from 'react'

import './style.scss'
import {
  Collapse,
  Form,
  Modal,
  Button,
  Radio,
  Space
} from 'antd'
import { PlayCircleOutlined, FileTextOutlined, FileDoneOutlined } from '@ant-design/icons'
import imgCourse from '../../Assets/img/desk.png'
import { useParams } from 'react-router-dom'
import ItemComment from '../../Components/ItemComment'
import ItemDraggable from '../../Components/ItemDraggable'

import * as actions from '../../Store/Actions/course'
import * as actionsVideo from '../../Store/Actions/video'
import * as actionsComment from '../../Store/Actions/comment'
import * as actionsQuestion from '../../Store/Actions/quizzes'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectDetailCourse } from '../../Store/Selectors/course'
import { selectVideos } from '../../Store/Selectors/video'
import { selectListComment } from '../../Store/Selectors/comment'
import { selectGetListQuestions } from '../../Store/Selectors/quizzes'

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
  testResult
}) => {
  const [video, setVideo] = useState({
    id: '',
    url: '',
    title: ''
  })
  const [role, setRole] = useState()
  const [videoEnd, SetVideoEnd] = useState(false)
  const [exercise, setExercise] = useState({
    content: '',
    title: ''
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
  const endVideo = () => {
    console.log('end video')
    SetVideoEnd(true)

  }
  const loadStart = () => {
    console.log('start video')
    showModal()
  }
  const [onclose, setOnclose] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleOk = () => {
    setIsModalVisible(false)
    setOnclose(true)
  }
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
      data:{
        listAnswer:data
      }
    })
    console.log(response)
    setStateQuizzes(false)
  }
  return (
    <div className='learing'>
      {
        onclose && <ItemDraggable onclose={setOnclose} endVideo={videoEnd} handleEndvideo={SetVideoEnd} />
      }
      <div className="learingLeft">
        {
          role === 'video' ? (
            <>
              <div className="videoFrameTest">
                <video className="learingLeftVideo" style={{ backgroundImage: `url(${selectDetailCourse.image})` }} src={video.url} onLoadStart={() => loadStart()} onEnded={() => endVideo()} controls>
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
                <div className="learingLeftExerciseTitle">
                  <h1>{exercise.title}</h1>
                </div>
                <div dangerouslySetInnerHTML={{ __html: exercise.content }}></div>
              </div>
            ) : (
              role === 'quizzes' ? (
                <div className="learingLeftQuestion" >
                  <div className="learingLeftQuestionTitle">
                    <h1>{question.title}</h1>
                  </div>
                  <button onClick={() => (
                    getListQuestion(question.id),
                    setStateQuizzes(true)
                  )}>Băt đầu làm</button>
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
                              Submit
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
        <Collapse accordion>
          {
            selectVideos.map((item, index) => {
              return (
                item.role === 'exercise' ? (
                  <Panel header={`Lecture ${item.lecture}`} key={index}>
                    <div className="itemVideoLearing" onClick={() => {
                      setExercise({
                        ...exercise,
                        title: item.title,
                        content: item.content
                      })
                      setRole('exercise')
                    }
                    } >
                      <span>
                        <FileTextOutlined />
                        {item.title}
                      </span>
                    </div>
                  </Panel>
                ) : (
                  item.role === 'video' ? (
                    <Panel header={`Lecture ${item.lecture}`} key={index}>
                      <div className="itemVideoLearing" onClick={() => {
                        setVideo({
                          ...video,
                          url: item.url,
                          title: item.title,
                          id: item._id
                        })
                        setRole('video')
                      }
                      } >
                        <span>
                          <PlayCircleOutlined style={{ color: '#f9b9a7' }} />
                          {item.title}
                        </span>
                        <span>{formatTime(item.duration)}</span>
                      </div>
                    </Panel>
                  ) : (
                    <Panel header={`Lecture ${item.lecture}`} key={index}>
                      <div className="itemVideoLearing" onClick={() => {
                        setQuestion({
                          ...question,
                          title: item.title,
                          id: item._id
                        })
                        setRole('quizzes')
                      }
                      } >
                        <span>
                          <FileDoneOutlined />
                          {item.title}
                        </span>
                      </div>
                    </Panel>
                  )
                )
              )
            })
          }
        </Collapse>
      </div>
      <Modal title="Thông báo" visible={isModalVisible} okText='Giám sát' onOk={handleOk} cancelText='Không' onCancel={handleCancel}>
        <p>Bạn có muốn giám sát quá trình xem video này không</p>
      </Modal>
    </div >
  )
}

const mapStateToProps = createStructuredSelector({
  selectDetailCourse,
  selectVideos,
  selectListComment,
  selectGetListQuestions
})
const mapDispatchToProps = (dispatch) => ({
  detailCourse: (payload) => dispatch(actions.detailCourse(payload)),
  getVideo: (payload) => dispatch(actionsVideo.getVideo(payload)),
  createComment: (payload) => dispatch(actionsComment.createComment(payload)),
  getComment: (payload) => dispatch(actionsComment.getComment(payload)),
  getListQuestion: (payload) => dispatch(actionsQuestion.getQuestionRequest(payload)),
  testResult: (payload) => actionsQuestion.testResult(dispatch)(payload)
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Learning)