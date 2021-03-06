import React, { useState, useEffect } from 'react'
import {
  Button,
  Form,
  Input,
  notification,
  InputNumber,
  Spin,
  PageHeader
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
  const onFinish = async (values) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('id', id)
    formData.append('lecture', values.lecture)
    formData.append('lesson', values.lesson)
    formData.append('role', 'quizzes')
    if (selectCreateState) {

      const rep = await createQuizzes(formData)
      if (rep.success) {
        setLoading(false)
        handleCancel()
      }
    }
    if (selectUpdateState) {
      const newQuizzes = {
        _id: selectDetailQuizzes._id,
        data: formData
      }

      const rep = await updateQuizzes(newQuizzes)
      if (rep.success) {
        setLoading(false)
        handleCancel()
      }
    }
  }
  const handleCancel = () => navigate(`/admin/lesson/${id}`)
  const [loading, setLoading] = useState(false)
  return (
    <div className='Quizzes'>
      <PageHeader
        onBack={() => navigate(`/admin/lesson/${id}`)}
        title="Quay l???i"
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
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 20 }}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        form={formModal}
      >
        <Form.Item
          label='Ch????ng'
          name="lecture"
          rules={[{ required: true, message: 'Vui l??ng nh???p ch????ng!' }]}
        >
          <InputNumber size="large" placeholder="Ch????ng" />
        </Form.Item>
        <Form.Item
          label='B??i'
          name="lesson"
          rules={[{ required: true, message: 'Vui l??ng nh???p b??i!' }]}
        >
          <InputNumber size="large" placeholder="b??i" />
        </Form.Item>
        <Form.Item
          label='Ti??u ?????'
          name="title"
          rules={[{ required: true, message: 'Vui l??ng nh???p ti??u ?????!' }]}
        >
          <Input size="large" placeholder="Ti??u ?????" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 3,
            span: 20,
          }}
        >
          <Button type="primary" htmlType="submit" >
            N???p
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
  createQuizzes: (payload) => actions.createQuizzes(dispatch)(payload),
  updateQuizzes: (payload) => actions.updateQuizzesRequest(dispatch)(payload)
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Quizzes)