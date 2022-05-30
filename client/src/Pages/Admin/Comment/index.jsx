import React, { useEffect } from 'react'
import {
  Table,
  Popconfirm,
  Space
} from 'antd'

import * as actions from '../../../Store/Actions/comment'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectListCommentAll } from '../../../Store/Selectors/comment'

const Comment = ({selectListCommentAll,getListComment,deleteComment}) => {
  const columns = [
    { title: 'Tên tài khoản', dataIndex: 'name', key: '1', ellipsis: true },
    { title: 'Nội dung', dataIndex: 'content', key: '2', ellipsis: true },
    {
      title: 'Thao tác',
      dataIndex: '',
      key: '5',
      render: (text, record) => (
        <Space size="middle">
          <button>Xem bình luận</button>
          <Popconfirm
            title="Bình luận này sẽ bị xóa vĩnh viễn"
            onConfirm={() => handleDelete(record._id)}
          >
            <button>Xóa</button>
          </Popconfirm>
        </Space>

      )
    },
  ]
  useEffect(()=>{
    getListComment()
  },[])
  const handleDelete=(id)=>{
    deleteComment(id)
  }
  return (
    <div className='AdComment'>
      <Table
        columns={columns}
        dataSource={selectListCommentAll}
        rowKey={record => record._id}
      />
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  selectListCommentAll
})
const mapDispatchToProps = (dispatch) => ({
  getListComment: () => dispatch(actions.getListComment()),
  deleteComment: (payload) => dispatch(actions.deleteComment(payload)),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Comment)