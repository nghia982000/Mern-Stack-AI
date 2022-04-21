import React from 'react'
import './style.scss'
import { Collapse } from 'antd'
import { PlayCircleOutlined } from '@ant-design/icons'
import imgCourse from '../../Assets/img/desk.png'

const { Panel } = Collapse

const Learning = () => {
  const text = 'Chưa cập nhật'
  return (
    <div className='learing'>
      <div className="learingLeft">
        <div className="learingLeftVideo"style={{ backgroundImage: `url(${imgCourse})` }}>
        </div>
        <div className="learingLeftTitle">
          ReactJS là gì? Tại sao nên học ReactJS?
        </div>
      </div>
      <div className="learingRight">
        <h2>Nội dung khóa học</h2>
        <Collapse accordion>
          <Panel header="Giới thiệu" key="1">
            <div className="itemVideoCourse">
              <span>
                <PlayCircleOutlined style={{ color: '#f9b9a7' }} />
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
  )
}

export default Learning