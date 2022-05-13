import { all } from "redux-saga/effects"
import * as Auth from './auth'
import * as Course from './course'
import * as Video from './video'
import * as Comment from './comment'


export default function* () {
  yield all([
    Auth.sagaLogin(),
    Auth.sagaRegister(),
    Auth.sagaCheckLogin(),

    Course.sagaListCourse(),
    Course.sagaDeleteCourse(),    
    Course.sagaCreateCourse(),
    Course.sagaUpdateCourse(),
    Course.sagaFavoriteCourse(),
    Course.sagaDeleteFavorite(),
    Course.sagaGetFavorite(),
    Course.sagaBuyCourse(),
    Course.sagaGetBoughtCourse(),
    Course.sagaSelectField(),
    Course.sagaSearchCourse(),

    Video.sagaCreateVideo(),
    Video.sagaGetVideo(),
    Video.sagaDeleteVideo(),
    Video.sagaUpdateVideo(),

    Comment.sagaCreateComment(),
    Comment.sagaGetComment(),
  ])
}