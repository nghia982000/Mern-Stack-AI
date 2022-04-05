import React, { useEffect } from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
import imgLogin from '../../Assets/img/login.png'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import * as actions from '../../Store/Actions/login'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

const Login = ({login}) => {
  const onFinish = (values) => {
    console.log('Success:', values)
    login(values)
  }

  return (
    <div className='login'>
      <div className="loginImage">
        <img className="loginImagePic" src={imgLogin}>
        </img>
        <div className="loginImageCreate">
          <Link to="/Register" style={{ color: '#222222', fontWeight: 'bold' }}>Create an account</Link>
        </div>
      </div>
      <div className="loginForm">
        <div className="loginFormTitle">
          Sign up
        </div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
            style={{ marginBottom: '0px' }}
          >
            <Input size="large" style={{ paddingLeft: '0px' }} placeholder="User Name" prefix={<UserOutlined />} bordered={false} />
          </Form.Item>
          <hr style={{ marginBottom: '15px' }}/>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            style={{ marginBottom: '0px' }}
          >
            <Input.Password size="large" style={{ paddingLeft: '0px' }} placeholder="Password" prefix={<LockOutlined />} bordered={false} />
          </Form.Item>
          <hr style={{ marginBottom: '15px' }}/>
          <Form.Item >
            <Button type="primary" htmlType="submit" style={{ marginTop: '20px' }}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({

})
const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(actions.login(payload))
})

const withConnect = connect(mapStateToProps,mapDispatchToProps)
export default compose(withConnect)(Login)