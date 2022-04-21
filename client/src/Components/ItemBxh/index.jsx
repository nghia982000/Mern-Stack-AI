import React from 'react'
import './style.scss'
import imgBxh from '../../Assets/img/manwork.jpg'

const ItemBxh = () => {
    return (
        <div className="itemBxh">
            <div className="itemBxhPicture">
                <div className="itemBxhImg" style={{backgroundImage:`url(${imgBxh})`}}></div>
            </div>
            <div className="itemBxhContent">
                <div className="itemBxhContentName">
                    Nguyễn Văn A
                </div>
                <div className="itemBxhContentPoint">
                    999
                </div>
            </div>
        </div>
    )
}

export default ItemBxh