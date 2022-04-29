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
          Monitor your work performance
        </div>
        <div className="itemMonitoringBtn" onClick={()=>navigate('/monitoring')} >
          Go Monitoring
        </div>
      </div>
      <div className="itemMonitoringRight">
        <img src={imgWork} alt="" />
      </div>
    </div>
  )
}

export default ItemMonitoring