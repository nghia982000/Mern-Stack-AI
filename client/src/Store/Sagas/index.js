import { all } from "redux-saga/effects"
import * as Auth from './auth'
import * as Course from './course'
import * as Video from './video'
import * as Comment from './comment'
import * as Exercise from './exercise'
import * as Quizzes from './quizzes'
import * as History from './history'


export default function* () {
  yield all([
    Auth.sagaLogin(),
    Auth.sagaRegister(),
    Auth.sagaCheckLogin(),
    Auth.sagaGetAccount(),
    Auth.sagaDeleteAccount(),
    Auth.sagaChangePassword(),
    Auth.sagaDetailAccount(),

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
    Course.sagaStatistical(),

    Video.sagaCreateVideo(),
    Video.sagaGetVideo(),
    Video.sagaDeleteVideo(),
    Video.sagaUpdateVideo(),

    Comment.sagaCreateComment(),
    Comment.sagaGetComment(),
    Comment.sagaGetListComment(),
    Comment.sagaDeleteComment(),
    Comment.sagaReportComment(),
    Comment.sagaGetListReplycomment(),
    Comment.sagaReplyComment(),
    Comment.sagaGetCmt(),

    Exercise.sagaCreateExercise(),
    Exercise.sagaUpdateExercise(),

    Quizzes.sagaCreateQuizzes(),
    Quizzes.sagaUpdateQuizzes(),
    Quizzes.sagaCreateQuestion(),
    Quizzes.sagaUpdateQuestion(),
    Quizzes.sagaDeleteQuestion(),
    Quizzes.sagaGetQuestion(),
    Quizzes.sagaTestResult(),

    History.sagaGetListTestResult(),
    History.sagaCreateActive(),
    History.sagaGetListAcctive(),
  ])
}