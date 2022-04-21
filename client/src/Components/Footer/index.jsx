import React from 'react'
import './style.scss'
import {
  CopyrightOutlined
} from "@ant-design/icons"

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footerCopyRight">
        <CopyrightOutlined />
        <span>2022 Nam Nghia. All Rights Reserved</span>
      </div>
    </div>
  )
}

export default Footer