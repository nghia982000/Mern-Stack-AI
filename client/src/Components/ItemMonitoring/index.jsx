import React from 'react'
import './style.scss'
import { useNavigate } from "react-router-dom"
import imgWork from '../../Assets/img/Online games addiction Customizable Cartoon Illustrations _ Bro Style.png'
import { DatePicker, TimePicker, Select, Space, Input, Form, Button, Modal, notification } from 'antd'
import * as actions from '../../Store/Actions/auth'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {
  selectIsAuthenticated
} from '../../Store/Selectors/auth'

const ItemMonitoring = ({ stateMonitor,selectIsAuthenticated }) => {
  const navigate = useNavigate()
  const info = () => {
    Modal.info({
      title: 'Lời khuyên',
      width: '700px',
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

      onOk() { benefit() },
    })
  }
  const benefit = () => {
    Modal.info({
      title: 'Lợi ích của việc giám sát',
      width: '700px',
      content: (
        <div>
          <p>Tăng năng xuất làm việc và học tập</p>
          <p>Có một sức khỏe tốt</p>
          <p>Nhận được một số lương xu miễm phí để mua các khóa học</p>
        </div>
      ),

      onOk() {
        stateMonitor(true)
        navigate('/monitoring')
      },
    })
  }
  return (
    <div className='itemMonitoring' >
      <div className="itemMonitoringLeft">
        <div className="itemMonitoringTitle">
          Giám sát quá trình làm việc của bạn
        </div>
        {
          selectIsAuthenticated ? (
            <div className="itemMonitoringBtn" onClick={info} >
              Bắt đầu giám sát
            </div>
          ) : (
            <div className="itemMonitoringBtn" >
              Hãy đăng nhập để sử dụng chức năng này
            </div>
          )
        }
      </div>
      <div className="itemMonitoringRight">
        <img src={imgWork} alt="" />
      </div>
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