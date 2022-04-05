import axios from 'axios'
const URL = ' http://localhost:5000'

export const fetchLogin = (payload) => axios.post(`${URL}/auth/login`,payload)