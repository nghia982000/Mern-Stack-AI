import { INIT_STATE } from "../States/video"
import {
    CREATE_VIDEO_REQUEST,
    CREATE_VIDEO_SUCCESS,
    SAVE_VIDEO,
    DELETE_VIDEO,
    DETAIL_VIDEO,
    CREATE_STATE,
    UPDATE_STATE,
    UPDATE_VIDEO_SUCCESS
} from '../Constants/video'
import {
    DETAIL_EXERCISE,
    UPDATE_EXERCISE_SUCCESS,
    CREATE_EXERCISE_SUCCESS
} from '../Constants/exercise'
import {
    DETAIL_QUIZZES,
    UPDATE_QUIZZES_SUCCESS,
    CREATE_QUIZZES_SUCCESS
} from "../Constants/quizzes"

export default function videoReducers(state = INIT_STATE, action) {
    switch (action.type) {
        case CREATE_VIDEO_REQUEST:
            return {
                ...state,
                isLoading: false
            }
        case CREATE_VIDEO_SUCCESS:
            return {
                ...state,
                isLoading: true,
                data: [...state.data, action.payload.video]
            }
        case SAVE_VIDEO:
            return {
                ...state,
                data: action.payload.data,
            }
        case DELETE_VIDEO:
            return {
                ...state,
                data: state.data.filter(video => video._id !== action.payload)
            }
        case DETAIL_VIDEO:
            return {
                ...state,
                detailVideo: state.data.find((item) => (item._id === action.payload))
            }
        case DETAIL_EXERCISE:
            return {
                ...state,
                detailExercise: state.data.find((item) => (item._id === action.payload))
            }
        case DETAIL_QUIZZES:
            return {
                ...state,
                detailQuizzes: state.data.find((item) => (item._id === action.payload))
            }
        case UPDATE_EXERCISE_SUCCESS:
            return {
                ...state,
                data: state.data.map(item => (
                    item._id === action.payload._id ? action.payload : item
                ))
            }
        case UPDATE_VIDEO_SUCCESS:
            return {
                ...state,
                data: state.data.map(item => (
                    item._id === action.payload._id ? action.payload : item
                ))
            }
        case UPDATE_QUIZZES_SUCCESS:
            return {
                ...state,
                data: state.data.map(item => (
                    item._id === action.payload._id ? action.payload : item
                ))
            }
        case CREATE_EXERCISE_SUCCESS:
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        case CREATE_QUIZZES_SUCCESS:
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        case CREATE_STATE:
            return {
                ...state,
                editState:{
                    create:action.payload,
                    update:false
                }
            }
        case UPDATE_STATE:
            return {
                ...state,
                editState:{
                    create:false,
                    update:action.payload
                }
            }
        default:
            return state
    }
}