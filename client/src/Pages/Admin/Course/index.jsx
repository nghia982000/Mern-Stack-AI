import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Table,
  Popconfirm,
  Space,
  Button,
  Radio,
  Select,
  Input
} from 'antd'
import { useNavigate } from "react-router-dom"

import * as actions from '../../../Store/Actions/course'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectListCourse, selectListField } from '../../../Store/Selectors/course'
const { Option } = Select
const { Search } = Input

const Course = ({ listCourse, dataCourse, deleteCourse, updateState, createState, detailCourse, selectListField, selectField, searchCourse }) => {
  const navigate = useNavigate()
  useEffect(() => {
    listCourse()
  }, [])
  const handleDelete = (id) => {
    deleteCourse(id)
  }
  const [page, setPage] = useState(1)
  const handleTableChange = (pagination) => {
    setPage(pagination.current)
}
  const columns = [
    {
      title: 'STT',
      dataIndex: '',
      key: '0',
      width:'100px',
      render:(value, item, index) => (page - 1) * 10 + index + 1
    },
    { title: 'Tiêu đề', dataIndex: 'title', key: '1', ellipsis: true },
    { title: 'Điểm', dataIndex: 'point', key: '2',width:'100px'},
    {
      title: 'Số học viên',
      dataIndex: '',
      key: '3',
      render: (text, record) => (
        <div>
        {record.course.length}
        </div>

      ),
      width:'150px'
    },
    {
      title: 'Thao tác',
      dataIndex: '',
      key: '4',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => (
            detailCourse(record._id),
            updateState(true),
            createState(false),
            navigate('/admin/cuCourse')
          )}>Xem và cập nhật</ Button>
          <Button type="primary" onClick={() => navigate(`/admin/lesson/${record._id}`)}>Bài giảng</ Button>
          <Popconfirm
            title="Khóa học này sẽ bị xóa vĩnh viễn"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button type="primary">Xóa</ Button>
          </Popconfirm>
        </Space>

      )
    },
  ]
  const onSearch = (value) => searchCourse({ item: value })
  const handleField = (value) => {
    if (value === 'All') {
      listCourse()
      return
    }
    selectField({ field: value })
  }

  return (
    <div className='courseAd'>
      <Space >
        <Search style={{
          width: 350,
        }}
          placeholder="Tìm kiếm khóa học" onSearch={onSearch} enterButton />
        <Select style={{
          width: 120,
        }} size="middle" defaultValue="All" placeholder="Content" onChange={handleField} >
          <Option value="All">Tất cả</Option>
          {
            selectListField.map((item, index) => {
              return (
                <Option key={index} value={item}>{item}</Option>
              )
            })
          }
        </Select>
        <Button type="primary" onClick={() => (
          updateState(false),
          createState(true),
          navigate('/admin/cuCourse')
        )}>Tạo khóa học mới</ Button>
      </Space>
      <Table
        columns={columns}
        dataSource={dataCourse}
        rowKey={record => record._id}
        style={{ paddingTop: '10px' }}
        onChange={handleTableChange}
        scroll={{
          y: 400,
        }}
      />
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  dataCourse: selectListCourse,
  selectListField
})
const mapDispatchToProps = (dispatch) => ({
  listCourse: () => dispatch(actions.listCourse()),
  deleteCourse: (payload) => dispatch(actions.deleteCourse(payload)),
  createState: (payload) => dispatch(actions.createState(payload)),
  updateState: (payload) => dispatch(actions.updateState(payload)),
  detailCourse: (payload) => dispatch(actions.detailCourse(payload)),
  selectField: (payload) => dispatch(actions.selectField(payload)),
  searchCourse: (payload) => dispatch(actions.searchCourse(payload))
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Course)