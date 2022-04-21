import React from 'react'
import './style.scss'
import { Collapse } from 'antd'
import imgCourse from '../../Assets/img/desk.png'
import { CheckOutlined, PlayCircleOutlined } from '@ant-design/icons'

const { Panel } = Collapse

const Detail = () => {
  const text = 'Chưa cập nhật'
  return (
    <div className='detail'>
      <div className="detailLeft">
        <div className="detailLeftTitle">
          Xây Dựng Website với ReactJS
        </div>
        <div className="detailLeftDescription">
          Khóa học ReactJS từ cơ bản tới nâng cao, kết quả của khóa học này là bạn có thể làm hầu hết các dự án thường gặp với ReactJS. Cuối khóa học này bạn sẽ sở hữu một dự án giống Tiktok.com, bạn có thể tự tin đi xin việc khi nắm chắc các kiến thức được chia sẻ trong khóa học này.
        </div>
        <div className="detailLeftBenefit">
          <h3>Bạn sẽ học được gì?</h3>
          <div className="benefitDetail">
            <p><CheckOutlined style={{ color: '#f05123' }} /> Hiểu về khái niệm SPA/MPA</p>
            <p><CheckOutlined style={{ color: '#f05123' }} /> Hiểu cách ReactJS hoạt động</p>
            <p><CheckOutlined style={{ color: '#f05123' }} /> Biết cách tối ưu hiệu năng ứng dụng</p>
            <p><CheckOutlined style={{ color: '#f05123' }} /> Hiểu rõ ràng Redux workflow</p>
          </div>
        </div>
        <div className="detailLeftContent">
          <h3>Nội dung khóa học</h3>
          <Collapse >
            <Panel header="Giới thiệu" key="1">
              <div className="itemVideoCourse">
                <span>
                  <PlayCircleOutlined style={{ color: '#f9b9a7' }}/>
                  1. ReactJS là gì? Tại sao nên học ReactJS?
                </span>
                <span>10:41</span>
              </div>
            </Panel>
            <Panel header="Ôn lại ES6 " key="2">
              <p>{text}</p>
            </Panel>
            <Panel header="React, React-DOM" key="3">
              <p>{text}</p>
            </Panel>
            <Panel header="JSX, Component, Props" key="4">
              <p>{text}</p>
            </Panel>
          </Collapse>
        </div>
      </div>
      <div className="detailRight">
        <div className="detailRightImg" style={{ backgroundImage: `url(${imgCourse})` }}>

        </div>
        <div className="detailRightAction">
          <p>999đ</p>
          <div className="detailRightActionBtn">
            Thêm vào yêu thích
          </div>
          <div className="detailRightActionBtn">
            Mua khóa học
          </div>
        </div>
      </div>

    </div>
  )
}

export default Detail