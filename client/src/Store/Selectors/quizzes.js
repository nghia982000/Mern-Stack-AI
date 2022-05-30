import { INIT_STATE } from "../States/quizzes";
import { createSelector } from "reselect";

const selectData = (state) =>state.quizzesReducers || INIT_STATE
const selectCreateState= createSelector(selectData, (state) => state.editState.create)
const selectUpdateState= createSelector(selectData, (state) => state.editState.update)
const selectCreateStateQuestion= createSelector(selectData, (state) => state.editStateQuestion.create)
const selectUpdateStateQuestion= createSelector(selectData, (state) => state.editStateQuestion.update)
const selectGetListQuestions= createSelector(selectData, (state) => state.listQuestions)
const selectDetailQuestion= createSelector(selectData, (state) => state.detailQuestion)

export {
    selectCreateState,
    selectUpdateState,
    selectGetListQuestions,
    selectCreateStateQuestion,
    selectUpdateStateQuestion,
    selectDetailQuestion
}