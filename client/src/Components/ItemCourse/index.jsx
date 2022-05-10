import React from 'react'
import './style.scss'
import { useNavigate } from 'react-router-dom'

import * as actions from '../../Store/Actions/course'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectBoughtCourse } from '../../Store/Selectors/course'

const ItemCourse = ({ type, item,selectBoughtCourse }) => {
    const navigate = useNavigate()
    const id=item._id
    const bought = selectBoughtCourse.some((item) => {
        return item._id === id
    })
    return (
        <div className={type}>
            <div className="itemCoursePicture" style={{ backgroundImage: `url(${item.image})` }}>
                {
                    (bought) ? (
                        <div className="itemCoursePictureAc" onClick={() => navigate(`/learning/${item._id}`)}>
                            Tiếp tục học
                        </div>
                    ) : (
                        <div className="itemCoursePictureAc" onClick={() => navigate(`/detail/${item._id}`)}>
                            Xem khóa học
                        </div>
                    )
                }
            </div>
            <div className="itemCourseTitle">
                {item.title}
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    selectBoughtCourse
})
const mapDispatchToProps = (dispatch) => ({
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(ItemCourse)