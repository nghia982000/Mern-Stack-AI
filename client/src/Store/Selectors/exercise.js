import { INIT_STATE } from "../States/exercise";
import { createSelector } from "reselect";

const selectData = (state) =>state.exerciseReducers || INIT_STATE
const selectCreateState= createSelector(selectData, (state) => state.editState.create)
const selectUpdateState= createSelector(selectData, (state) => state.editState.update)

export {
    selectCreateState,
    selectUpdateState
}