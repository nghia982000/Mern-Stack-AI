import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css"
import {
  Button,
  Form,
  Input,
  InputNumber,
  notification,
  Spin,
  PageHeader
} from 'antd'
import { useNavigate, useParams } from "react-router-dom"

import * as actions from '../../../Store/Actions/exercise'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectUpdateState, selectCreateState } from '../../../Store/Selectors/exercise'
import { selectDetailExercise } from '../../../Store/Selectors/video'

const Exercise = ({ createExercise, selectUpdateState, selectCreateState, selectDetailExercise, updateExercise }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formModal] = Form.useForm()
  const [data, setData] = useState({
    'content': ''
  })
  const onSubmit = () => {
    createExercise(data)
  }
  useEffect(() => {
    console.log(selectDetailExercise)
    if (selectCreateState) {
      formModal.resetFields()
    }
    if (selectUpdateState) {
      formModal.setFieldsValue({
        title: selectDetailExercise.title,
        lecture: selectDetailExercise.lecture,
        lesson:selectDetailExercise.lesson
      })
      setData({ ...data, content: selectDetailExercise.content })
    }
  }, [selectUpdateState, selectCreateState])
  const onFinish = async (values) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('id', id)
    formData.append('lecture', values.lecture)
    formData.append('lesson', values.lesson)
    formData.append('role', 'exercise')
    formData.append('content', data.content)
    if (selectCreateState) {
      const rep = await createExercise(formData)
      if (rep.success) {
        setLoading(false)
        handleCancel()
      }
    }
    if (selectUpdateState) {
      const newExercise = {
        _id: selectDetailExercise._id,
        data: formData
      }
      const rep = await updateExercise(newExercise)
      if (rep.success) {
        setLoading(false)
        handleCancel()
      }
    }
  }
  const handleCancel = () => navigate(`/admin/lesson/${id}`)
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"]
    ]
  }
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image"
  ]
  const handleProcedureContentChange = (value) => {
    setData({ ...data, content: value })
  }
  const [loading, setLoading] = useState(false)
  return (
    <div className='Exercire'>
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
          label='N???i dung'
        >
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            placeholder='Nh???p...'
            value={data.content}
            onChange={handleProcedureContentChange}
          >
          </ReactQuill>
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
  selectDetailExercise
})
const mapDispatchToProps = (dispatch) => ({
  createExercise: (payload) => actions.createExercise(dispatch)(payload),
  updateExercise: (payload) => actions.updateExerciseRequest(dispatch)(payload)
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Exercise)