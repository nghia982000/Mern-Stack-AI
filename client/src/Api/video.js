import axios from 'axios'
import{
    URL
} from './url'

export const apiGetVideo = (payload) => axios.get(`${URL}/videoExercise/getVideo/${payload}`)
export const apiDeleteVideo = (id) => axios.delete(`${URL}/videoExercise/deleteVideo/${id}`)
export const apiCreateVideo = (payload) => axios.post(`${URL}/videoExercise/createVideo`,payload)
export const apiUpdateVideo = (payload) => axios.put(`${URL}/videoExercise/updateVideo`,payload)