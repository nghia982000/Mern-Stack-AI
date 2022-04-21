import axios from 'axios'
const URL = ' http://localhost:5000'

export const fetchGetCourse = () => axios.get(`${URL}/course/listCourse`)
export const apiDeleteCourse = (id) => axios.delete(`${URL}/course/deleteCourse/${id}`)
export const apiCreateCourse = (payload) => axios.post(`${URL}/course/addCourse`,payload)
export const apiUpdateCourse = (payload) => axios.put(`${URL}/course/updateCourse/${payload._id}`,payload.data)