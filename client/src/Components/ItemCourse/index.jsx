import React from 'react'
import './style.scss'
import { useNavigate } from 'react-router-dom'

const ItemCourse = ({type,item}) => {
    const navigate=useNavigate()
    return (
        <div className={type}>
            <div className="itemCoursePicture"style={{backgroundImage:`url(${item.image})`}}>
                <div className="itemCoursePictureAc" onClick={()=>navigate(`/detail/${item._id}`)}>
                    Xem khóa học
                </div>
            </div>
            <div className="itemCourseTitle">
                {item.title}
            </div>
        </div>
    )
}

export default ItemCourse