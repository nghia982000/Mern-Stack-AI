import React, { useState } from 'react'
import './style.scss'
import { useNavigate } from "react-router-dom"
import imgWork from '../../Assets/img/Online games addiction Customizable Cartoon Illustrations _ Bro Style.png'
import { DatePicker, TimePicker, Select, Space, Input, message, Form, Steps, Button, Modal, notification } from 'antd'
import { UserOutlined, LockOutlined, CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'

import * as actions from '../../Store/Actions/auth'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {
  selectIsAuthenticated
} from '../../Store/Selectors/auth'
import imgNotifi from '../../Assets/img/notifi.jpg'
import imgPermiss from '../../Assets/img/permission.jpg'
const { Step } = Steps
const steps = [
  {
    title: 'First',
    content: (
      <div>
        <h3>Chức năng này chỉ được áp dụng trên máy tính cá nhân có webcam và bạn cần cho phép ứng dụng truy cập các quyền truy câp vào webcam và thông báo.</h3>
        <img src={imgPermiss} style={{ width: '100%' }} alt="" />
      </div>
    ),
  },
  {
    title: 'Second',
    content: (
      <div>
        <h3>Tiếp đến bạn cần phải bật thông báo của máy tính các nhân để ứng dụng có thể thông báo cho bạn.</h3>
        <img src={imgNotifi} style={{ width: '100%' }} alt="" />
      </div>
    ),
  },
  {
    title: 'Third',
    content: (
      <div>
        <h3>Để có một năng suất làm việc hiểu quả và tốt cho sức khỏe bạn cần thực hiện các điều sau đây:</h3>
        <p>Bạn hãy điều chỉnh độ sâu của ghế sao cho phù hợp với chiều dài hông của mình.</p>
        <p>Hãy gập cánh tay vuông góc 90 độ khi đánh máy tính, tuyệt đối không tì tay vào bàn phím khi đánh máy.</p>
        <p>Điều chỉnh lại ghế ngồi sao cho phần đầu ghế và cạnh ghế không vuông góc với nhau.</p>
        <p>Bạn hãy vận động bài tập nhẹ cho cổ như lắc, gập, ngửa cổ để cổ không bị cứng</p>
        <p>Đặt màn hình máy tính vừa ngang tầm nhìn của mắt sao cho khoảng cách từ mắt đến máy tính là khoảng 50 cm</p>
      </div>
    ),
  },
  {
    title: 'Last',
    content: (
      <div>
        <h3>Cuối cùng bạn có thể nhận được một số điểm tương ứng với quá trình giám sát của bạn và số điểm đó bạn có thể sử dụng để mua các khóa học trong hệ thống của ứng dụng.</h3>
      </div>
    ),
  },
]
const ItemMonitoring = ({ stateMonitor, selectIsAuthenticated }) => {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const startMonitoring = () => {
    if (selectIsAuthenticated) {
      showModal()
    } else {
      notification.open({
        message: 'Hãy đăng nhập để sử dụng chức năng này',
        icon: <CloseCircleOutlined style={{ color: "red" }} />,
      })
    }
  }
  return (
    <div className='itemMonitoring' >
      <div className="itemMonitoringLeft">
        <div className="itemMonitoringTitle">
          Giám sát quá trình làm việc của bạn
        </div>
        <div className="itemMonitoringBtn" onClick={startMonitoring} >
          Bắt đầu giám sát
        </div>
      </div>
      <div className="itemMonitoringRight">
        <img src={imgWork} alt="" />
      </div>
      <Modal
        title="Hướng dẫn"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Tiếp
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => navigate('/monitoring')}>
              Hoàn tất
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Quay lại
            </Button>
          )}
        </div>
      </Modal>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  selectIsAuthenticated
})
const mapDispatchToProps = (dispatch) => ({
  stateMonitor: (payload) => dispatch(actions.stateMonitor(payload))
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(ItemMonitoring)