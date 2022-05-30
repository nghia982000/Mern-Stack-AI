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
        { title: 'Lecture', dataIndex: 'lecture', key: '0', ellipsis: true },
        { title: 'Title', dataIndex: 'title', key: '1', ellipsis: true },
        {
            title: 'Action',
            dataIndex: '',
            key: '5',
            render: (text, record) => (
                <Space size="middle">
                    <button onClick={() => {
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
                    }} >Cập nhật</button>
                    {
                        (record.role === 'quizzes')?(
                            <button onClick={()=> navigate(`/admin/questions/${record._id}`)}>Câu hỏi</button>
                        ):''
                    }
                    <Popconfirm
                        title="Sinh viên này sẽ bị xóa vĩnh viễn"
                        onConfirm={() => handleDelete(record._id)}
                    >
                        <button>Xóa</button>
                    </Popconfirm>
                </Space >

            )
        },
    ]
    return (
        <div>
            <div className='lesson'>
                <button onClick={() => (
                    navigate(`/admin/video/${id}`),
                    createStateVideo(true)
                )}>Tạo bài học bằng video</button>
                <button onClick={() => (
                    navigate(`/admin/exercise/${id}`),
                    updateState(false),
                    createState(true)
                )}>Tạo bài học bằng văn bản</button>
                <button onClick={() => (
                    navigate(`/admin/quizzes/${id}`),
                    updateStateQuizzes(false),
                    createStateQuizzes(true)
                )}>Tạo bài tập trắc nghiệm</button>
                <Table
                    columns={columns}
                    dataSource={selectVideos}
                    rowKey={record => record._id}
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