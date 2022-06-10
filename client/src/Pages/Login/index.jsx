import React, { useEffect, useState } from 'react'
import './style.scss'
import { Link, useNavigate } from 'react-router-dom'
import imgLogin from '../../Assets/img/login.png'
import { Form, Input, Button, Spin, notification } from 'antd'
import { UserOutlined, LockOutlined, CloseCircleOutlined,CheckCircleOutlined } from '@ant-design/icons'

import * as actions from '../../Store/Actions/auth'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {
  selectAuthLoading,
  selectIsAuthenticated,
  selectUser
} from '../../Store/Selectors/auth'
import backgroundLogin from '../../Assets/img/loginBG.jpg'

const Login = ({ login, checkLoginRequest, selectAuthLoading, selectIsAuthenticated, selectUser }) => {
  const [token, setToken] = useState()
  const onFinish = async (values) => {
    const response = await login(values)
    console.log(response)
    if (!response.success) {
      notification.open({
        message: 'Sai tài khoản hoặc mật khẩu',
        icon: <CloseCircleOutlined style={{ color: "red" }} />,
      })
    }
  }
  // console.log(selectIsAuthenticated)
  const navigate = useNavigate()
  useEffect(() => {
    if (selectUser) {
      checkLoginRequest()
    }
  }, [selectUser])
  useEffect(() => {
    if (!selectIsAuthenticated) {
      checkLoginRequest()
    }
  }, [selectIsAuthenticated])
  useEffect(() => {
    if (selectUser) {
      if (selectUser.role === 'user') {
        navigate('/')
        notification.open({
          message: 'Đăng nhập thành công',
          icon: <CheckCircleOutlined style={{ color: "green" }} />,
        })
      }
      if (selectUser.role === 'manager') {
        navigate('/admin/course')
        notification.open({
          message: 'Đăng nhập thành công',
          icon: <CheckCircleOutlined style={{ color: "green" }} />,
        })
      }
    }
  }, [selectUser])
  return (
    <>
      <div className="loginBackground" style={{ backgroundImage: `url(${backgroundLogin})` }}>
        <div className='login'>
          <div className="loginImage">
            <img className="loginImagePic" src={imgLogin}>
            </img>
            <div className="loginImageCreate">
              <Link to="/Register" style={{ color: '#222222', fontWeight: 'bold' }}>Bạn chưa có tài khoản</Link>
            </div>
          </div>
          <div className="loginForm">
            <div className="loginFormTitle">
              Đăng nhập
            </div>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                style={{ marginBottom: '0px' }}
              >
                <Input size="large" style={{ paddingLeft: '0px' }} placeholder="Tên đăng nhập" prefix={<UserOutlined />} bordered={false} />
              </Form.Item>
              <hr style={{ marginBottom: '15px' }} />
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn!' }]}
                style={{ marginBottom: '0px' }}
              >
                <Input.Password size="large" style={{ paddingLeft: '0px' }} placeholder="Mật khẩu" prefix={<LockOutlined />} bordered={false} />
              </Form.Item>
              <hr style={{ marginBottom: '15px' }} />
              <Form.Item >
                <Button type="primary" htmlType="submit" style={{ marginTop: '20px' }}>
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
            <div className="loginImageCreateResp">
              <Link to="/Register" style={{ color: '#222222', fontWeight: 'bold' }}>Bạn chưa có tài khoản</Link>
            </div>
          </div>

        </div>

      </div>
      {!selectAuthLoading && (
        <div className="loading">
          <Spin size="large" />
        </div>
      )
      }
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  selectAuthLoading,
  selectIsAuthenticated,
  selectUser
})
const mapDispatchToProps = (dispatch) => ({
  checkLoginRequest: () => dispatch(actions.checkLoginRequest()),
  // login: (payload) => dispatch(actions.login(payload))
  login: (payload) => actions.login(dispatch)(payload)
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Login)