import React, { useEffect } from 'react'
import ItemCourse from '../../Components/ItemCourse'
import './style.scss'

import * as actions from '../../Store/Actions/course'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectBoughtCourse } from '../../Store/Selectors/course'

const MyCourse = ({selectBoughtCourse }) => {
  return (
    <div className='MyCourse'>
      <div className="myCourseTitle">
        My Course
      </div>
      <div className="allCourse">
        {
          selectBoughtCourse.map((item, index) => {
            return (<ItemCourse key={index} type='itemCourse' item={item} />)
          })
        }
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
export default compose(withConnect)(MyCourse)