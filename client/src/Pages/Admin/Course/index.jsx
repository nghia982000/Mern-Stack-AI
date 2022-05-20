import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Table,
  Popconfirm,
  Space
} from 'antd'
import { useNavigate } from "react-router-dom"

import * as actions from '../../../Store/Actions/course'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectListCourse } from '../../../Store/Selectors/course'

const Course = ({ listCourse, dataCourse, deleteCourse, updateState, createState,detailCourse }) => {
  const [file, setFile] = useState()
  const navigate = useNavigate()
  const [response, setResponse] = useState()
  const handleSubmit = () => {
    const formData = new FormData()
    formData.append('photo', file[0])
    console.log(formData)
    axios.post(`http://localhost:5000/course/testUpload`, formData)

  }
  useEffect(() => {
    listCourse()
  }, [])
  const handleDelete = (id) => {
    deleteCourse(id)
  }
  const columns = [
    { title: 'Title', dataIndex: 'title', key: '1', ellipsis: true },
    { title: 'Point', dataIndex: 'point', key: '4', ellipsis: true },
    {
      title: 'Action',
      dataIndex: '',
      key: '5',
      render: (text, record) => (
        <Space size="middle">
          <button onClick={() => (
            detailCourse(record._id),
            updateState(true),
            createState(false),
            navigate('/admin/cuCourse')
          )}>Update</button>
          <button onClick={() => navigate(`/admin/editVideo/${record._id}`)}>Video and exercise</button>
          <Popconfirm
            title="Sinh viên này sẽ bị xóa vĩnh viễn"
            onConfirm={() => handleDelete(record._id)}
          >
            <button>Delete</button>
          </Popconfirm>
        </Space>

      )
    },
  ]
  return (
    <div className='courseAd'>
      <button onClick={() => (
        updateState(false),
        createState(true),
        navigate('/admin/cuCourse')
      )}>CreateUpdate</button>
      <Table
        columns={columns}
        dataSource={dataCourse}
        rowKey={record => record._id}
      />
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  dataCourse: selectListCourse,
})
const mapDispatchToProps = (dispatch) => ({
  listCourse: () => dispatch(actions.listCourse()),
  deleteCourse: (payload) => dispatch(actions.deleteCourse(payload)),
  createState: (payload) => dispatch(actions.createState(payload)),
  updateState: (payload) => dispatch(actions.updateState(payload)),
  detailCourse: (payload) => dispatch(actions.detailCourse(payload)),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Course)