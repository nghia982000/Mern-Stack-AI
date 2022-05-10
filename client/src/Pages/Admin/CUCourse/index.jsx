import React, { useState, useEffect } from 'react'
import {
    Button,
    Form,
    Input,
    notification,
} from 'antd'
import {
    UploadOutlined,
    CloseCircleOutlined
} from "@ant-design/icons"
import { Routes, Route, Link, useNavigate } from "react-router-dom"


import * as actions from '../../../Store/Actions/course'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectDetailCourse,selectCreateState,selectUpdateState } from '../../../Store/Selectors/course'

const { TextArea } = Input

const CUCourse = ({ createCourse,selectDetailCourse,selectUpdateState,selectCreateState,updateCourse }) => {
    const [formModal] = Form.useForm()
    const [avatar, setAvatar] = useState()
    const [fileImg, setFileImg] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview)
        }
    }, [avatar])
    useEffect(() => {
        if (selectCreateState) {
            formModal.resetFields()
        }
        if (selectUpdateState) {
            formModal.setFieldsValue({
                title: selectDetailCourse.title,
                description: selectDetailCourse.description,
                benefit: selectDetailCourse.benefit.join('\n'),
                image: selectDetailCourse.image,
                point:selectDetailCourse.point
            })
        }
    }, [selectUpdateState,selectCreateState])
    const onFinish = (values) => {
        console.log(values)
        if (selectCreateState) {
            createCourse(values)
        }
        if (selectUpdateState) {
            const newCourse = {
                _id: selectDetailCourse._id,
                data: values
            }
            updateCourse(newCourse)
        }
        handleCancel()
    }
    const handleCancel=()=>navigate('/admin/course')
    const getBase64 = file => {
        return new Promise(resolve => {
            let baseURL = ""
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                baseURL = reader.result
                resolve(baseURL)
            }
        })
    }
    const handleFileInputChange = e => {
        const file = e.target.files[0]
        setFileImg(file)
        file.preview = URL.createObjectURL(file)
        setAvatar(file)
        getBase64(e.target.files[0])
            .then(result => {
                formModal.setFieldsValue({
                    image: result
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className='cuCourse'>
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
                    label='Title'
                    name="title"
                    rules={[{ required: true, message: 'Please input your title!' }]}
                >
                    <Input size="large" placeholder="Title" />
                </Form.Item>
                <Form.Item
                    label='Description'
                    name="description"
                    rules={[{ required: true, message: 'Please input your description!' }]}
                >
                    <Input size="large" placeholder="Description" />
                </Form.Item>
                <Form.Item
                    label='Point'
                    name="point"
                    rules={[{ required: true, message: 'Please input your point!' }]}
                >
                    <Input size="large" placeholder="Point" />
                </Form.Item>
                <Form.Item
                    label='Benefit'
                    name="benefit"
                    rules={[{ required: true, message: 'Please input your benefit!' }]}
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Upload">
                    <Input type="file" name="file" id="file" onChange={(e) => handleFileInputChange(e)} hidden />
                    <label htmlFor="file" style={{ border: '1px solid #dddddd', padding: '5px', cursor: 'pointer' }}>
                        <UploadOutlined />
                        Upload Image
                    </label>
                </Form.Item>
                <Form.Item
                    label='Url Image'
                    name="image"
                    rules={[{ required: true, message: 'Please input your url image!' }]}
                >
                    <Input size="large" placeholder="Url image" />
                </Form.Item>
                <Form.Item wrapperCol={{
                    offset: 3,
                    span: 20,
                }}>
                    {avatar && <img src={avatar.preview} alt="" width="100px" />}
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 3,
                        span: 20,
                    }}
                >
                    <Button type="primary" htmlType="submit" >
                        {
                            (selectCreateState)?'Create':"Update"
                        }
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    selectDetailCourse,
    selectCreateState,
    selectUpdateState
})
const mapDispatchToProps = (dispatch) => ({
    createCourse: (payload) => dispatch(actions.createCourse(payload)),
    updateCourse: (payload) => dispatch(actions.updateCourseRequest(payload)),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(CUCourse)