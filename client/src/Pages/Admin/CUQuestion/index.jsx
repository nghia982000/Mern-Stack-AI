import React, { useState, useEffect } from 'react'
import {
  Button,
  Form,
  Input,
  Select,
  notification,
} from 'antd'
import { useNavigate, useParams } from "react-router-dom"

import * as actions from '../../../Store/Actions/quizzes'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectUpdateState, selectCreateState, selectCreateStateQuestion, selectUpdateStateQuestion } from '../../../Store/Selectors/quizzes'
import { selectDetailQuestion } from '../../../Store/Selectors/quizzes'
const { Option } = Select

const CUQuestion = ({ createQuestion, selectUpdateStateQuestion, selectCreateStateQuestion, selectDetailQuestion, updateQuestion }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formModal] = Form.useForm()
  useEffect(() => {
    if (selectCreateStateQuestion) {
      formModal.resetFields()
    }
    if (selectUpdateStateQuestion) {
      formModal.setFieldsValue({
        question: selectDetailQuestion.question,
        answerA: selectDetailQuestion.answer.A,
        answerB: selectDetailQuestion.answer.B,
        answerC: selectDetailQuestion.answer.C,
        answerD: selectDetailQuestion.answer.D,
        correctAnswer: selectDetailQuestion.correctAnswer,
      })
    }
  }, [selectUpdateStateQuestion, selectCreateStateQuestion])
  const onFinish = (values) => {
    // console.log(values)
    const formData = {
      question: values.question,
      answer: {
        A: values.answerA,
        B: values.answerB,
        C: values.answerC,
        D: values.answerD,
      },
      correctAnswer: values.correctAnswer
    }
    console.log(selectCreateStateQuestion)
    if (selectCreateStateQuestion) {
      createQuestion({
        formData,
        id: id
      })
      handleCancel()
    }
    
    if (selectUpdateStateQuestion) {
      updateQuestion({
        formData,
        id: selectDetailQuestion._id
      })
      handleCancel()
    }
  }
  const handleCancel = () => navigate(`/admin/questions/${id}`)

  return (
    <div className='Question'>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        form={formModal}
      >
        <Form.Item
          label='Question'
          name="question"
          rules={[{ required: true, message: 'Please input your lecture!' }]}
        >
          <Input size="large" placeholder="Content" />
        </Form.Item>
        <Form.Item
          label='Answer A'
          name="answerA"
          rules={[{ required: true, message: 'Please input your title!' }]}
        >
          <Input size="large" placeholder="Content" />
        </Form.Item>
        <Form.Item
          label='Answer B'
          name="answerB"
          rules={[{ required: true, message: 'Please input your title!' }]}
        >
          <Input size="large" placeholder="Content" />
        </Form.Item>
        <Form.Item
          label='Answer C'
          name="answerC"
          rules={[{ required: true, message: 'Please input your title!' }]}
        >
          <Input size="large" placeholder="Content" />
        </Form.Item>
        <Form.Item
          label='Answer D'
          name="answerD"
          rules={[{ required: true, message: 'Please input your title!' }]}
        >
          <Input size="large" placeholder="Content" />
        </Form.Item>
        <Form.Item
          label='Corect answwer'
          name="correctAnswer"
          rules={[{ required: true, message: 'Please input your title!' }]}
        >
          <Select size="large" placeholder="Content" >
            <Option value="A">A</Option>
            <Option value="B">B</Option>
            <Option value="C">C</Option>
            <Option value="D">D</Option>
          </Select>
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
  selectUpdateStateQuestion,
  selectCreateStateQuestion,
  selectDetailQuestion
})
const mapDispatchToProps = (dispatch) => ({
  createQuestion: (payload) => dispatch(actions.createQuestion(payload)),
  updateQuestion: (payload) => dispatch(actions.updateQuestionRequest(payload)),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(CUQuestion)