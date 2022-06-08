import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Home from '../Pages/Home'
import Detail from '../Pages/Detail'
import Learning from '../Pages/Learning'
import MyCourse from '../Pages/MyCourse'
import Course from '../Pages/Course'
import Account from '../Pages/Account'
import './style.scss'

import * as actions from '../Store/Actions/auth'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {
    selectAuthLoading,
} from '../Store/Selectors/auth'

const Layout = ({ checkLoginRequest, selectAuthLoading }) => {
    useEffect(() => {
        checkLoginRequest()
    }, [])
    return (
        <>
            <Header />
            <div className='container'>
                <Routes >
                    <Route path="/" element={<Home />} />
                    <Route path="/course" element={<Course />} />
                    <Route path="/myCourse" element={<MyCourse />} />
                    <Route path="/detail/:id" element={<Detail />} />
                    <Route path="/learning/:id" element={<Learning />} />
                    <Route path="/account" element={<Account />} />
                </Routes>
            </div>
            <Footer />
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    selectAuthLoading,
})
const mapDispatchToProps = (dispatch) => ({
    checkLoginRequest: () => dispatch(actions.checkLoginRequest()),
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
export default compose(withConnect)(Layout)