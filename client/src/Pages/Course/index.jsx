import React from 'react'
import ItemCourse from '../../Components/ItemCourse'
import './style.scss'

const Course = () => {
  return (
    <div className='course'>
      <div className="catagoryCourse">
        <div className="itemCatagory">
          Lập trình
        </div>
        <div className="itemCatagory">
          Kinh doanh
        </div>
        <div className="itemCatagory">
          Giao tiếp
        </div>
        <div className="itemCatagory">
          Kỹ năng sống
        </div>
        <div className="itemCatagory">
          Chỉnh sửa ảnh, video
        </div>
      </div>
      <div className="allCourse">
          <ItemCourse type='itemCourse'/>
          <ItemCourse type='itemCourse'/>
          <ItemCourse type='itemCourse'/>
          <ItemCourse type='itemCourse'/>
          <ItemCourse type='itemCourse'/>
          <ItemCourse type='itemCourse'/>
          <ItemCourse type='itemCourse'/>
          <ItemCourse type='itemCourse'/>
          <ItemCourse type='itemCourse'/>
          <ItemCourse type='itemCourse'/>
      </div>
    </div>
  )
}

export default Course