import React, { useEffect } from 'react'
import ItemCourse from '../../Components/ItemCourse'
import './style.scss'

import * as actions from '../../Store/Actions/course'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectListCourse, selectListField } from '../../Store/Selectors/course'

const Course = ({ listCourse, dataCourse, selectListField, selectField }) => {
  useEffect(() => {
    listCourse()
  }, [])
  return (
    <div className='course'>
      <div className="catagoryCourse">
        <div className="itemCatagory" onClick={()=>{listCourse()}}>
          Tất cả
        </div>
        {
          selectListField.map((item, index) => {
            return (
              <div className="itemCatagory" key={index} onClick={()=>{selectField({field:item})}}>
                {item}
              </div>
            )
          })
        }
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
  selectListField
})
const mapDispatchToProps = (dispatch) => ({
  listCourse: () => dispatch(actions.listCourse()),
  selectField: (payload) => dispatch(actions.selectField(payload)),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Course)