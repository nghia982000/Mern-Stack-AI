import { all } from "redux-saga/effects"
import * as Auth from './auth'
import * as Course from './course'
import * as Video from './video'


export default function* () {
  yield all([
    Auth.sagaLogin(),
    Auth.sagaRegister(),
    Auth.sagaCheckLogin(),
    Course.sagaListCourse(),
    Course.sagaDeleteCourse(),    
    Course.sagaCreateCourse(),
    Course.sagaUpdateCourse(),
    Video.sagaCreateVideo(),
    Video.sagaGetVideo(),
    Video.sagaDeleteVideo(),
    Video.sagaUpdateVideo(),
  ])
}