const INITIAL_STATE = {
    notifications: []
}
export const notificationReducer = (state = INITIAL_STATE, action) => {
    // let idx;
    switch (action.type) {
        case 'GET_NOTIFICATIONS':
            return {
                ...state,
                notifications: action.notifications,
            }
        case 'SET_NOTIFICATIONS_READ':
            //sets all notifications to read! should activate on opening the dropdown
            return {
                ...state,
                notifications: state.notifications.map(ntf => {
                    if (ntf.status === 'unread') ntf.status = 'read'
                    return ntf
                }),
            }
        case 'REMOVE_NOTIFICATION':
            return {
                ...state,
                notifications: state.notifications.filter(ntf => ntf.id !== action.notificationId),
            }

        default:
            return state
    }
}