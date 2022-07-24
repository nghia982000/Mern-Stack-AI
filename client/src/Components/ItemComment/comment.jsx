import React, { useEffect, useRef, useState } from 'react'
import './styleComment.scss'
import { Collapse, notification,Modal } from 'antd'
import { CloseCircleOutlined,ExclamationCircleOutlined } from '@ant-design/icons'

import * as actions from '../../Store/Actions/comment'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectListCommentAll } from '../../Store/Selectors/comment'
import { selectUser } from '../../Store/Selectors/auth'

const Comment = ({ item, index, LogoAD, reportComment, replyComment, getListReplyComment, selectUser }) => {
    const [actionCom, setActionCom] = useState(false)
    const [listReply, setListReply] = useState(item.reply)
    const [stateComment, setStateComment] = useState(false)
    const content = useRef()
    const onSubmit = async (e) => {
        e.preventDefault()
        const rep = await replyComment({
            id: item._id,
            data: {
                content: content.current.value,
                nameAccount: selectUser.nameAccount
            }
        })
        if (rep.data.success) {
            setListReply(rep.data.reply)
        }
        content.current.value = ''
        setStateComment(false)
        setActionCom(false)
    }
    // const report = async (id) => {
    //     const rep = await reportComment(id)
    //     if (rep.data.success) {
    //         notification.open({
    //             message: `Bạn đã báo cáo thành công`,
    //             icon: <CloseCircleOutlined style={{ color: "red" }} />,
    //         })
    //     }
    // }
    const confirm = (id) => {
        Modal.confirm({
            title: 'Thông báo',
            icon: <ExclamationCircleOutlined />,
            content: 'Bạn có muốn báo cáo bình luận này không?',
            okText: 'Có',
            cancelText: 'Không',
            async onOk() {
                const rep = await reportComment(id)
                if (rep.data.success) {
                    notification.open({
                        message: `Bạn đã báo cáo thành công`,
                        icon: <CloseCircleOutlined style={{ color: "red" }} />,
                    })
                }
            },
            onCancel() {
                console.log('Cancel')
            }

        })
    }
    const formatDatetime = (Datetime) => {
        var date = new Date(Datetime)
        return (`${date.getHours()}:${date.getMinutes()} - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`)
    }
    const [stateListReply, setStateListReply] = useState(false)
    useEffect(() => {
        setListReply(item.reply)
    }, [item])
    return (
        <div className="itemComment" key={index}>
            <div className="itemCommentAvatar">
                <img src={LogoAD} alt="" />
            </div>
            <div className="itemCommentContainer">
                <div className="itemCommentContent">
                    <h3>{item.name}</h3>
                    <p>{item.content}</p>
                </div>
                <div className="itemCommentAction">
                    {
                        formatDatetime(item.createdAt)
                    }
                    <p onClick={() => confirm(item._id)}> - Báo cáo - </p>
                    <p onClick={() => setStateComment(!stateComment)}>Trả lời</p>
                </div>
                {
                    stateComment && (
                        <div className="inpComment">
                            <div className="inpCommentAvatar">
                                <img src={LogoAD} alt="" />
                            </div>
                            <form action="" className='formInp' onSubmit={(e) => onSubmit(e)}>
                                <input type="text" ref={content} onFocus={() => setActionCom(true)} placeholder='Viết bình luận tại đây' />
                                {
                                    actionCom && (
                                        <div className="btnComment">
                                            <span onClick={() => (
                                                setStateComment(false),
                                                setActionCom(false)
                                            )}>Hủy</span>
                                            <button type='submit'>Bình luận</button>
                                        </div>
                                    )
                                }
                            </form>
                        </div>
                    )
                }
                {
                    (listReply.length !== 0) && (
                        <div className="itemListReplyComment">
                            {
                                stateListReply ? (
                                    <p onClick={() => setStateListReply(false)}>Ẩn câu trả lời</p>
                                ) : (
                                    <p onClick={() => setStateListReply(true)}>Xem câu trả lời</p>
                                )

                            }
                            {
                                stateListReply && (
                                    listReply.map((reply, index) => {
                                        return (
                                            <div className="itemComment" key={index} style={{ borderBottom: '1px solid #f2f3f5' }}>
                                                <div className="itemCommentAvatar">
                                                    <img src={LogoAD} alt="" />
                                                </div>
                                                <div className="itemCommentContainer" >
                                                    <div className="itemCommentContent">
                                                        <h3>{reply.nameAccount}</h3>
                                                        <p>{reply.content}</p>
                                                    </div>
                                                </div>
                                            </div>

                                        )
                                    })
                                )
                            }

                        </div>
                    )
                }

            </div>
        </div >
    )
}

const mapStateToProps = createStructuredSelector({
    selectUser
})
const mapDispatchToProps = (dispatch) => ({
    reportComment: (payload) => actions.reportComment(dispatch)(payload),
    replyComment: (payload) => actions.replyComment(dispatch)(payload),
    getListReplyComment: (payload) => actions.getListReplyComment(dispatch)(payload),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Comment)