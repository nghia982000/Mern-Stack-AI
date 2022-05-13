import React, { useEffect, useLayoutEffect, useState } from 'react'
import './style.scss'
import { Collapse } from 'antd'
import { PlayCircleOutlined } from '@ant-design/icons'
import imgCourse from '../../Assets/img/desk.png'
import { useParams } from 'react-router-dom'
import ItemComment from '../../Components/ItemComment'

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

const Learning = ({ selectDetailCourse, detailCourse, getVideo, selectVideos, createComment, getComment,selectListComment}) => {
  const [video, setVideo] = useState({
    id: '',
    url: '',
    title: ''
  })
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
  return (
    <div className='learing'>
      <div className="learingLeft">
        <video className="learingLeftVideo" style={{ backgroundImage: `url(${selectDetailCourse.image})` }} src={video.url} controls>
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
      </div>
      <div className="learingRight">
        <h2>{selectDetailCourse.title}</h2>
        {/* <h2>Nội dung khóa học</h2> */}
        <Collapse accordion>
          {
            selectVideos.map((item, index) => {
              return (
                <Panel header={item.lecture} key={index}>
                  <div className="itemVideoLearing" onClick={() => setVideo({
                    ...video,
                    url: item.url,
                    title: item.title,
                    id: item._id
                  })} >
                    <span>
                      <PlayCircleOutlined style={{ color: '#f9b9a7' }} />
                      {item.title}
                    </span>
                    <span>{formatTime(item.duration)}</span>
                  </div>
                </Panel>
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