import React, { useRef, useState } from 'react'
import Draggable from 'react-draggable'
import './style.scss'

const ItemDraggable = ({onclose}) => {
    const video =useRef()
    const [zoom, setZoom]=useState('draggable')
    return (
        <>
            <Draggable>
                <div className={zoom}>
                    <div className="draggableWebcam">
                        <video ref={video} className='draggableVideo'></video>
                    </div>
                    <div className="draggableAction">
                        <button>Bắt đầu</button>
                        <button onClick={()=>onclose(false)}>Đóng</button>
                        {
                            (zoom==='draggable')?(
                                <button onClick={()=>setZoom('zoomOut')}>Thu nhỏ</button>
                            ):(
                                <button onClick={()=>setZoom('draggable')}>Phóng to</button>
                            )
                        }
                    </div>
                </div>
            </Draggable>
        </>
    )
}

export default ItemDraggable