import { INIT_STATE } from "../States/history";
import { createSelector } from "reselect";

const selectData = (state) =>state.historyReducers || INIT_STATE
const selectListTestResult = createSelector(selectData, (state) => state.listTestResult)
const selectListAcctive = createSelector(selectData, (state) => state.listAcctive)

export {
    selectListTestResult,
    selectListAcctive
}