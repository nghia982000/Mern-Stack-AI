import axios from 'axios'
import{
    URL
} from './url'

export const fetchLogin = (payload) => axios.post(`${URL}/auth/login`,payload)
export const fetchRegister = (payload) => axios.post(`${URL}/auth/register`,payload)
export const fetchCheckLogin = () => axios.get(`${URL}/auth/checkLogin`)
export const getAccount = () => axios.get(`${URL}/auth/getAccount`)
export const deleteAccount = (id) => axios.delete(`${URL}/auth/deleteAccount/${id}`)