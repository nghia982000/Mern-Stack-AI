import axios from 'axios'
import{
    URL
} from './url'

export const createExercise = (payload) => axios.post(`${URL}/videoExercise/createExercise`,payload)
export const updateExercise = (payload) => axios.put(`${URL}/videoExercise/updateExercise/${payload._id}`,payload.data)