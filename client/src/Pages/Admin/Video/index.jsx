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
    InputNumber,
    PageHeader
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
    const onFinish = async(values) => {
        setLoading(true)
        if (selectCreateState) {
            const formData = new FormData()
            formData.append('title', values.title)
            formData.append('id', id)
            formData.append('lecture', values.lecture)
            formData.append('video', values.video.file)
            formData.append('role', 'video')
            console.log(formData)
            const rep=await createVideo(formData)
            if(rep.success){
                setLoading(false)
                handleCancel()
            }
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
                formData.append('public_id', selectDetailVideo.public_id)
                console.log('có url')
            }
            const rep=await updateVideo(formData)
            if(rep.success){
                setLoading(false)
                handleCancel()
            }
        }

    }
    const handleCancel = () => navigate(`/admin/lesson/${id}`)
    const [loading, setLoading] = useState(false)
    return (
        <div className='AdVideo'>
            <PageHeader
                    onBack={() =>navigate(`/admin/lesson/${id}`) }
                    title="Quay lại"
                    style={{
                        padding:'10px 0 '
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
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 18 }}
                form={formModal}
                name="formModal"
                onFinish={onFinish}
            >
                <Form.Item name="lecture" label="Chương" rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập chương!'
                    }
                ]}
                    hasFeedback
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item name="title" label="Tiêu đề" rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập tiêu đề!'
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
                        Nộp
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
    createVideo: (payload) => actions.createVideoRequest(dispatch)(payload),
    updateVideo: (payload) => actions.updateVideoRequest(dispatch)(payload)
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Video)