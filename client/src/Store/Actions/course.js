import {
    LIST_COURSE,
    SAVE_COURSE,
    DELETE_COURSE,
    CREATE_COURSE,
    UPDATE_COURSE_REQUEST,
    UPDATE_COURSE_SUCCESS,
    DETAIL_COURSE,
    CREATE_STATE,
    UPDATE_STATE
} from '../Constants/course'
export function listCourse(){
    return{
        type: LIST_COURSE
    }
}
export function saveCourse(payload){
    return{
        type: SAVE_COURSE,
        payload
    }
}
export function deleteCourse(payload){
    return{
        type: DELETE_COURSE,
        payload
    }
}
export function createCourse(payload){
    return{
        type: CREATE_COURSE,
        payload
    }
}
export function updateCourseRequest(payload){
    return{
        type: UPDATE_COURSE_REQUEST,
        payload
    }
}
export function updateCourseSuccess(payload){
    return{
        type: UPDATE_COURSE_SUCCESS,
        payload
    }
}
export function detailCourse(payload){
    return{
        type: DETAIL_COURSE,
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