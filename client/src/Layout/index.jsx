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
import Monitoring from '../Pages/Monitoring'

const Layout = ({ checkLoginRequest, selectAuthLoading }) => {
    useEffect(() => {
        checkLoginRequest()
    }, [])
    // useEffect(() => {
    //     if (!selectIsAuthenticated) {
    //             window.location.href = '/login'
    //         }
    // }, [selectIsAuthenticated])
    // // if (!selectIsAuthenticated) {
    // //     window.location.href = '/login'
    // // }
    // console.log(selectIsAuthenticated)
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
                    <Route path="/monitoring" element={<Monitoring />} />
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