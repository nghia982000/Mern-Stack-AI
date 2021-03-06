import axios from 'axios'
import{
    URL
} from './url'

export const createComment = (payload) => axios.post(`${URL}/comment/createComment`,payload)
export const getComment = (payload) => axios.post(`${URL}/comment/getComment`,payload)
export const getListComment = () => axios.get(`${URL}/comment/getListComment`)
export const deleteComment = (id) => axios.delete(`${URL}/comment/deleteComment/${id}`)
export const getListReplyComment = (id) => axios.get(`${URL}/comment/deleteComment/${id}`)
export const replyComment = (payload) => axios.post(`${URL}/comment/replyComment/${payload.id}`,payload.data)
export const reportComment = (id) => axios.get(`${URL}/comment/reportComment/${id}`)
export const getCmt = (id) => axios.get(`${URL}/comment/getCmt/${id}`)