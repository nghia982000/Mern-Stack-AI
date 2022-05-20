import {
    CREATE_EXERCISE,
    SAVE_EXERCISE,
    CREATE_EXERCISE_SUCCESS
} from '../Constants/exercise'

export function createExercise(payload){
    return{
        type: CREATE_EXERCISE,
        payload
    }
}
export function createExerciseSuccess(payload){
    return{
        type: CREATE_EXERCISE_SUCCESS,
        payload
    }
}