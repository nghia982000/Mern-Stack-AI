import React, { useEffect } from 'react'
import {
  Table,
  Popconfirm,
  Space
} from 'antd'

import * as actions from '../../../Store/Actions/auth'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectListAccount } from '../../../Store/Selectors/auth'

const Account = ({selectListAccount,deleteAccount,getAccount}) => {
  const columns = [
    { title: 'Tên tài khoản', dataIndex: 'username', key: '1', ellipsis: true },
    { title: 'Điểm', dataIndex: 'point', key: '2', ellipsis: true },
    {
      title: 'Thao tác',
      dataIndex: '',
      key: '5',
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="Tài khoản này sẽ bị xóa vĩnh viễn"
            onConfirm={() => handleDelete(record._id)}
          >
            <button>Xóa</button>
          </Popconfirm>
        </Space>

      )
    },
  ]
  useEffect(()=>{
    getAccount()
  },[])
  const handleDelete=(id)=>{
    deleteAccount(id)
  }
  return (
    <div className='AdAccount'>
      <Table
        columns={columns}
        dataSource={selectListAccount}
        rowKey={record => record._id}
      />
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  selectListAccount
})
const mapDispatchToProps = (dispatch) => ({
  getAccount: () => dispatch(actions.getAccount()),
  deleteAccount: (payload) => dispatch(actions.deleteAccount(payload)),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Account)