import React, { useEffect, useRef, useState } from 'react'
import './style.scss'
import Webcam from 'react-webcam'
import ItemBxh from '../../Components/ItemBxh'
import ItemMonitoring from '../../Components/ItemMonitoring'
import ItemCourse from '../../Components/ItemCourse'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import imgBxh from '../../Assets/img/bxh.jpg'

import * as actions from '../../Store/Actions/course'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectListCourse } from '../../Store/Selectors/course'

const Home = ({listCourse,dataCourse}) => {
    useEffect(()=>{
        listCourse()
    }
    ,[])
    const settingsBxh = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        vertical: true,
        verticalSwiping: true,
        speed: 500,
    }
    const settingsCourse = {
        infinite: false,
        speed: 500,
        slidesToScroll: 3,
        slidesToShow: 3
    }
    return (
        <div className='home'>
            <div className="homeMonitoring">
                <div className="homeMonitoringContent">
                    <ItemMonitoring />
                </div>
            </div>
            <div className="homeCourse">
                <div className="homeTitle">
                    All course
                </div>
                <div className="homeCourseQuote">
                    If you fall asleep now, you will dream. If you study now, you will live your dream.
                </div>
                <div className="homeCourseContent">
                    <Slider {...settingsCourse}>
                        {
                            dataCourse.map((item,index)=>{
                                return (<ItemCourse key ={index} type='itemCourseHome' item={item} />)
                            })
                        }
                    </Slider>

                </div>
            </div>
            <div className="homeBxh">
                <div className="homeTitle">
                    BXH
                </div>
                <div className="homeBxhContent">
                    <div className="homeBxhLeft">
                        <img src={imgBxh} alt="" />
                    </div>
                    <div className="homeBxhRight">
                        <Slider {...settingsBxh} style={{ height: '100%' }}>
                            <ItemBxh></ItemBxh>
                            <ItemBxh></ItemBxh>
                            <ItemBxh></ItemBxh>
                            <ItemBxh></ItemBxh>
                            <ItemBxh></ItemBxh>
                            <ItemBxh></ItemBxh>
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    dataCourse: selectListCourse,
})
const mapDispatchToProps = (dispatch) => ({
    listCourse: () => dispatch(actions.listCourse())
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Home)