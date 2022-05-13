import { INIT_STATE } from "../States/comment";
import { createSelector } from "reselect";

const selectData = (state) =>state.commentReducers || INIT_STATE
const selectListComment = createSelector(selectData, (state) => state.listComment)

export {
    selectListComment
}