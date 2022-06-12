import axios from 'axios'
import{
    URL
} from './url'

export const fetchGetCourse = () => axios.get(`${URL}/course/listCourse`)
export const apiDeleteCourse = (id) => axios.delete(`${URL}/course/deleteCourse/${id}`)
export const apiCreateCourse = (payload) => axios.post(`${URL}/course/addCourse`,payload)
export const apiUpdateCourse = (payload) => axios.put(`${URL}/course/updateCourse/${payload._id}`,payload.data)
export const apiFavoriteCourse = (payload) => axios.post(`${URL}/course/favoriteCourse`,payload)
export const apiGetFavorite = () => axios.get(`${URL}/course/getFavorite`)
export const apiGetBoughtCourse = () => axios.get(`${URL}/course/getBoughtCourse`)
export const apiDeleteFavorite = (id) => axios.delete(`${URL}/course/deleteFavorite/${id}`)
export const apiBuyCourse = (payload) => axios.post(`${URL}/course/buyCourse`,payload)
export const apiSelectField = (payload) => axios.post(`${URL}/course/selectField`,payload)
export const apiSearchCourse = (payload) => axios.post(`${URL}/course/searchCourse`,payload)
export const apiStatistical = () => axios.get(`${URL}/course/statistical`)