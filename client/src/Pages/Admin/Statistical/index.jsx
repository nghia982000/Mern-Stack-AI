import React, { useEffect } from 'react'
import { Col, Row, Statistic } from 'antd'
import { UserOutlined,ReadOutlined,BookOutlined,PlayCircleOutlined,FileDoneOutlined,FileOutlined } from '@ant-design/icons'

import * as actions from '../../../Store/Actions/course'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectStatistical } from '../../../Store/Selectors/course'

const Statistical = ({selectStatistical,statistical}) => {
  useEffect(()=>{
    statistical()
  },[])
  return (
    <div>
      <Row gutter={16}>
        <Col span={12} style={{backgroundColor:'#fafafa',border:'1px dashed #e9e9e9',padding:'30px'}}>
          <Statistic title="Tổng số tài khoản" value={selectStatistical.user} prefix={<UserOutlined />} />
        </Col>
        <Col span={12} style={{backgroundColor:'#fafafa',border:'1px dashed #e9e9e9',padding:'30px'}}>
          <Statistic title="Tổng số khóa học" value={selectStatistical.course} prefix={<ReadOutlined />} />
        </Col>
        <Col span={12}style={{backgroundColor:'#fafafa',border:'1px dashed #e9e9e9',padding:'30px'}}>
          <Statistic title="Tổng số học viên" value={selectStatistical.student} prefix={<BookOutlined />} />
        </Col>
        <Col span={12}style={{backgroundColor:'#fafafa',border:'1px dashed #e9e9e9',padding:'30px'}}>
          <Statistic title="Tổng số bài giảng video" value={selectStatistical.video} prefix={<PlayCircleOutlined />} />
        </Col>
        <Col span={12}style={{backgroundColor:'#fafafa',border:'1px dashed #e9e9e9',padding:'30px'}}>
          <Statistic title="Tổng số bài giảng văn bản " value={selectStatistical.text} prefix={<FileOutlined />} />
        </Col>
        <Col span={12}style={{backgroundColor:'#fafafa',border:'1px dashed #e9e9e9',padding:'30px'}}>
          <Statistic title="Tổng số bài tập trắc nghiệm" value={selectStatistical.quizzes} prefix={<FileDoneOutlined />} />
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  selectStatistical
})
const mapDispatchToProps = (dispatch) => ({
  statistical: () => dispatch(actions.statistical())
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Statistical)