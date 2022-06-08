import React, { useState, useEffect } from 'react'
import {
  Button,
  Form,
  Input,
  Select,
  notification,
  Spin,
  PageHeader
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
  const onFinish = async (values) => {
    setLoading(true)
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
    if (selectCreateStateQuestion) {

      const rep = await createQuestion({
        formData,
        id: id
      })
      if (rep.success) {
        setLoading(false)
        handleCancel()
      }
    }

    if (selectUpdateStateQuestion) {

      const rep = await updateQuestion({
        formData,
        id: selectDetailQuestion._id
      })
      if (rep.success) {
        setLoading(false)
        handleCancel()
      }
    }
  }
  const handleCancel = () => navigate(`/admin/questions/${id}`)
  const [loading, setLoading] = useState(false)
  return (
    <div className='Question'>
      <PageHeader
        onBack={() => navigate(`/admin/questions/${id}`)}
        title="Quay lại"
        style={{
          padding: '10px 0 '
        }}
      >
      </PageHeader>
      {
        loading && (
          <div className="loadingSpin">
            <Spin size='large' />
          </div>
        )
      }
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
          label='Câu hỏi'
          name="question"
          rules={[{ required: true, message: 'Vui lòng nhập câu hỏi!' }]}
        >
          <Input size="large" placeholder="Nội dung" />
        </Form.Item>
        <Form.Item
          label='Câu A'
          name="answerA"
          rules={[{ required: true, message: 'Vui lòng nhập đáp án A!' }]}
        >
          <Input size="large" placeholder="Nội dung" />
        </Form.Item>
        <Form.Item
          label='Câu B'
          name="answerB"
          rules={[{ required: true, message: 'Vui lòng nhập đáp án B!' }]}
        >
          <Input size="large" placeholder="Nội dung" />
        </Form.Item>
        <Form.Item
          label='Câu C'
          name="answerC"
          rules={[{ required: true, message: 'Vui lòng nhập đáp án C!' }]}
        >
          <Input size="large" placeholder="Nội dung" />
        </Form.Item>
        <Form.Item
          label='Câu D'
          name="answerD"
          rules={[{ required: true, message: 'Vui lòng nhập đáp án D!' }]}
        >
          <Input size="large" placeholder="Nội dung" />
        </Form.Item>
        <Form.Item
          label='Đáp án đúng'
          name="correctAnswer"
          rules={[{ required: true, message: 'Vui lòng nhập đáp án đúng!' }]}
        >
          <Select size="large" placeholder="Đáp án" >
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
            Nộp
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
  createQuestion: (payload) => actions.createQuestion(dispatch)(payload),
  updateQuestion: (payload) => actions.updateQuestionRequest(dispatch)(payload)
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(CUQuestion)