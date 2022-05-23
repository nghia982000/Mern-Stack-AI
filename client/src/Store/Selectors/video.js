import { INIT_STATE } from "../States/video";
import { createSelector } from "reselect";

const selectData = (state) =>state.videoReducers || INIT_STATE
const selectIsLoading = createSelector(selectData, (state) => state.isLoading)
const selectVideos = createSelector(selectData, (state) => state.data)
const selectDetailVideo = createSelector(selectData, (state) => state.detailVideo)
const selectDetailExercise= createSelector(selectData, (state) => state.detailExercise)

export {
    selectIsLoading,
    selectVideos,
    selectDetailVideo,
    selectDetailExercise
}