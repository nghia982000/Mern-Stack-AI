import axios from 'axios'
const URL = ' http://localhost:5000'
// const URL = 'https://server-mern-stack-ai.herokuapp.com'

export const apiGetVideo = (payload) => axios.get(`${URL}/video/getVideo/${payload}`)
export const apiDeleteVideo = (id) => axios.delete(`${URL}/video/deleteVideo/${id}`)
export const apiCreateVideo = (payload) => axios.post(`${URL}/video/createVideo`,payload)
export const apiUpdateVideo = (payload) => axios.put(`${URL}/video/updateVideo`,payload)