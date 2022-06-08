import React, { useEffect } from 'react'
import {
  Table,
  Popconfirm,
  Space,
  Button
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
          {/* <Button type='primary'>Xem bình luận</Button> */}
          <Popconfirm
            title="Bình luận này sẽ bị xóa vĩnh viễn"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button type='primary'>Xóa</Button>
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