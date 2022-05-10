import {
    LIST_COURSE,
    SAVE_COURSE,
    DELETE_COURSE,
    CREATE_COURSE,
    UPDATE_COURSE_REQUEST,
    UPDATE_COURSE_SUCCESS,
    DETAIL_COURSE,
    CREATE_STATE,
    UPDATE_STATE,
    DELETE_FAVORITE,
    FAVORITE_COURSE,
    GET_FAVORITE,
    SAVE_FAVORITE,
    DELETE_FAVORITE_SUCCESS,
    FAVORITE_COURSE_SUCCESS,
    BUY_COURSE_REQUEST,
    BUY_COURSE_SUCCESS,
    GET_BOUGHT_COURSE,
    SAVE_BOUGHT_COURSE
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
export function deleteFavorite(payload){
    return{
        type: DELETE_FAVORITE,
        payload
    }
}
export function deleteFavoriteSuccess(payload){
    return{
        type: DELETE_FAVORITE_SUCCESS,
        payload
    }
}
export function favoriteCourse(payload){
    return{
        type: FAVORITE_COURSE,
        payload
    }
}
export function favoriteCourseSuccess(payload){
    return{
        type: FAVORITE_COURSE_SUCCESS,
        payload
    }
}
export function getFavorite(){
    return{
        type: GET_FAVORITE
    }
}
export function saveFavorite(payload){
    return{
        type: SAVE_FAVORITE,
        payload
    }
}
export function buyCourseRequest(payload){
    return{
        type: BUY_COURSE_REQUEST,
        payload
    }
}
export function buyCourseSuccess(payload){
    return{
        type: BUY_COURSE_SUCCESS,
        payload
    }
}
export function getBoughtCourse(){
    return{
        type: GET_BOUGHT_COURSE,
        
    }
}
export function saveBoughtCourse(payload){
    return{
        type: SAVE_BOUGHT_COURSE,
        payload
    }
}