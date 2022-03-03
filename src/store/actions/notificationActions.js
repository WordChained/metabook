import { eventBusService } from '../../services/eventBusService.js';
import { httpService } from '../../services/httpService.js';

export const getNotifications = (userId, getUnreadNotifications) => {
    return async dispatch => {
        try {
            const notifications = await httpService.get(`notification/${userId}`)
            getUnreadNotifications(notifications)
            dispatch({ type: 'GET_NOTIFICATIONS', notifications })
        } catch (error) {
            console.log('getNotifications error:', error);
        }
    }
}
export const updateNotificationsStatus = (ids) => {
    return async dispatch => {
        try {
            await httpService.put(`notification/read`, { ids })
            dispatch({ type: 'SET_NOTIFICATIONS_READ' })
        } catch (error) {
            console.log('updateNotificationStatus error:', error);
        }
    }
}
export const removeNotification = (notificationId) => {
    return async dispatch => {
        try {
            await httpService.delete(`notification/remove`, { notificationId })
            dispatch({ type: 'REMOVE_NOTIFICATION', notificationId })
        } catch (error) {
            console.log('removeNotification error:', error);
        }
    }
}
export const sendNotification = (data) => {
    const notification = {
        user_id: data.to,
        sender_id: data.from,
        content: data.content,
        item_type: data.item_type,
        interaction: data.interaction,
        date: Date.now(),
        status: 'unread'
    }
    return async dispatch => {
        try {
            const newNotification = await httpService.post(`notification/add`, { notification })
            dispatch({ type: 'ADD_NOTIFICATION', newNotification })
        } catch (error) {
            console.log('getNotifications error:', error);
        }
    }
}
