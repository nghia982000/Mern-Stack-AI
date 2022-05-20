import axios from 'axios'
const URL = ' http://localhost:5000'
// const URL = 'https://server-mern-stack-ai.herokuapp.com'

export const createExercise = (payload) => axios.post(`${URL}/videoExercise/createExercise`,payload)