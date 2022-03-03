import { eventBusService } from '../../services/eventBusService.js';
import { httpService } from '../../services/httpService.js';

export const queryFriends = (userId) => {
    return async dispatch => {
        try {
            const friends = await httpService.get(`friends/${userId}`)
            console.log('fetched friends');
            dispatch({ type: 'GET_FRIENDS', friends })
        } catch (error) {
            console.log('queryFriends error:', error);
        }
    }
}
export const addFriend = (userId, friendId, status, onSendNotification) => {
    return async dispatch => {
        try {
            const friend = await httpService.post(`friends/add`, { userId, friendId, status })
            status === 'request' ? dispatch({ type: 'ADD_FRIEND', friend }) : dispatch({ type: 'APPROVE_FRIEND', friend })
            const notification = {
                to: friendId,
                from: userId,
                item_type: "friend request",
                interaction: "friend_req"
            }
            if (friend) {
                onSendNotification(notification)
                const msg = status === 'request' ? 'Sent Friend Request!' : 'Approved Friend Request!'
                eventBusService.emit('userMsg', { msg })
            }
        } catch (error) {
            console.log('addFriend error:', error);
            eventBusService.emit('userMsg', { msg: `Failed to send friend request!` })
        }
    }
}
export const removeFriend = (userId, friendId, removeFriendship) => {
    return async dispatch => {
        try {
            await httpService.delete(`friends`, { userId, friendId })
            removeFriendship()
            dispatch({ type: 'REMOVE_FRIEND', userId, friendId })
        } catch (error) {
            console.log('removeFriend error:', error);
        }
    }
}
