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
    Spin,
    PageHeader
} from 'antd'
import {
    UploadOutlined,
    CloseCircleOutlined
} from "@ant-design/icons"
import { useNavigate, useParams } from "react-router-dom"
import './style.scss'

import * as actions from '../../../Store/Actions/video'
import * as actionsExercise from '../../../Store/Actions/exercise'
import * as actionsQuizzes from '../../../Store/Actions/quizzes'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectIsLoading, selectVideos, selectDetailVideo } from '../../../Store/Selectors/video'


const { TextArea } = Input

const Lesson = ({
    selectVideos,
    getVideo,
    detailExercise,
    deleteVideo,
    updateState,
    createState,
    detailVideo,
    updateStateQuizzes,
    createStateQuizzes,
    detailQuizzes,
    createStateVideo,
    updateStateVideo
}) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const handleDelete = (id) => {
        deleteVideo(id)
    }
    useEffect(() => {
        getVideo(id)
    }, [])
    const columns = [
        { title: 'Chương', dataIndex: 'lecture', key: '0', ellipsis: true },
        { title: 'Tiêu đề', dataIndex: 'title', key: '2', ellipsis: true },
        {
            title: 'Action',
            dataIndex: '',
            key: '5',
            render: (text, record) => (
                <Space size="middle">
                     <Button type="primary" onClick={() => {
                        // modalUpdate(record._id)
                        console.log(record.role)
                        if (record.role === 'exercise') {
                            detailExercise(record._id)
                            updateState(true)
                            createState(false)
                            navigate(`/admin/exercise/${id}`)
                        }
                        if (record.role === 'quizzes') {
                            detailQuizzes(record._id)
                            updateStateQuizzes(true)
                            createStateQuizzes(false)
                            navigate(`/admin/quizzes/${id}`)
                        }
                        if (record.role === 'video') {
                            detailVideo(record._id)
                            updateStateVideo(true)
                            navigate(`/admin/video/${id}`)
                        }
                    }} >Xem và cập nhật</Button>
                    {
                        (record.role === 'quizzes') ? (
                             <Button type="primary" onClick={() => navigate(`/admin/questions/${record._id}`)}>Câu hỏi</Button>
                        ) : ''
                    }
                    <Popconfirm
                        title="Bài này sẽ bị xóa vĩnh viễn"
                        onConfirm={() => handleDelete(record._id)}
                    >
                         <Button type="primary">Xóa</Button>
                    </Popconfirm>
                </Space >

            )
        },
    ]
    return (
        <div>
            <div className='lesson'>
                <PageHeader
                    onBack={() =>navigate('/admin/course') }
                    title="Quay lại"
                    style={{
                        padding:'10px 0 '
                    }}
                >
                </PageHeader>
                <Space size="middle" style={{paddingBottom:'10px'}}>
                 <Button type="primary" onClick={() => (
                    navigate(`/admin/video/${id}`),
                    createStateVideo(true)
                )}>Tạo bài học bằng video</Button>
                 <Button type="primary" onClick={() => (
                    navigate(`/admin/exercise/${id}`),
                    updateState(false),
                    createState(true)
                )}>Tạo bài học bằng văn bản</Button>
                 <Button type="primary" onClick={() => (
                    navigate(`/admin/quizzes/${id}`),
                    updateStateQuizzes(false),
                    createStateQuizzes(true)
                )}>Tạo bài tập trắc nghiệm</Button>
                </Space>
                <Table
                    columns={columns}
                    dataSource={selectVideos}
                    rowKey={record => record._id}
                    scroll={{
                        y: 400,
                      }}
                />
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
    getVideo: (payload) => dispatch(actions.getVideo(payload)),
    deleteVideo: (payload) => dispatch(actions.deleteVideo(payload)),
    detailVideo: (payload) => dispatch(actions.detailVideo(payload)),
    createStateVideo: (payload) => dispatch(actions.createState(payload)),
    updateStateVideo: (payload) => dispatch(actions.updateState(payload)),
    createState: (payload) => dispatch(actionsExercise.createState(payload)),
    updateState: (payload) => dispatch(actionsExercise.updateState(payload)),
    detailExercise: (payload) => dispatch(actionsExercise.detailExercise(payload)),
    createStateQuizzes: (payload) => dispatch(actionsQuizzes.createState(payload)),
    updateStateQuizzes: (payload) => dispatch(actionsQuizzes.updateState(payload)),
    detailQuizzes: (payload) => dispatch(actionsQuizzes.detailQuizzes(payload)),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Lesson)