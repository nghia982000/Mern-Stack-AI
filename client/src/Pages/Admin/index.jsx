import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './style.scss'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  TeamOutlined,
  ReadOutlined,
  CommentOutlined,
  BarChartOutlined,
  HomeOutlined

} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import logoAd from '../../Assets/img/logoAD.png'
import Course from './/Course'
import Account from './Account'
import Comment from './Comment'
import Statistical from './Statistical'
import CUCourse from './CUCourse'
import Lesson from './Lesson'
import Exercise from './Exercise'
import Quizzes from './Quizzes'
import Video from './Video'
import Questions from './Questions'
import CUQuestion from './CUQuestion'

import * as actions from '../../Store/Actions/auth'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {
    selectIsAuthenticated,
    selectUser
} from '../../Store/Selectors/auth'

const { Header, Sider, Content } = Layout
const { SubMenu } = Menu

const Admin = ({ checkLoginRequest, selectIsAuthenticated,selectUser }) => {
  const [colapsed, setColapsed] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const toggle = () => {
    setCollapsed(!collapsed)
  }
  const navigate = useNavigate()
  useEffect(()=>{
    checkLoginRequest()
  },[])

  useEffect(() => {
    if (!selectIsAuthenticated) {
      navigate('/login')
    }
  }, [selectIsAuthenticated])

  useEffect(() => {
    if(selectUser){
      if (selectUser.role ==='user') {
        navigate('/')
      }
    }
  }, [selectUser])
  return (
    <div className='admin'>
      <Layout>
        <Sider className="site-layout-background" width={260} trigger={null} collapsed={collapsed} breakpoint="lg" collapsedWidth={(colapsed) ? '0' : '80'}
          onCollapse={() => {
            setCollapsed(!collapsed)
            setColapsed(!colapsed)
          }}
          onBreakpoint={broken => {
            console.log(broken);
          }}
          style={{
            height: '100vh',
          }}>
          <div className="logo" onClick={() => navigate("/login")}>
            <img src={logoAd} alt='' />
          </div>
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} className="SiderMenu"
          >
            <Menu.Item key="1" icon={<ReadOutlined />}>
              <Link to="/admin/course">
                Quản lý khóa học
              </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<TeamOutlined />}>
              <Link to="/admin/account">
                Quản lý tài khoản
              </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<CommentOutlined />}>
              <Link to="/admin/comment">
                Quản lý comment
              </Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<BarChartOutlined />}>
              <Link to="/admin/statistical">
                Thống kê
              </Link>
            </Menu.Item>
          </Menu>

        </Sider>
        <Layout className="site-layout">
          <Header className="headerContent site-layout-background headerAdmin" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
            <div className='backHome'>
              <HomeOutlined onClick={() => (navigate("/"))} />
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 24px',
              padding: 24,
              minHeight: 280,
              height: '500px',
              overflow: 'auto'
            }}
          >
            <Routes>
              <Route path="/account" element={<Account />} />
              <Route path="/course" element={<Course />} />
              <Route path="/comment" element={<Comment />} />
              <Route path="/statistical" element={<Statistical />} />
              <Route path="/cuCourse" element={<CUCourse />} />
              <Route path="/lesson/:id" element={<Lesson />} />
              <Route path="/exercise/:id" element={<Exercise />} />
              <Route path="/quizzes/:id" element={<Quizzes />} />
              <Route path="/video/:id" element={<Video />} />
              <Route path="/questions/:id" element={<Questions />} />
              <Route path="/cuQuestion/:id" element={<CUQuestion />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  selectIsAuthenticated,
  selectUser
})
const mapDispatchToProps = (dispatch) => ({
  checkLoginRequest: () => dispatch(actions.checkLoginRequest()),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Admin)