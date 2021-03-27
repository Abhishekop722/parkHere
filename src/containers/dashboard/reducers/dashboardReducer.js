import _ from 'lodash'
export default (
    state = {
        dashboardLoader: false
    },
    action
) => {
    switch (action.type) {
        case 'SHOW_DASHBOARD_LOADER':
            return { ...state, dashboardLoader: true }
        case 'HIDE_DASHBOARD_LOADER':
            return { ...state, dashboardLoader: false }
        default:
            return state;
    }
};
