import axios from 'axios'
const URL = ' http://localhost:5000'
// const URL = 'https://server-mern-stack-ai.herokuapp.com'

export const createComment = (payload) => axios.post(`${URL}/comment/createComment`,payload)
export const getComment = (payload) => axios.post(`${URL}/comment/getComment`,payload)