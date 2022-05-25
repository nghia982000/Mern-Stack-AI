import React, { useEffect, useLayoutEffect, useState } from 'react'

import './style.scss'
import { Collapse } from 'antd'
import { PlayCircleOutlined, FileTextOutlined } from '@ant-design/icons'
import imgCourse from '../../Assets/img/desk.png'
import { useParams } from 'react-router-dom'
import ItemComment from '../../Components/ItemComment'
import ItemDraggable from '../../Components/ItemDraggable'

import * as actions from '../../Store/Actions/course'
import * as actionsVideo from '../../Store/Actions/video'
import * as actionsComment from '../../Store/Actions/comment'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectDetailCourse } from '../../Store/Selectors/course'
import { selectVideos } from '../../Store/Selectors/video'
import { selectListComment } from '../../Store/Selectors/comment'

const { Panel } = Collapse

const Learning = ({ selectDetailCourse, detailCourse, getVideo, selectVideos, createComment, getComment, selectListComment }) => {
  const [video, setVideo] = useState({
    id: '',
    url: '',
    title: ''
  })
  const [role, setRole] = useState()
  const [exercise, setExercise] = useState({
    content: '',
    title: ''
  })
  console.log(role)
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
  }
  const loadStart = () => {
    console.log('start video')
    setOnclose(true)
  }
  const [onclose, setOnclose]=useState(false)
  return (
    <div className='learing'>
      {
        onclose&&<ItemDraggable onclose={setOnclose}/>
      }
      <div className="learingLeft">
        {
          role === 'video' ? (
            <>
              <video className="learingLeftVideo" style={{ backgroundImage: `url(${selectDetailCourse.image})` }} src={video.url} onLoadStart={() => loadStart()} onEnded={() => endVideo()} controls>
              </video>
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
              <div className="learingLeftBackGround" style={{ backgroundImage: `url(${selectDetailCourse.image})` }}>
              </div>
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
                )
              )
            })
          }
        </Collapse>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  selectDetailCourse,
  selectVideos,
  selectListComment
})
const mapDispatchToProps = (dispatch) => ({
  detailCourse: (payload) => dispatch(actions.detailCourse(payload)),
  getVideo: (payload) => dispatch(actionsVideo.getVideo(payload)),
  createComment: (payload) => dispatch(actionsComment.createComment(payload)),
  getComment: (payload) => dispatch(actionsComment.getComment(payload)),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Learning)