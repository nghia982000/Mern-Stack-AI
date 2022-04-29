import React, { useEffect } from 'react'
import ItemCourse from '../../Components/ItemCourse'
import './style.scss'

import * as actions from '../../Store/Actions/course'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectListCourse } from '../../Store/Selectors/course'

const Course = ({ listCourse, dataCourse }) => {
  useEffect(() => {
    listCourse()
  }
    , [])
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
        {
          dataCourse.map((item, index) => {
            return (<ItemCourse key={index} type='itemCourse' item={item} />)
          })
        }
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  dataCourse: selectListCourse,
})
const mapDispatchToProps = (dispatch) => ({
  listCourse: () => dispatch(actions.listCourse())
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Course)