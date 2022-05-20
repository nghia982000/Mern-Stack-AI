import React from 'react'
import './style.scss'
import { Link, useNavigate } from 'react-router-dom'
import imgRegister from '../../Assets/img/register (1).png'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { notification } from 'antd'

import * as actions from '../../Store/Actions/auth'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

const Register = ({ register }) => {
  const navigate=useNavigate()
  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      notification.open({
        message: 'Fail register',
        description: 'Passwords do not match',
        icon: <CloseCircleOutlined style={{ color: "red" }} />,
      })
      return
    }
    // console.log('Success:', {...values,role:'user'})
    const response = await register({ ...values, role: 'user' })
    console.log(response)
    if (response.success) {
      notification.open({
        message: 'Đăng ký thành công',
        icon: <CheckCircleOutlined style={{ color: "green" }} />,
      })
      navigate("/login")
    }

  }
  return (
    <div className='register'>
      <div className="registerForm">
        <div className="registerFormTitle">
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
          <hr style={{ marginBottom: '15px' }} />
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            style={{ marginBottom: '0px' }}
          >
            <Input.Password size="large" style={{ paddingLeft: '0px' }} placeholder="Password" prefix={<LockOutlined />} bordered={false} />
          </Form.Item>
          <hr style={{ marginBottom: '15px' }} />
          <Form.Item
            name="confirmPassword"
            rules={[{ required: true, message: 'Please input your password!' }]}
            style={{ marginBottom: '0px' }}
          >
            <Input.Password size="large" style={{ paddingLeft: '0px' }} placeholder="Confirm password" prefix={<LockOutlined />} bordered={false} />
          </Form.Item>
          <hr style={{ marginBottom: '15px' }} />
          <Form.Item >
            <Button type="primary" htmlType="submit" style={{ marginTop: '20px' }}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="registerImage">
        <img className="registerImagePic" src={imgRegister}>
        </img>
        <div className="registerImageCreate">
          <Link to="/login" style={{ color: '#222222', fontWeight: 'bold' }}>I am already register</Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({

})
const mapDispatchToProps = (dispatch) => ({
  register: (payload) => actions.register(dispatch)(payload)
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Register)