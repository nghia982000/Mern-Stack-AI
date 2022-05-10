import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Table,
    Popconfirm,
    Space,
    Modal,
    Button,
    Form,
    Input,
    Upload,
    Spin
} from 'antd'
import {
    UploadOutlined,
    CloseCircleOutlined
} from "@ant-design/icons"
import { useNavigate, useParams } from "react-router-dom"
import './style.scss'

import * as actions from '../../../Store/Actions/video'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectIsLoading, selectVideos, selectDetailVideo } from '../../../Store/Selectors/video'


const { TextArea } = Input

const EditVideo = ({ createVideo, selectIsLoading, selectVideos, getVideo, deleteVideo, selectDetailVideo, detailVideo,updateVideo }) => {
    const { id } = useParams()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [statusForm, setStatusForm] = useState(true)
    const [urlVideo, setUrlVideo] = useState(false)
    const navigate = useNavigate()
    const [formModal] = Form.useForm()
    const onFinish = (values) => {
        if(!statusForm){
            const formData = new FormData()
            formData.append('title', values.title)
            formData.append('id', id)
            formData.append('lecture', values.lecture)
            formData.append('video', values.video.file)
            console.log(formData)
            createVideo(formData)
        }
        if(statusForm){
            const formData = new FormData()
            formData.append('title', values.title)
            formData.append('id', selectDetailVideo._id)
            formData.append('lecture', values.lecture)
            // console.log(formData)
            if(urlVideo){
                console.log('ko có url')
                formData.append('video', values.video.file)
            }else{
                formData.append('url', selectDetailVideo.url)
                formData.append('duration', selectDetailVideo.duration)
                console.log('có url')
            }
            updateVideo(formData)
        }

    }
    const handleDelete = (id) => {
        deleteVideo(id)
    }
    useEffect(() => {
        console.log(selectIsLoading)
        if (selectIsLoading) {
            setIsModalVisible(false)
        }
    }, [selectIsLoading])
    useEffect(() => {
        getVideo(id)
    }, [])
    const showModal = () => {
        setIsModalVisible(true)
    }
    const handleCancel = () => {
        setIsModalVisible(false)
        setUrlVideo(false)
    }
    const modalUpdate = (id) => {
        detailVideo(id)
        formModal.setFieldsValue({
            title: selectDetailVideo.title,
            lecture: selectDetailVideo.lecture,
            url: selectDetailVideo.url
        })
        showModal()
        setStatusForm(true)
    }
    const modalCreate = () => {
        setStatusForm(false)
        formModal.resetFields()
        showModal()
    }
    const columns = [
        { title: 'Lecture', dataIndex: 'lecture', key: '0', ellipsis: true },
        { title: 'Title', dataIndex: 'title', key: '1', ellipsis: true },
        { title: 'Url', dataIndex: 'url', key: '2', ellipsis: true },
        {
            title: 'Action',
            dataIndex: '',
            key: '5',
            render: (text, record) => (
                <Space size="middle">
                    <button onClick={() => modalUpdate(record._id)} >Update</button>
                    <Popconfirm
                        title="Sinh viên này sẽ bị xóa vĩnh viễn"
                        onConfirm={() => handleDelete(record._id)}
                    >
                        <button>Delete</button>
                    </Popconfirm>
                </Space>

            )
        },
    ]
    return (
        <div>
            <div className='editVideo'>
                <button onClick={() => modalCreate()}>Create video</button>
                <Table
                    columns={columns}
                    dataSource={selectVideos}
                    rowKey={record => record._id}
                />
                <Modal
                    title="Create"
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={
                        <Button type="primary" htmlType="submit" form="formModal">
                            Save
                        </Button>}>
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
                            <Input />
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
                            (urlVideo||!statusForm) && (
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
                           statusForm && !urlVideo && (
                                <>
                                    <Form.Item
                                        wrapperCol={{
                                            offset: 3,
                                            span: 20,
                                        }}
                                    >

                                        {
                                            statusForm && (<video className='frameVideo' controls style={{ width: '300px' }} src={selectDetailVideo.url}>
                                            </video>)
                                        }
                                        <Button className='btnCancel' onClick={() => setUrlVideo(true)}>X</Button>
                                    </Form.Item>
                                    <Form.Item name="url" label="url" >
                                        <Input />
                                    </Form.Item>
                                </>
                            )
                        }
                    </Form>
                    {!selectIsLoading && (
                        <div className="loading">
                            <Spin size="large" />
                        </div>
                    )
                    }
                </Modal>

            </div>

        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    selectIsLoading,
    selectVideos,
    selectDetailVideo
})
const mapDispatchToProps = (dispatch) => ({
    createVideo: (payload) => dispatch(actions.createVideoRequest(payload)),
    updateVideo: (payload) => dispatch(actions.updateVideoRequest(payload)),
    getVideo: (payload) => dispatch(actions.getVideo(payload)),
    deleteVideo: (payload) => dispatch(actions.deleteVideo(payload)),
    detailVideo: (payload) => dispatch(actions.detailVideo(payload)),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(EditVideo)