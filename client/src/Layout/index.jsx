import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Home from '../Pages/Home'
import Detail from '../Pages/Detail'
import Learning from '../Pages/Learning'
import MyCourse from '../Pages/MyCourse'
import Course from '../Pages/Course'

const Layout = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/course" element={<Course />} />
                <Route path="/myCourse" element={<MyCourse />} />
                <Route path="/detail" element={<Detail />} />
                <Route path="/learning" element={<Learning />} />
            </Routes>
            <Footer />
        </>
    )
}

export default Layout