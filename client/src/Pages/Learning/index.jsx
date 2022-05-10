import React,{useEffect, useLayoutEffect, useState} from 'react'
import './style.scss'
import { Collapse } from 'antd'
import { PlayCircleOutlined } from '@ant-design/icons'
import imgCourse from '../../Assets/img/desk.png'
import { useParams } from 'react-router-dom'

import * as actions from '../../Store/Actions/course'
import * as actionsVideo from '../../Store/Actions/video'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectDetailCourse } from '../../Store/Selectors/course'
import { selectVideos } from '../../Store/Selectors/video'

const { Panel } = Collapse

const Learning = ({selectDetailCourse, detailCourse, getVideo, selectVideos}) => {
  const [video,setVideo]=useState({
    url:'',
    title:''
  })
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
      </div>
      <div className="learingRight">
        <h2>Nội dung khóa học</h2>
        <Collapse accordion>
          {
            selectVideos.map((item, index) => {
              return (
                <Panel header={item.lecture} key={index}>
                  <div className="itemVideoLearing" onClick={()=>setVideo({
                    ...video,
                    url:item.url,
                    title:item.title
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
})
const mapDispatchToProps = (dispatch) => ({
  detailCourse: (payload) => dispatch(actions.detailCourse(payload)),
  getVideo: (payload) => dispatch(actionsVideo.getVideo(payload)),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Learning)