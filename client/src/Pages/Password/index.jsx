import React from 'react'
import './style.scss'
import { Link, useNavigate } from 'react-router-dom'
import imgRegister from '../../Assets/img/register.png'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined, CloseCircleOutlined, CheckCircleOutlined, MailOutlined, IdcardOutlined } from '@ant-design/icons'
import { notification } from 'antd'

import * as actions from '../../Store/Actions/auth'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

const Password = ({ changePassword }) => {
  const navigate = useNavigate()
  const onFinish = async (values) => {
    console.log(values)
    const response = await changePassword(values)
    if (response.success) {
      notification.open({
        message: 'Đổi mật khẩu thành công',
        icon: <CheckCircleOutlined style={{ color: "green" }} />,
      })
      navigate('/')
    }else{
      notification.open({
        message: 'Email, tên đăng nhập hoặc mật khẩu không khớp',
        icon: <CloseCircleOutlined style={{ color: "red" }} />,
      })
    }

  }
  return (
    <div className='password'>
      <div className="passwordImage">
        <img className="passwordImagePic" src={imgRegister}>
        </img>
        <div className="passwordImageCreate">
          <Link to="/" style={{ color: '#222222', fontWeight: 'bold' }}>Quay lại trang chủ</Link>
        </div>
      </div>
      <div className="passwordForm">
        <div className="passwordFormTitle">
          Đổi mật khẩu
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
            name="email"
            rules={[{ required: true, message: 'Vui lòng nhập email!' ,type:'email'}]}
            style={{ marginBottom: '0px' }}
          >
            <Input size="large" style={{ paddingLeft: '0px' }} placeholder="Email" prefix={<MailOutlined />} bordered={false} />
          </Form.Item>
          <hr style={{ marginBottom: '15px' }} />
          <Form.Item
            name="oldPassword"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}
            style={{ marginBottom: '0px' }}
          >
            <Input.Password size="large" style={{ paddingLeft: '0px' }} placeholder="Mật khẩu cũ" prefix={<LockOutlined />} bordered={false} />
          </Form.Item>
          <hr style={{ marginBottom: '15px' }} />
          <Form.Item
            name="newPassword"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
            style={{ marginBottom: '0px' }}
          >
            <Input.Password size="large" style={{ paddingLeft: '0px' }} placeholder="Nhập mật khẩu mới" prefix={<LockOutlined />} bordered={false} />
          </Form.Item>
          <hr style={{ marginBottom: '15px' }} />
          <Form.Item >
            <Button type="primary" htmlType="submit" style={{ marginTop: '20px' }}>
              Đổi mật khẩu
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
  changePassword: (payload) => actions.changePassword(dispatch)(payload)
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Password)