import React, { useState, useEffect } from 'react'
import {
    Table,
    Popconfirm,
    Space,
    Modal,
    Button,
    Form,
    Input,
    Upload,
    Spin,
    InputNumber
} from 'antd'
import { useNavigate, useParams } from "react-router-dom"
import {
    UploadOutlined,
    CloseCircleOutlined
} from "@ant-design/icons"
import './style.scss'

import * as actions from '../../../Store/Actions/video'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectIsLoading, selectVideos, selectDetailVideo, selectCreateState, selectUpdateState } from '../../../Store/Selectors/video'

const Video = ({ selectCreateState, selectUpdateState, selectDetailVideo, createVideo, updateVideo }) => {
    const { id } = useParams()
    const [urlVideo, setUrlVideo] = useState(false)
    const navigate = useNavigate()
    const [formModal] = Form.useForm()
    useEffect(() => {
        if (selectCreateState) {
            formModal.resetFields()
        }
        if (selectUpdateState) {
            formModal.setFieldsValue({
                title: selectDetailVideo.title,
                lecture: selectDetailVideo.lecture,
                url: selectDetailVideo.url
            })
        }
    }, [selectUpdateState, selectCreateState])
    const onFinish = (values) => {
        if (selectCreateState) {
            const formData = new FormData()
            formData.append('title', values.title)
            formData.append('id', id)
            formData.append('lecture', values.lecture)
            formData.append('video', values.video.file)
            console.log(formData)
            createVideo(formData)
            handleCancel()
        }
        if (selectUpdateState) {
            const formData = new FormData()
            formData.append('title', values.title)
            formData.append('id', selectDetailVideo._id)
            formData.append('lecture', values.lecture)
            formData.append('role', 'video')
            // console.log(formData)
            if (urlVideo) {
                console.log('ko có url')
                formData.append('video', values.video.file)
            } else {
                formData.append('url', selectDetailVideo.url)
                formData.append('duration', selectDetailVideo.duration)
                console.log('có url')
            }
            updateVideo(formData)
            handleCancel()
        }

    }
    const handleCancel = () => navigate(`/admin/lesson/${id}`)
    return (
        <div className='AdVideo'>
            <Form
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 18 }}
                form={formModal}
                name="formModal"
                onFinish={onFinish}
            >
                <Form.Item name="lecture" label="Lecture" rules={[
                    {
                        required: true,
                        message: 'Please input your lecture!'
                    }
                ]}
                    hasFeedback
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item name="title" label="Title" rules={[
                    {
                        required: true,
                        message: 'Please input your title!'
                    }
                ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>
                {
                    (urlVideo || selectCreateState) && (
                        <Form.Item label="Video" name="video" >
                            <Upload
                                beforeUpload={() => false}
                                maxCount={1}
                            >
                                <Button icon={<UploadOutlined />}>Select File</Button>
                            </Upload>
                        </Form.Item>
                    )
                }
                {
                    selectUpdateState && !urlVideo && (
                        <>
                            <Form.Item
                                wrapperCol={{
                                    offset: 5,
                                    span: 18,
                                }}
                                
                            >

                                {
                                    selectUpdateState && (
                                        <div >
                                            <video className='frameVideo' controls style={{ width: '100%' }} src={selectDetailVideo.url}>
                                            </video>
                                            <Button className='btnCancel' onClick={() => setUrlVideo(true)}>X</Button>
                                        </div>
                                    )
                                }
                            </Form.Item>
                            <Form.Item name="url" label="url"  >
                                <Input disabled/>
                            </Form.Item>
                        </>
                    )
                }
                <Form.Item
                    wrapperCol={{
                        offset: 5,
                        span: 18,
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
    selectDetailVideo,
    selectCreateState,
    selectUpdateState
})

const mapDispatchToProps = (dispatch) => ({
    createVideo: (payload) => dispatch(actions.createVideoRequest(payload)),
    updateVideo: (payload) => dispatch(actions.updateVideoRequest(payload)),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Video)