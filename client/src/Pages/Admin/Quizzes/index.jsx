import React, { useState, useEffect } from 'react'
import {
  Button,
  Form,
  Input,
  notification,
  InputNumber
} from 'antd'
import { useNavigate, useParams } from "react-router-dom"

import * as actions from '../../../Store/Actions/quizzes'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectUpdateState, selectCreateState } from '../../../Store/Selectors/quizzes'
import { selectDetailQuizzes } from '../../../Store/Selectors/video'

const Quizzes = ({ createQuizzes, selectUpdateState, selectCreateState, selectDetailQuizzes, updateQuizzes }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formModal] = Form.useForm()
  useEffect(() => {
    console.log(selectDetailQuizzes)
    if (selectCreateState) {
      formModal.resetFields()
    }
    if (selectUpdateState) {
      formModal.setFieldsValue({
        title: selectDetailQuizzes.title,
        lecture: selectDetailQuizzes.lecture,
      })
    }
  }, [selectUpdateState, selectCreateState])
  const onFinish = (values) => {
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('id', id)
    formData.append('lecture', values.lecture)
    formData.append('role', 'quizzes')
    if (selectCreateState) {
      createQuizzes(formData)
      handleCancel()
    }
    if (selectUpdateState) {
      const newQuizzes = {
        _id: selectDetailQuizzes._id,
        data: formData
      }
      updateQuizzes(newQuizzes)
      handleCancel()
    }
  }
  const handleCancel = () => navigate(`/admin/lesson/${id}`)

  return (
    <div className='Quizzes'>
      <Form
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 20 }}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        form={formModal}
      >
        <Form.Item
          label='Lecture'
          name="lecture"
          rules={[{ required: true, message: 'Please input your lecture!' }]}
        >
          <InputNumber size="large" placeholder="Lecture" />
        </Form.Item>
        <Form.Item
          label='Title'
          name="title"
          rules={[{ required: true, message: 'Please input your title!' }]}
        >
          <Input size="large" placeholder="Title" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 3,
            span: 20,
          }}
        >
          <Button type="primary" htmlType="submit" >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}


const mapStateToProps = createStructuredSelector({
  selectUpdateState,
  selectCreateState,
  selectDetailQuizzes
})
const mapDispatchToProps = (dispatch) => ({
  createQuizzes: (payload) => dispatch(actions.createQuizzes(payload)),
  updateQuizzes: (payload) => dispatch(actions.updateQuizzesRequest(payload)),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Quizzes)