import React, { useEffect, useRef, useState } from 'react'
import './style.scss'
import LogoAD from '../../Assets/img/logoUser.png'

const ItemComment = ({ videoId, createComment, getComment, selectListComment }) => {
    const [action, setAction] = useState(false)
    const content = useRef()
    const onSubmit = (e) => {
        e.preventDefault()
        createComment({
            content: content.current.value,
            videoId
        })
        content.current.value = ''
        setAction(false)
    }
    useEffect(() => {
        if (videoId) {
            getComment({ videoId })
        }
    }, [videoId])
    return (
        <div className='ItemComment'>
            <h1>Comment</h1>
            <div className="inpComment">
                <div className="inpCommentAvatar">
                    <img src={LogoAD} alt="" />
                </div>
                <form action="" className='formInp' onSubmit={(e) => onSubmit(e)}>
                    <input type="text" ref={content} onFocus={() => setAction(true)} placeholder='Comment here ...' />
                    {
                        action && (
                            <div className="btnComment">
                                <span onClick={() => setAction(false)}>Cancel</span>
                                <button type='submit'>Submit</button>
                            </div>
                        )
                    }
                </form>
            </div>
            <div className="listComment">
                {
                    selectListComment.map((item, index) => {
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
                                        <p>Thích - </p>
                                        <p>Trả lời</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default ItemComment