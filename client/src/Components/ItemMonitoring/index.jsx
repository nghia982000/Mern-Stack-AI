import React from 'react'
import './style.scss'
import { useNavigate } from "react-router-dom"
import imgWork from '../../Assets/img/Online games addiction Customizable Cartoon Illustrations _ Bro Style.png'

const ItemMonitoring = () => {
  const navigate = useNavigate()
  return (
    <div className='itemMonitoring' >
      <div className="itemMonitoringLeft">
        <div className="itemMonitoringTitle">
          Giám sát quá trình làm việc của bạn
        </div>
        <div className="itemMonitoringBtn" onClick={()=>navigate('/monitoring')} >
          Bắt đầu giám sát
        </div>
      </div>
      <div className="itemMonitoringRight">
        <img src={imgWork} alt="" />
      </div>
    </div>
  )
}

export default ItemMonitoring