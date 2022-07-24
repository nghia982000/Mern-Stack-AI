import React, { useEffect } from 'react'
import ItemCourse from '../../Components/ItemCourse'
import './style.scss'
import { Radio, Space } from 'antd'
// import GoogleAds from '../../Components/Adver'

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
        <Radio.Group defaultValue={0} buttonStyle="solid" size="large">
          <Space wrap size="middle">
            <Radio.Button style={{ borderRadius: '10px' }} value={0} key={0} onClick={() => { listCourse() }}>
              Tất cả
            </Radio.Button>
            {
              selectListField.map((item, index) => {
                return (
                  <Radio.Button style={{ borderRadius: '10px' }} value={index + 1} key={index + 1} onClick={() => { selectField({ field: item }) }}>
                    {item}
                  </Radio.Button>
                )
              })
            }
          </Space>
        </Radio.Group>
      </div>
      <div className="allCourse">
        {
          dataCourse.map((item, index) => {
            return (<ItemCourse key={index} type='itemCourse' item={item} />)
          })
        }
      </div>
      {/* <div className="advertisement">
        <GoogleAds slot={9579687915}/>
      </div> */}
      <div style={{height:'300px'}} >
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