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
import {
    TrophyOutlined
} from "@ant-design/icons"

import * as actions from '../../Store/Actions/course'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectListCourse } from '../../Store/Selectors/course'

const Home = ({ listCourse, dataCourse }) => {
    useEffect(() => {
        listCourse()
    }, [])
    const settingsBxh = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        className: 'sliderBxh',
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
    }
    const settingsCourse = {
        infinite: false,
        speed: 500,
        slidesToScroll: 4,
        slidesToShow: 4
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
                    Tất cả khóa học
                </div>
                <div className="homeCourseQuote">
                    Nếu bạn ngủ quên bây giờ, bạn sẽ mơ. Nếu bạn học ngay bây giờ, bạn sẽ sống với ước mơ của mình!
                </div>
                <div className="homeCourseContent">
                    <Slider {...settingsCourse}>
                        {
                            dataCourse.map((item, index) => {
                                return (<ItemCourse key={index} type='itemCourseHome' item={item} />)
                            })
                        }
                    </Slider>

                </div>
            </div>
            {/* <div className="homeBxh">
                <div className="homeTitle">
                    Bảng xếp hạng
                </div>
                <div className="homeBxhContent">
                    <div className="homeBxhLeft">
                        <img src={imgBxh} alt="" />
                    </div>
                    <div className="homeBxhRight">
                        <div className="homeBxhRighttitle">
                            Đặt mục tiêu của bạn và tiếp tục cố gắng cho đến khi bạn đạt được nó
                        </div>
                        <div className="homeBxhRightList">
                            <p> <TrophyOutlined /> Top</p>
                            <Slider {...settingsBxh}>
                                <ItemBxh></ItemBxh>
                                <ItemBxh></ItemBxh>
                                <ItemBxh></ItemBxh>
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
            </div> */}
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    dataCourse: selectListCourse
})
const mapDispatchToProps = (dispatch) => ({
    listCourse: () => dispatch(actions.listCourse())
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Home)