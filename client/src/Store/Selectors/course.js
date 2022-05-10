import { INIT_STATE } from "../States/course";
import { createSelector } from "reselect";

const selectData = (state) =>state.courseReducers || INIT_STATE
const selectListCourse = createSelector(selectData, (state) => state.data)
const selectDetailCourse= createSelector(selectData, (state) => state.detailCourse)
const selectCreateState= createSelector(selectData, (state) => state.editState.create)
const selectUpdateState= createSelector(selectData, (state) => state.editState.update)
const selectFavoriteCourse= createSelector(selectData, (state) => state.favorite)
const selectBoughtCourse= createSelector(selectData, (state) => state.course)

export {
    selectListCourse,
    selectDetailCourse,
    selectCreateState,
    selectUpdateState,
    selectFavoriteCourse,
    selectBoughtCourse
}