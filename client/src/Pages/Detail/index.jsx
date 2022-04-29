import React, { useEffect } from 'react'
import './style.scss'
import { Collapse } from 'antd'
import imgCourse from '../../Assets/img/desk.png'
import { CheckOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'

import * as actions from '../../Store/Actions/course'
import * as actionsVideo from '../../Store/Actions/video'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectDetailCourse, } from '../../Store/Selectors/course'
import { selectVideos } from '../../Store/Selectors/video'

const { Panel } = Collapse

const Detail = ({ selectDetailCourse, detailCourse, getVideo, selectVideos }) => {
  const { id } = useParams()
  useEffect(() => {
    detailCourse(id)
    getVideo(id)
  }, [])
  const text = 'Chưa cập nhật'
  return (
    <div className='detail'>
      <div className="detailLeft">
        <div className="detailLeftTitle">
          {selectDetailCourse.title}
        </div>
        <div className="detailLeftDescription">
          {selectDetailCourse.description}
        </div>
        <div className="detailLeftBenefit">
          <h3>Bạn sẽ học được gì?</h3>
          <div className="benefitDetail">
            {
              selectDetailCourse.benefit.map((item, index) => {
                return (
                  <p key={index}  ><CheckOutlined key={index} style={{ color: '#f05123' }} /> {item}</p>
                )
              })
            }
          </div>
        </div>
        <div className="detailLeftContent">
          <h3>Nội dung khóa học</h3>
          <Collapse >
            <Panel header="Giới thiệu" key="1">
              <div className="itemVideoCourse">
                <span>
                  <PlayCircleOutlined style={{ color: '#f9b9a7' }} />
                  1. ReactJS là gì? Tại sao nên học ReactJS?
                </span>
                <span>10:41</span>
              </div>
            </Panel>
            <Panel header="Ôn lại ES6 " key="2">
              <p>{text}</p>
            </Panel>
            <Panel header="React, React-DOM" key="3">
              <p>{text}</p>
            </Panel>
            <Panel header="JSX, Component, Props" key="4">
              <p>{text}</p>
            </Panel>
          </Collapse>
        </div>
      </div>
      <div className="detailRight">
        <div className="detailRightImg" style={{ backgroundImage: `url(${selectDetailCourse.image})`}}>
        </div>
        <div className="detailRightAction">
          <p>999đ</p>
          <div className="detailRightActionBtn">
            Thêm vào yêu thích
          </div>
          <div className="detailRightActionBtn">
            Mua khóa học
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  selectDetailCourse,
  selectVideos
})
const mapDispatchToProps = (dispatch) => ({
  detailCourse: (payload) => dispatch(actions.detailCourse(payload)),
  getVideo: (payload) => dispatch(actionsVideo.getVideo(payload))
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Detail)