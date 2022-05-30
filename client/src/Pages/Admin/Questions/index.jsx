import React, { useEffect } from 'react'
import {
  Table,
  Popconfirm,
  Space
} from 'antd'
import { useNavigate, useParams } from "react-router-dom"

import * as actions from '../../../Store/Actions/quizzes'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectGetListQuestions } from '../../../Store/Selectors/quizzes'

const Question = ({ selectGetListQuestions, getListQuestion,createStateQuestion,updateStateQuestion,detailQuestion,deleteQuestion }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const columns = [
    { title: 'Câu hỏi', dataIndex: 'question', key: '1', ellipsis: true },
    { title: 'Đáp án', dataIndex: 'correctAnswer', key: '2', ellipsis: true },
    {
      title: 'Thao tác',
      dataIndex: '',
      key: '5',
      render: (text, record) => (
        <Space size="middle">
          <button onClick={()=>(
             detailQuestion(record._id),
             updateStateQuestion(true),
             createStateQuestion(false),
             navigate(`/admin/cuQuestion/${id}`)
          )}>Cập nhật câu hỏi</button>
          <Popconfirm
            title="Câu hỏi này sẽ bị xóa vĩnh viễn"
            onConfirm={() => handleDelete(record._id)}
          >
            <button>Xóa</button>
          </Popconfirm>
        </Space>

      )
    },
  ]
  useEffect(() => {
    getListQuestion(id)
  }, [])
  const handleDelete = (id) => {
    deleteQuestion(id)
  }
  return (
    <div className='AdQuestion'>
      <button onClick={() => (
        createStateQuestion(true),
        updateStateQuestion(false),
        navigate(`/admin/cuQuestion/${id}`)
      )} >Tạo câu hỏi</button>
      <Table
        columns={columns}
        dataSource={selectGetListQuestions}
        rowKey={record => record._id}
      />
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  selectGetListQuestions
})
const mapDispatchToProps = (dispatch) => ({
  getListQuestion: (payload) => dispatch(actions.getQuestionRequest(payload)),
  createStateQuestion: (payload) => dispatch(actions.createStateQuestion(payload)),
  updateStateQuestion: (payload) => dispatch(actions.updateStateQuestion(payload)),
  detailQuestion: (payload) => dispatch(actions.detailQuestion(payload)),
  deleteQuestion: (payload) => dispatch(actions.deleteQuestion(payload)),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Question)