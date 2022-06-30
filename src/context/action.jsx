export const actionMiniSidenav = (dispatch, value) => {
    dispatch({ type: "SET_MINI_SIDENAV", value });
};

export const actionDarkMode = (dispatch, value) => {
    dispatch({ type: "SET_DARK_MODE", value });
};

export const actionAdminDashboardGet = (dispatch) => {
    dispatch({ type: "ADMIN_DASHBOARD_GET_LOADED", value: false });
    setTimeout(() => {
        dispatch({ type: "ADMIN_DASHBOARD_GET_LOADED", value: true });
    }, 5000);
};