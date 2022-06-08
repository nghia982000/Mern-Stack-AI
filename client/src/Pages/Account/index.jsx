import React, { useEffect } from 'react'
import './style.scss'
import LogoAD from '../../Assets/img/logoUser.png'
import background from '../../Assets/img/backgroundAc.png'
import imgBxh from '../../Assets/img/manwork.jpg'
import {
    FormOutlined,
    FundViewOutlined
} from "@ant-design/icons"

import * as actions from '../../Store/Actions/course'
import * as actionsHistory from '../../Store/Actions/history'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectBoughtCourse } from '../../Store/Selectors/course'
import { selectUser } from '../../Store/Selectors/auth'
import { selectListAcctive } from '../../Store/Selectors/history'

const Account = ({ selectBoughtCourse, selectUser, getListAcctive, selectListAcctive }) => {
    useEffect(() => {
        getListAcctive()

    }, [])
    console.log(selectListAcctive)
    const formatDatetime = (Datetime) => {
        var date = new Date(Datetime)
        return (`${date.getHours()}:${date.getMinutes()} - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`)
    }
    return (
        <div className='Account'>
            <div className="accountBackground">
                <img src={background} alt="" />
            </div>
            <div className="accountProfile">
                <div className="accountProfileLogo">
                    <img src={LogoAD} alt="" />
                </div>
                <div className="accountProfileName">
                    {selectUser.nameAccount}
                </div>
            </div>
            <div className="accountContent">
                <div className="accountRecent">
                    <div className="accountRecentTitle">
                        Hoạt động gần đây
                    </div>
                    <div className="accountRecentContent">
                        {
                            selectListAcctive.length !== 0 ? (
                                selectListAcctive.map((item, index) => {
                                    return (
                                        item.role === 'monitor' ? (
                                            <div className="accountRecentItem" key={index}>
                                                <div className="accountRecentItemIcon">
                                                    <FundViewOutlined />
                                                </div>
                                                <div className="accountRecentItemContent">
                                                    <p>Kết quả giám sát:{Math.floor(item.percent.Working)}</p>
                                                    <p>Thời gian giám sát:{item.time}</p>
                                                    <p>{formatDatetime(item.createdAt)}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="accountRecentItem" key={index}>
                                                <div className="accountRecentItemIcon">
                                                    <FormOutlined />
                                                </div>
                                                <div className="accountRecentItemContent">
                                                    <p>Kết quả kiểm tra trắc nghiêm: {`${item.testResult.filter((item) => item.check).length}/${item.testResult.length}`}</p>
                                                    <p>{formatDatetime(item.createdAt)}</p>
                                                </div>
                                            </div>
                                        )

                                    )
                                })
                            ) : 'Chưa có hoạt động nào'
                        }


                    </div>
                </div>
                <div className="accountMycourse">
                    <div className="accountMycourseTitle">
                        Khóa học của tôi
                    </div>
                    <div className="accountMycourseContent">
                        {
                            selectBoughtCourse.map((item, index) => {
                                return (
                                    <div className="accountMycourseItem" key={index}>
                                        <div className="accountMycourseItemImg" style={{ backgroundImage: `url(${item.image})` }}>
                                        </div>
                                        <div className="accountMycourseItemContent">
                                            <div className="mycourseItemTitle">
                                                {item.title}
                                            </div>
                                            <div className="mycourseItemDes">
                                                {item.description}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = createStructuredSelector({
    selectBoughtCourse,
    selectUser,
    selectListAcctive
})
const mapDispatchToProps = (dispatch) => ({
    getListAcctive: () => dispatch(actionsHistory.getListAcctive()),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Account)