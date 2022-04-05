import { all } from "redux-saga/effects"
import * as Login from './login'

export default function* () {
  yield all([
    Login.sagaLogin(),
  ])
}