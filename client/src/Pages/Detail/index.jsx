import React, { useEffect, useState, useLayoutEffect, useMemo } from 'react'
import './style.scss'
import { Collapse, notification } from 'antd'
import imgCourse from '../../Assets/img/desk.png'
import { CheckOutlined, PlayCircleOutlined, FileTextOutlined, CloseCircleOutlined, FileDoneOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
// import GoogleAds from '../../Components/Adver'

import * as actions from '../../Store/Actions/course'
import * as actionsVideo from '../../Store/Actions/video'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectDetailCourse, selectFavoriteCourse, selectBoughtCourse } from '../../Store/Selectors/course'
import { selectVideos } from '../../Store/Selectors/video'

const { Panel } = Collapse

const Detail = ({ selectDetailCourse, detailCourse, getVideo, selectVideos, favoriteCourse, selectFavoriteCourse, deleteFavorite, buyCourseRequest, selectBoughtCourse }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [btnFavorite, setBtnFavorite] = useState(selectFavoriteCourse.some((item) => {
    return item._id === id
  }))
  const [btnBuyCourse, setBtnBuyCourse] = useState(selectBoughtCourse.some((item) => {
    return item._id === id
  }))
  useEffect(() => {
    setBtnFavorite(selectFavoriteCourse.some((item) => {
      return item._id === id
    }))
  }, [selectFavoriteCourse, id])
  useEffect(() => {
    setBtnBuyCourse(selectBoughtCourse.some((item) => {
      return item._id === id
    }))
  }, [selectBoughtCourse, id])
  useEffect(() => {
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
  const noti = (message) => {
    notification.open({
      message: `${message}`,
      icon: <CloseCircleOutlined style={{ color: "red" }} />,
    })
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
              selectDetailCourse.benefit && selectDetailCourse.benefit.map((item, index) => {
                return (
                  <p key={index}  ><CheckOutlined key={index} style={{ color: '#f05123' }} /> {item}</p>
                )
              })
            }
          </div>
        </div>
        <div className="detailLeftContent">
          <h3>Nội dung khóa học</h3>
          {
            (selectVideos.length === 0) ? (
              <p>Chưa cập nhật video</p>
            ) : (
              <Collapse >
                {
                  lessons.map((item, index) => {
                    const newLesson = item.lesson.sort((a, b) => {
                      return a.lesson - b.lesson
                    })
                    return (
                      <Panel header={`Chương ${item.lecture}`} key={index}>
                        {
                          item.lesson.map((lesson, indexArr) => {
                            return (
                              lesson.role === 'exercise' ? (
                                <div key={indexArr} className="itemVideoCourse" >
                                  <span>
                                    <FileTextOutlined />
                                    {` Bài ${indexArr + 1}: ${lesson.title}`}
                                  </span>
                                </div>

                              ) : lesson.role === 'video' ? (
                                <div key={indexArr} className="itemVideoCourse" >
                                  <span style={{flex:'4'}}>
                                    <PlayCircleOutlined style={{ color: '#f9b9a7' }} />
                                    {` Bài ${indexArr + 1}: ${lesson.title}`}
                                  </span>
                                  <span style={{flex:'2',textAlign:'right'}}
                                  >{formatTime(lesson.duration)}</span>
                                </div>
                              ) : (
                                <div key={indexArr} className="itemVideoCourse" >
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
        {/* <div className="advertisement">
          <GoogleAds slot={9579687915} />
        </div> */}
        <div style={{height:'200px'}} >
        </div>
      </div>
      <div className="detailRight">
        <div className="detailRightImg" style={{ backgroundImage: `url(${selectDetailCourse.image})` }}>
        </div>
        <div className="detailRightAction">
          {
            !btnBuyCourse && (
              <p>{selectDetailCourse.point}Coin</p>
            )
          }

          {
            !btnFavorite && (
              <div className="detailRightActionBtn" onClick={async () => {
                const rep = await favoriteCourse({ id })
                if (!rep.success) {
                  noti(rep.message)
                }else{
                  notification.open({
                    message: 'Thêm khóa học thành công',
                    icon: <CheckOutlined style={{ color: "red" }} />,
                  })
                }
              }}>
                Thêm vào yêu thích
              </div>
            )
          }
          {
            btnFavorite && (
              <div className="detailRightActionBtn" onClick={() => deleteFavorite(id)}>
                Xóa khỏi yêu thích
              </div>
            )
          }
          {
            !btnBuyCourse && (
              <div className="detailRightActionBtn" onClick={async () => {
                const rep = await buyCourseRequest({ id })
                if (!rep.success) {
                  noti(rep.message)
                }else{
                  notification.open({
                    message: 'Mua khóa học thành công',
                    icon: <CheckOutlined style={{ color: "red" }} />,
                  })
                }
              }} >
                Mua khóa học
              </div>
            )
          }
          {
            btnBuyCourse && (
              <div className="detailRightActionBtn" onClick={() => navigate(`/learning/${id}`)} >
                Tiếp tục học
              </div>
            )
          }
        </div>
      </div>
    </div >
  )
}

const mapStateToProps = createStructuredSelector({
  selectDetailCourse,
  selectVideos,
  selectFavoriteCourse,
  selectBoughtCourse
})
const mapDispatchToProps = (dispatch) => ({
  detailCourse: (payload) => dispatch(actions.detailCourse(payload)),
  deleteFavorite: (payload) => dispatch(actions.deleteFavorite(payload)),
  // favoriteCourse: (payload) => dispatch(actions.favoriteCourse(payload)),
  // buyCourseRequest: (payload) => dispatch(actions.buyCourseRequest(payload)),
  getVideo: (payload) => dispatch(actionsVideo.getVideo(payload)),
  favoriteCourse: (payload) => actions.favoriteCourse(dispatch)(payload),
  buyCourseRequest: (payload) => actions.buyCourseRequest(dispatch)(payload),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Detail)