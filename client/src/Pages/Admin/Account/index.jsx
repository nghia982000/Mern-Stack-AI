import React, { useEffect, useState } from 'react'
import {
  Table,
  Popconfirm,
  Space,
  Button,
  Modal
} from 'antd'

import * as actions from '../../../Store/Actions/auth'

import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectListAccount, selectDetailAccount } from '../../../Store/Selectors/auth'


const Account = ({ selectListAccount, deleteAccount, getAccount, detailAccount, selectDetailAccount }) => {
  const columns = [
    { title: 'Tên người dùng', dataIndex: 'nameAccount', key: '1', ellipsis: true },
    { title: 'Email', dataIndex: 'email', key: '2', ellipsis: true },
    { title: 'Điểm', dataIndex: 'point', key: '3', ellipsis: true },
    {
      title: 'Thao tác',
      dataIndex: '',
      key: '5',
      render: (text, record) => (
        <Space size="middle">
          <Button type='primary' onClick={() => handleDetail(record._id)}>Xem tài khoản</ Button>
          <Popconfirm
            title="Tài khoản này sẽ bị xóa vĩnh viễn"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button type='primary'>Xóa</ Button>
          </Popconfirm>
        </Space>

      )
    },
  ]
  useEffect(() => {
    getAccount()
   
  }, [])
  const handleDelete = (id) => {
    deleteAccount(id)
  }
  const handleDetail = async (id) => {
    const rep = await detailAccount(id)
    info(rep.detail)
  }
  const info = (detail) => {
    Modal.info({
      title: 'Thông tin tài khoản',
      content: (
        <div>
          <div style={{ display: 'flex', justifyContent:'space-between' }}>
            <h4>Tên hiển thị:</h4>
            <h4>{detail.nameAccount}</h4>
          </div>
          <div style={{ display: 'flex', justifyContent:'space-between'  }}>
            <h4>Tên đăng nhập:</h4>
            <h4>{detail.username}</h4>
          </div>
          <div style={{ display: 'flex', justifyContent:'space-between'  }}>
            <h4>Email:</h4>
            <h4>{detail.email}</h4>
          </div>
          <div style={{ display: 'flex', justifyContent:'space-between'  }}>
            <h4>Điểm:</h4>
            <h4>{detail.point}</h4>
          </div>
        </div>
      ),

      onOk() { },
    })
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
  selectListAccount,
  selectDetailAccount,
  
})
const mapDispatchToProps = (dispatch) => ({
  getAccount: () => dispatch(actions.getAccount()),
  deleteAccount: (payload) => dispatch(actions.deleteAccount(payload)),
  detailAccount: (payload) => actions.detailAccount(dispatch)(payload)
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Account)