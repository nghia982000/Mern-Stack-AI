import { INIT_STATE } from "../States/exercise"
import {
    CREATE_STATE,
    UPDATE_STATE
} from '../Constants/exercise'
import produce from "immer"

export default function exerciseReducers(state = INIT_STATE, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case CREATE_STATE:
                draft.editState.create = action.payload
                break
            case UPDATE_STATE:
                draft.editState.update = action.payload
                break
            default:
                return state
        }
    })
}