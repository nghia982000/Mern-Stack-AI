import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css"
import {
  Button,
  Form,
  Input,
  notification,
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
      })
      setData({ ...data, content: selectDetailExercise.content })
    }
  }, [selectUpdateState, selectCreateState])
  const onFinish = (values) => {
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('id', id)
    formData.append('lecture', values.lecture)
    formData.append('role', 'exercise')
    formData.append('content', data.content)
    if (selectCreateState) {
      createExercise(formData)
    }
    if (selectUpdateState) {
      const newExercise = {
        _id: selectDetailExercise._id,
        data: formData
      }
      updateExercise(newExercise)
      handleCancel()
    }
  }
  const handleCancel = () => navigate(`/admin/editVideo/${id}`)
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
  // const handleProcedureContentChange = (content, delta, source, editor) => {
  //   setData({ ...data, content: content })
  // }
  return (
    <div className='Exercire'>
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
          <Input size="large" placeholder="Lecture" />
        </Form.Item>
        <Form.Item
          label='Title'
          name="title"
          rules={[{ required: true, message: 'Please input your title!' }]}
        >
          <Input size="large" placeholder="Title" />
        </Form.Item>
        <Form.Item
          label='Content'
        >
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            placeholder='Enter...'
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
  selectDetailExercise
})
const mapDispatchToProps = (dispatch) => ({
  createExercise: (payload) => dispatch(actions.createExercise(payload)),
  updateExercise: (payload) => dispatch(actions.updateExerciseRequest(payload)),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Exercise)