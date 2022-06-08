import React, { useEffect, useRef, useState } from 'react'
import './style.scss'
import LogoAD from '../../Assets/img/logoUser.png'
import Comment from './comment'

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
    
    const report=(id)=>{
        console.log(id)
    }
    return (
        <div className='ItemComment'>
            <h1>Bình luận</h1>
            <div className="inpComment">
                <div className="inpCommentAvatar">
                    <img src={LogoAD} alt="" />
                </div>
                <form action="" className='formInp' onSubmit={(e) => onSubmit(e)}>
                    <input type="text" ref={content} onFocus={() => setAction(true)} placeholder='Viết bình luận tại đây' />
                    {
                        action && (
                            <div className="btnComment">
                                <span onClick={() => setAction(false)}>Hủy</span>
                                <button type='submit'>Bình luận</button>
                            </div>
                        )
                    }
                </form>
            </div>
            <div className="listComment">
                {
                    selectListComment.map((item, index) => {
                        return (
                            <Comment item={item} key={index} LogoAD={LogoAD}/>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default ItemComment