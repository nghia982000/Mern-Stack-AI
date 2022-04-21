import React from 'react'
import './style.scss'
import Logo from '../../Assets/img/logoWeb.png'
import LogoAD from '../../Assets/img/logoAD.png'
import {
  SearchOutlined
} from "@ant-design/icons"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className='header'>
      <div className="headerLeft">
        <div className="headerLogo">
          <img src={Logo} alt="" />
        </div>
        <span className='headerName'>N</span>
        <div className="headerSearch">
          <div className="headerSearchLogo">
            <SearchOutlined style={{fontSize:'20px'}}/>
          </div>
          <input type="text" placeholder='Search...' >
          </input>
        </div>
      </div>
      <div className="headerRight">
        <div className="headerMenu">
          <Link to="/">
            Home
          </Link>
          <Link to="/monitoring">
            Monitoring
          </Link>
          <Link to="/course">
            Course
          </Link>
        </div>
        <div className="headerUser">
          <div className="headerUserLogo">
            <img src={LogoAD} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header