import { INIT_STATE } from "../States/auth";
import { createSelector } from "reselect";

const selectData = (state) =>state.authReducers || INIT_STATE
const selectAuthLoading = createSelector(selectData, (state) => state.authLoading)
const selectIsAuthenticated = createSelector(selectData, (state) => state.isAuthenticated)
const selectUser = createSelector(selectData, (state) => state.user)
const selectListAccount = createSelector(selectData, (state) => state.listAccount)
const selectDetailAccount = createSelector(selectData, (state) => state.detailAccount)
const selectStateMonitor = createSelector(selectData, (state) => state.stateMonitor)

export {
    selectAuthLoading,
    selectIsAuthenticated,
    selectUser,
    selectListAccount,
    selectDetailAccount,
    selectStateMonitor
}