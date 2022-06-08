import {
    CREATE_QUIZZES,
    SAVE_QUIZZES,
    CREATE_QUIZZES_SUCCESS,
    CREATE_STATE,
    UPDATE_STATE,
    DETAIL_QUIZZES,
    UPDATE_QUIZZES_REQUEST,
    UPDATE_QUIZZES_SUCCESS,
    GET_QUESTION_REQUEST,
    GET_QUESTION_SUCCESS,
    CREATE_QUESTION,
    CREATE_QUESTION_SUCCESS,
    CREATE_STATE_QUESTION,
    UPDATE_STATE_QUESTION,
    DETAIL_QUESTION,
    UPDATE_QUESTION_REQUEST,
    UPDATE_QUESTION_SUCCESS,
    TEST_RESULT,
    DELETE_QUESTION
} from '../Constants/quizzes'


export const createQuizzes = (dispatch) => (payload) =>
    new Promise((resolve) =>
        dispatch({
            type: CREATE_QUIZZES,
            payload, resolve
        })
    )
export function createQuizzesSuccess(payload){
    return{
        type: CREATE_QUIZZES_SUCCESS,
        payload
    }
}
export function detailQuizzes(payload){
    return{
        type: DETAIL_QUIZZES,
        payload
    }
}
export function updateStateQuestion(payload){
    return{
        type: UPDATE_STATE_QUESTION,
        payload
    }
}
export function createStateQuestion(payload){
    return{
        type: CREATE_STATE_QUESTION,
        payload
    }
}
export const updateQuizzesRequest = (dispatch) => (payload) =>
    new Promise((resolve) =>
        dispatch({
            type: UPDATE_QUIZZES_REQUEST,
            payload, resolve
        })
    )
export function updateQuizzesSuccess(payload){
    return{
        type: UPDATE_QUIZZES_SUCCESS,
        payload
    }
}

export const createQuestion = (dispatch) => (payload) =>
    new Promise((resolve) =>
        dispatch({
            type: CREATE_QUESTION,
            payload, resolve
        })
    )
export function createQuestionSuccess(payload){
    return{
        type: CREATE_QUESTION_SUCCESS,
        payload
    }
}
export function detailQuestion(payload){
    return{
        type: DETAIL_QUESTION,
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

export const updateQuestionRequest = (dispatch) => (payload) =>
    new Promise((resolve) =>
        dispatch({
            type: UPDATE_QUESTION_REQUEST,
            payload, resolve
        })
    )
export function updateQuestionSuccess(payload){
    return{
        type: UPDATE_QUESTION_SUCCESS,
        payload
    }
}
export function getQuestionRequest(payload){
    return{
        type: GET_QUESTION_REQUEST,
        payload
    }
}
export function getQuestionSuccess(payload){
    return{
        type: GET_QUESTION_SUCCESS,
        payload
    }
}
export const testResult=(dispatch) => (payload) =>
    new Promise((resolve) =>
        dispatch({
            type: TEST_RESULT,
            payload, resolve
        })
    )
export function deleteQuestion(payload){
    return{
        type: DELETE_QUESTION,
        payload
    }
}