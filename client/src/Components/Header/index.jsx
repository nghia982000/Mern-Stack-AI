import React, { useEffect, useRef, useState } from 'react'
import './style.scss'
import Logo from '../../Assets/img/logoWeb.png'
import LogoAD from '../../Assets/img/logoUser.png'
import {
  SearchOutlined,
  ReadOutlined,
  HeartOutlined,
  CheckCircleOutlined,
  MenuOutlined,
  HomeOutlined,
  KeyOutlined,
  LogoutOutlined,
  IdcardOutlined,
  ProfileOutlined,
  UserOutlined
} from "@ant-design/icons"
import { Link, NavLink, useNavigate } from "react-router-dom"
import imgBxh from '../../Assets/img/manwork.jpg'
import { notification, Drawer } from 'antd'


import * as actions from '../../Store/Actions/course'
import * as actionsAuth from '../../Store/Actions/auth'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectIsAuthenticated, selectUser } from '../../Store/Selectors/auth'
import { selectFavoriteCourse, selectBoughtCourse } from '../../Store/Selectors/course'

const Header = ({ selectIsAuthenticated, selectUser, getFavorite, selectFavoriteCourse, checkLoginRequest, getBoughtCourse, selectBoughtCourse, searchCourse }) => {
  const [btnCourse, setBtnCourse] = useState(false)
  const [btnFavorite, setBtnFavorite] = useState(false)
  const [btnUser, setBtnUser] = useState(false)
  const navigate = useNavigate()
  const search = useRef()
  const SignOut = () => {
    sessionStorage.removeItem('token')
    if (!sessionStorage['token']) {
      checkLoginRequest()
      notification.open({
        message: 'Đăng xuất thành công',
        icon: <CheckCircleOutlined style={{ color: "green" }} />,
      })
      navigate('/')
    }
  }
  const onFocus = () => {
    navigate('/course')
  }
  const onSubmit = (e) => {
    e.preventDefault()
    searchCourse({ item: search.current.value })
    // console.log(search.current.value)
    search.current.value = ''
  }
  const ChangePassword = () => {
    navigate('/password')
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
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  }
  return (
    <div className='header'>
      <Drawer placement="left" className='headerDrawer' closable={false} onClose={onClose} visible={visible}>
        {
          selectIsAuthenticated ? (
            <div className="headerAccountDrawer">
              <div className="UserAuthProfile">
                <div className="AuthProfileLogo">
                  <img src={LogoAD} alt="" />
                </div>
                <div className="AuthProfileName">
                  <p>{selectUser.nameAccount}</p>
                  <p>{selectUser.point} coin</p>
                </div>
              </div>
              <div className="UserAuthContent">
                <div className="headerAccountDrawerItem" onClick={() => (
                  navigate('/myCourse'),
                  setVisible(false)
                )}>
                  <ReadOutlined />
                  <span>  Các khóa học đã mua</span>
                </div>
              </div>
            </div>
          ) : (

            <div className="headerLogoDrawer">
              <img src={Logo} alt="" />
            </div>
          )
        }
        <div className="headerMenuDrawer">
          <div className="headerMenuDrawerItem" onClick={() => (
            navigate('/'),
            setVisible(false)
          )}>
            <HomeOutlined />
            <span>  Trang chủ</span>
          </div>
          <div className="headerMenuDrawerItem" onClick={() => (
            navigate('/course'),
            setVisible(false)
          )}>
            <ProfileOutlined />
            <span>  Các khóa học</span>
          </div>
        </div>
        {
          selectIsAuthenticated && (
            <div className="headerDrawerFooter">
              <div className="headerAccountDrawerItem" onClick={() => (
                navigate('/account'),
                setVisible(false)
              )}>
                <IdcardOutlined />
                <span>  Trang cá nhân</span>
              </div>
              <div className="headerAccountDrawerItem" onClick={() => (
                ChangePassword(),
                setVisible(false)
              )}>
                <KeyOutlined />
                <span>  Đổi mật khẩu</span>
              </div>
              <div className="headerAccountDrawerItem" onClick={() => (
                SignOut(),
                setVisible(false)
              )}>
                <LogoutOutlined />
                <span>  Đăng xuất</span>
              </div>
            </div>
          )
        }
      </Drawer>
      <div className="headerMenuResp">
        <MenuOutlined onClick={showDrawer} />
      </div>
      <div className="headerLeft">
        <div className="headerLogo">
          <img src={Logo} alt="" />
        </div>
        <div className="headerMenu">
          <NavLink to="/">
            Trang chủ
          </NavLink>
          {/* <NavLink to="/monitoring" >
            Giám sát
          </NavLink> */}
          <NavLink to="/course" >
            Các khóa học
          </NavLink>
        </div>
      </div>
      <div className="headerCenter">
        <div className="headerSearch">
          <div className="headerSearchLogo">
            <SearchOutlined style={{ fontSize: '20px' }} />
          </div>
          <form action="" onSubmit={(e) => onSubmit(e)}>
            <input type="text" ref={search} onFocus={() => onFocus()} placeholder='Tìm kiếm khóa học' >
            </input>
          </form>
        </div>
      </div>
      <div className="headerRight">
        {
          !selectIsAuthenticated && (
            <div className="headerAuth" onClick={() => navigate('/login')}>
              <p>Đăng nhập</p>
            </div>
          )
        }
        {
          selectIsAuthenticated && (
            <div className="headerUser">
              <div className="headerUserResp">
                <UserOutlined onClick={showDrawer} />
              </div>
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
                      {
                        (selectBoughtCourse.length === 0) ? (
                          <div className="userCourseHeader">
                            Chưa có khóa học nào
                          </div>
                        ) : (
                          <>
                            <div className="userCourseHeader" onClick={() => navigate('/myCourse')}>
                              Khóa học của tôi
                            </div>
                            <div className="userCourseContent">
                              {
                                selectBoughtCourse.map((item, index) => {
                                  return (
                                    <div className="userCourseItem" key={index} onClick={() => {
                                      setBtnCourse(!btnCourse)
                                      navigate(`/learning/${item._id}`)
                                    }}>
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
                          </>
                        )
                      }

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
                      {
                        (selectFavoriteCourse.length === 0) ? (
                          <div className="userCourseHeader">
                            Chưa có khóa học yêu thích nào
                          </div>
                        ) : (
                          <>
                            <div className="userCourseHeader">
                              Khóa học yêu thích
                            </div>
                            <div className="userCourseContent">
                              {
                                selectFavoriteCourse.map((item, index) => {
                                  return (
                                    <div className="userCourseItem" key={index} onClick={() => {
                                      setBtnFavorite(!btnFavorite)
                                      navigate(`/detail/${item._id}`)
                                    }}>
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
                          </>
                        )
                      }

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
                          <p>{selectUser.nameAccount}</p>
                          <p>{selectUser.point} coin</p>
                        </div>
                      </div>
                      <div className="UserAuthContent">
                        <p onClick={() => {
                          navigate('/account')
                          setBtnUser(!btnUser)
                        }}>Trang cá nhân</p>
                        <p onClick={() => ChangePassword()}>Đổi mật khẩu</p>
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
  searchCourse: (payload) => dispatch(actions.searchCourse(payload)),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Header)