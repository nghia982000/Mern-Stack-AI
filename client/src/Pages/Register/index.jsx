import React from 'react'
import './style.scss'
import { Link, useNavigate } from 'react-router-dom'
import imgRegister from '../../Assets/img/register (1).png'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined, CloseCircleOutlined, CheckCircleOutlined, MailOutlined, IdcardOutlined } from '@ant-design/icons'
import { notification } from 'antd'

import * as actions from '../../Store/Actions/auth'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import backgroundLogin from '../../Assets/img/loginBG.jpg'

const Register = ({ register }) => {
  const navigate = useNavigate()
  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      notification.open({
        message: 'Đăng ký thất bại',
        description: 'Mật khẩu không khớp',
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
    } else {
      notification.open({
        message: 'Tài khoản đã tồn tại',
        icon: <CloseCircleOutlined style={{ color: "red" }} />,
      })
    }

  }
  return (
    <div className="registerBackground" style={{ backgroundImage: `url(${backgroundLogin})` }}>
      <div className='register'>
        <div className="registerForm">
          <div className="registerFormTitle">
            Đăng ký
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
              name="nameAccount"
              rules={[{ required: true, message: 'Vui lòng nhập tên hiển thị!' }]}
              style={{ marginBottom: '0px' }}
            >
              <Input size="large" style={{ paddingLeft: '0px' }} placeholder="Tên hiển thị" prefix={<IdcardOutlined />} bordered={false} />
            </Form.Item>
            <hr style={{ marginBottom: '15px' }} />
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Vui lòng nhập email!', type: 'email' }]}
              style={{ marginBottom: '0px' }}
            >
              <Input size="large" style={{ paddingLeft: '0px' }} placeholder="Email" prefix={<MailOutlined />} bordered={false} />
            </Form.Item>
            <hr style={{ marginBottom: '15px' }} />
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
              style={{ marginBottom: '0px' }}
            >
              <Input.Password size="large" style={{ paddingLeft: '0px' }} placeholder="Mật khẩu" prefix={<LockOutlined />} bordered={false} />
            </Form.Item>
            <hr style={{ marginBottom: '15px' }} />
            <Form.Item
              name="confirmPassword"
              rules={[{ required: true, message: 'Vui lòng xác nhận lại mật khẩu!' }]}
              style={{ marginBottom: '0px' }}
            >
              <Input.Password size="large" style={{ paddingLeft: '0px' }} placeholder="Nhập lại mật khẩu" prefix={<LockOutlined />} bordered={false} />
            </Form.Item>
            <hr style={{ marginBottom: '15px' }} />
            <Form.Item >
              <Button type="primary" htmlType="submit" style={{ marginTop: '20px' }}>
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
          <div className="registerImageCreateResp">
            <Link to="/login" style={{ color: '#222222', fontWeight: 'bold' }}>Tôi đã đăng có tài khoản</Link>
          </div>
        </div>
        <div className="registerImage">
          <img className="registerImagePic" src={imgRegister}>
          </img>
          <div className="registerImageCreate">
            <Link to="/login" style={{ color: '#222222', fontWeight: 'bold' }}>Tôi đã đăng có tài khoản</Link>
          </div>
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