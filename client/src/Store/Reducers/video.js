import { INIT_STATE } from "../States/video"
import {
    CREATE_VIDEO_REQUEST,
    CREATE_VIDEO_SUCCESS,
    SAVE_VIDEO,
    DELETE_VIDEO,
    DETAIL_VIDEO
} from '../Constants/video'

export default function videoReducers(state=INIT_STATE,action){
    switch (action.type){
        case CREATE_VIDEO_REQUEST:
            return {
                ...state,
                isLoading:false
            }
        case CREATE_VIDEO_SUCCESS:
            return {
                ...state,
                isLoading:true,
                data:[...state.data,action.payload.video]
            }
        case SAVE_VIDEO:
            return {
                ...state,
                data:action.payload.data,
            }
        case DELETE_VIDEO:
            return {
                ...state,
                data:state.data.filter(video => video._id !== action.payload)
            }
        case DETAIL_VIDEO:
            return {
                ...state,
                detailVideo:state.data.find((item) => (item._id === action.payload))
            }
        default:
            return state
    }
}