import axios from 'axios'
import{
    URL
} from './url'

export const createQuizzes = (payload) => axios.post(`${URL}/videoExercise/createQuizzes`,payload)
export const updateQuizzes = (payload) => axios.put(`${URL}/videoExercise/updateQuizzes/${payload._id}`,payload.data)
export const createQuestion = (payload) => axios.post(`${URL}/quizzes/createQuizzes/${payload.id}`,payload.formData)
export const updateQuestion = (payload) => axios.put(`${URL}/quizzes/updateQuizzes/${payload.id}`,payload.formData)
export const deleteQuestion = (id) => axios.delete(`${URL}/quizzes/deleteQuizzes/${id}`)
export const getQuestion = (id) => axios.get(`${URL}/quizzes/getQuizzes/${id}`)
export const testResult = (payload) => axios.post(`${URL}/quizzes/testResult/${payload.id}`,payload.data)