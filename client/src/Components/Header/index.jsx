import React, { useEffect, useState } from 'react'
import './style.scss'
import Logo from '../../Assets/img/logoWeb.png'
import LogoAD from '../../Assets/img/logoUser.png'
import {
  SearchOutlined,
  ReadOutlined,
  HeartOutlined,
  CheckCircleOutlined
} from "@ant-design/icons"
import { Link, NavLink, useNavigate } from "react-router-dom"
import imgBxh from '../../Assets/img/manwork.jpg'
import { notification } from 'antd'


import * as actions from '../../Store/Actions/course'
import * as actionsAuth from '../../Store/Actions/auth'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectIsAuthenticated,selectUser } from '../../Store/Selectors/auth'
import { selectFavoriteCourse,selectBoughtCourse } from '../../Store/Selectors/course'

const Header = ({ selectIsAuthenticated,selectUser, getFavorite, selectFavoriteCourse,checkLoginRequest,getBoughtCourse,selectBoughtCourse }) => {
  const [btnCourse, setBtnCourse] = useState(false)
  const [btnFavorite, setBtnFavorite] = useState(false)
  const [btnUser, setBtnUser] = useState(false)
  const navigate = useNavigate()
  const SignOut = () => {
    sessionStorage.removeItem('token')
    if(!sessionStorage['token']){
      checkLoginRequest()
      notification.open({
        message: 'Đăng xuất thành công',
        icon: <CheckCircleOutlined style={{ color: "green" }} />,
      })
      navigate('/')
    }
  }
  useEffect(() => {
    if (btnFavorite) {
      getFavorite()
    }
  }, [btnFavorite])
  useEffect(() => {
    if (selectIsAuthenticated) {
      getFavorite()
      getBoughtCourse()
    }
  }, [selectIsAuthenticated])
  useEffect(() => {
    if (btnCourse) {
      getBoughtCourse()
    }
  }, [btnCourse])
  return (
    <div className='header'>
      <div className="headerLeft">
        <div className="headerLogo">
          <img src={Logo} alt="" />
        </div>
        <div className="headerMenu">
          <NavLink to="/">
            Home
          </NavLink>
          <NavLink to="/monitoring" >
            Monitoring
          </NavLink>
          <NavLink to="/course" >
            Course
          </NavLink>
        </div>
      </div>
      <div className="headerCenter">
        <div className="headerSearch">
          <div className="headerSearchLogo">
            <SearchOutlined style={{ fontSize: '20px' }} />
          </div>
          <input type="text" placeholder='Search...' >
          </input>
        </div>
      </div>
      <div className="headerRight">
        {
          !selectIsAuthenticated && (
            <div className="headerAuth" onClick={() => navigate('/login')}>
              <p>Login</p>
            </div>
          )
        }
        {
          selectIsAuthenticated && (
            <div className="headerUser">
              <div className="headerUserIcon" >
                <ReadOutlined onClick={() => {
                  setBtnCourse(!btnCourse)
                  setBtnFavorite(false)
                  setBtnUser(false)
                }
                } />
                {
                  btnCourse && (
                    <div className="headerUserCourse">
                      <div className="userCourseHeader" onClick={() => navigate('/myCourse')}>
                        Khóa học của tôi
                      </div>
                      <div className="userCourseContent">
                        {
                          selectBoughtCourse.map((item,index)=>{
                            return (
                            <div className="userCourseItem" key={index} onClick={()=>navigate(`/detail/${item._id}`)}>
                              <div className="CourseItemImg" style={{ backgroundImage: `url(${item.image})` }}>
                              </div>
                              <div className="CourseItemTitle">
                              {item.title}
                              </div>
                            </div>
                            )
                          })
                        }
                        
                      </div>
                    </div>
                  )
                }

              </div>
              <div className="headerUserIcon">
                <HeartOutlined onClick={() => {
                  setBtnFavorite(!btnFavorite)
                  setBtnCourse(false)
                  setBtnUser(false)
                }
                } />
                {
                  btnFavorite && (
                    <div className="headerUserCourse">
                      <div className="userCourseHeader">
                        Khóa học yêu thích
                      </div>
                      <div className="userCourseContent">
                        {
                          selectFavoriteCourse.map((item, index) => {
                            return (
                              <div className="userCourseItem" key={index} onClick={()=>navigate(`/detail/${item._id}`)}>
                                <div className="CourseItemImg" style={{ backgroundImage: `url(${item.image})` }}>
                                </div>
                                <div className="CourseItemTitle">
                                  {item.title}
                                </div>
                              </div>
                            )
                          })
                        }

                      </div>
                    </div>
                  )
                }
              </div>
              <div className="headerUserLogo">
                <div className="AuthProfileLogo" onClick={() => {
                  setBtnFavorite(false)
                  setBtnCourse(false)
                  setBtnUser(!btnUser)
                  
                }
                } >
                  <img src={LogoAD} alt="" />
                </div>
                {
                  btnUser && (
                    <div className="headerUserAuth">
                      <div className="UserAuthProfile">
                        <div className="AuthProfileLogo">
                          <img src={LogoAD} alt="" />
                        </div>
                        <div className="AuthProfileName">
                          {selectUser.username}
                        </div>
                      </div>
                      <div className="UserAuthContent">
                        <p onClick={() => navigate('/account')}>Trang cá nhân</p>
                        <p onClick={() => SignOut()}>Đăng xuất</p>
                      </div>
                    </div>
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
  selectFavoriteCourse,
  selectUser,
  selectBoughtCourse
})
const mapDispatchToProps = (dispatch) => ({
  checkLoginRequest: () => dispatch(actionsAuth.checkLoginRequest()),
  getFavorite: () => dispatch(actions.getFavorite()),
  getBoughtCourse: () => dispatch(actions.getBoughtCourse()),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Header)