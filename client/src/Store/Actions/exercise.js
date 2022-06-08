import {
    CREATE_EXERCISE,
    SAVE_EXERCISE,
    CREATE_EXERCISE_SUCCESS,
    CREATE_STATE,
    UPDATE_STATE,
    DETAIL_EXERCISE,
    UPDATE_EXERCISE_REQUEST,
    UPDATE_EXERCISE_SUCCESS
} from '../Constants/exercise'

export const createExercise = (dispatch) => (payload) =>
    new Promise((resolve) =>
        dispatch({
            type: CREATE_EXERCISE,
            payload, resolve
        })
    )
export function createExerciseSuccess(payload){
    return{
        type: CREATE_EXERCISE_SUCCESS,
        payload
    }
}
export function detailExercise(payload){
    return{
        type: DETAIL_EXERCISE,
        payload
    }
}
export function updateState(payload){
    return{
        type: UPDATE_STATE,
        payload
    }
}
export function createState(payload){
    return{
        type: CREATE_STATE,
        payload
    }
}
export const updateExerciseRequest = (dispatch) => (payload) =>
    new Promise((resolve) =>
        dispatch({
            type: UPDATE_EXERCISE_REQUEST,
            payload, resolve
        })
    )
export function updateExerciseSuccess(payload){
    return{
        type: UPDATE_EXERCISE_SUCCESS,
        payload
    }
}