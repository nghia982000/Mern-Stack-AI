import React from 'react'
import './style.scss'
import LogoAD from '../../Assets/img/logoUser.png'
import background from '../../Assets/img/backgroundAc.png'
import imgBxh from '../../Assets/img/manwork.jpg'

import * as actions from '../../Store/Actions/course'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectBoughtCourse } from '../../Store/Selectors/course'
import { selectUser } from '../../Store/Selectors/auth'

const Account = ({ selectBoughtCourse,selectUser }) => {
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
                    {selectUser.username}
                </div>
            </div>
            <div className="accountContent">
                <div className="accountRecent">
                    <div className="accountRecentTitle">
                        Recent Action
                    </div>
                    <div className="accountRecentContent">

                    </div>
                </div>
                <div className="accountMycourse">
                    <div className="accountMycourseTitle">
                        My Course
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
    selectUser
})
const mapDispatchToProps = (dispatch) => ({
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Account)