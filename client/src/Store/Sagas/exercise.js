import { takeLatest, call, put } from 'redux-saga/effects'
import {
    CREATE_EXERCISE,
    UPDATE_EXERCISE_REQUEST
} from '../Constants/exercise'
import {
    updateExerciseSuccess
} from '../Actions/exercise'
import * as apiExercise from '../../Api/exercise'

function* fetchCreateExercise(action) {
    try {
        const response = yield call(apiExercise.createExercise, action.payload)
        console.log(response)
        // yield put(createCommentSuccess(response.data.comment))
    } catch (err) {
        console.error(err)
        if(err.response){
            console.log(err.response.data)
            alert(err.response.data.message)
        }
        else{
            console.log({success:false,message:err.message})
            alert(err.message)
        }
    }
}
export function* sagaCreateExercise() {
    yield takeLatest(CREATE_EXERCISE, fetchCreateExercise)
}
function* fetchUpdateExercise(Actions) {
    try {
        console.log(Actions.payload)
        const response = yield call(apiExercise.updateExercise,Actions.payload)
        console.log(response)
        yield put(updateExerciseSuccess(response.data.exercise))
    } catch (err) {
        console.log(err)
        if(err.response){
            console.log(err.response.data)
            alert(err.response.data.message)
        }
        else{
            console.log({success:false,message:err.message})
            alert(err.message)
        }
    }
}
export function* sagaUpdateExercise() {
    yield takeLatest(UPDATE_EXERCISE_REQUEST, fetchUpdateExercise)
}

