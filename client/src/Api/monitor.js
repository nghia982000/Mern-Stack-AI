import axios from 'axios'
import{
    URL
} from './url'

export const createActive = (payload) => axios.post(`${URL}/monitor/createActive`,payload)