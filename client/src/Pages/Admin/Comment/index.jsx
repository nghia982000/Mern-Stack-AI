import React, { useEffect } from 'react'
import {
  Table,
  Popconfirm,
  Space,
  Button,
  Modal
} from 'antd'

import * as actions from '../../../Store/Actions/comment'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectListCommentAll } from '../../../Store/Selectors/comment'

const Comment = ({ selectListCommentAll, getListComment, deleteComment, getCmt }) => {
  const columns = [
    { title: 'Tên tài khoản', dataIndex: 'name', key: '1', ellipsis: true },
    { title: 'Nội dung', dataIndex: 'content', key: '2', ellipsis: true },
    {
      title: 'Thao tác',
      dataIndex: '',
      key: '5',
      render: (text, record) => (
        <Space size="middle">
          <Button type='primary' onClick={() => handleDetail(record._id)}>Xem bình luận</Button>
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
  useEffect(() => {
    getListComment()
  }, [])
  const handleDelete = (id) => {
    deleteComment(id)
  }
  const handleDetail = async (id) => {
    const rep = await getCmt(id)
    info(rep.data)
  }
  const info = (data) => {
    Modal.info({
      title: 'Nội dung bình luận',
      content: (
        <div>
          <h2>{data.content}</h2>
          {
            data.reply.length !== 0 && (
              <>
                <h3>Câu trả lời</h3>
                <div style={{ maxHeight: '130px', overflow: 'auto' }}>
                  {
                    data.reply.map((item, index) => {
                      return (
                        <div key={index}>
                          <h4>{item.nameAccount}</h4>
                          <p style={{ paddingLeft: '20px' }}>{item.content}</p>
                        </div>
                      )
                    })
                  }
                </div>
              </>

            )
          }
        </div>
      ),

      onOk() { },
    })
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
  getCmt: (payload) => actions.getCmt(dispatch)(payload)
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Comment)