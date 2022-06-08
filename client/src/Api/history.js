import axios from 'axios'
import{
    URL
} from './url'

export const createActive = (payload) => axios.post(`${URL}/history/createActive`,payload)
export const getListTestResult = (id) => axios.get(`${URL}/history/getListTestResult/${id}`)
export const getListAcctive = () => axios.get(`${URL}/history/getListAcctive`)