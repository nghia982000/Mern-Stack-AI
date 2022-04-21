import React from 'react'
import './style.scss'
import imgCourse from '../../Assets/img/desk.png'

const ItemCourse = ({type}) => {
    return (
        <div className={type}>
            <div className="itemCoursePicture"style={{backgroundImage:`url(${imgCourse})`}}>
                <div className="itemCoursePictureAc">
                    Xem khóa học
                </div>
            </div>
            <div className="itemCourseTitle">
                React JS cơ bản
            </div>
        </div>
    )
}

export default ItemCourse