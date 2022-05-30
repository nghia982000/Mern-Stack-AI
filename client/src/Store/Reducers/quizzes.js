import { INIT_STATE } from "../States/quizzes"
import {
    CREATE_STATE,
    UPDATE_STATE,
    CREATE_QUESTION_SUCCESS,
    UPDATE_QUESTION_SUCCESS,
    GET_QUESTION_SUCCESS,
    DELETE_QUESTION,
    CREATE_STATE_QUESTION,
    UPDATE_STATE_QUESTION,
    DETAIL_QUESTION
} from '../Constants/quizzes'
import produce from "immer"

export default function quizzesReducers(state = INIT_STATE, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case CREATE_STATE:
                draft.editState.create = action.payload
                break
            case UPDATE_STATE:
                draft.editState.update = action.payload
                break
            
            case DETAIL_QUESTION:
                draft.detailQuestion = state.listQuestions.find((item) => (item._id === action.payload))
                break
            
            case CREATE_STATE_QUESTION:
                draft.editStateQuestion.create = action.payload
                break
            case UPDATE_STATE_QUESTION:
                draft.editStateQuestion.update = action.payload
                break
            
            case CREATE_QUESTION_SUCCESS:
                const newQuestion = [action.payload,...state.listQuestions]
                draft.listQuestions = newQuestion
                break
            case UPDATE_QUESTION_SUCCESS:
                console.log(action.payload._id)
                draft.listQuestions = state.listQuestions.map(item => (
                    item._id === action.payload._id ? action.payload : item
                ))
                break
            case GET_QUESTION_SUCCESS:
                draft.listQuestions =action.payload
                break
            case DELETE_QUESTION:
                draft.listQuestions =state.listQuestions.filter(item => item._id !== action.payload)
                break
            default:
                return state
        }
    })
}