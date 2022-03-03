import { eventBusService } from '../../services/eventBusService.js';
import { httpService } from '../../services/httpService.js';
import { getUserFromLocalStorage } from '../../services/userService'


export const addMsg = (roomId, msg, uid, name, isEdit, star, likes, ticket) => {
    //maybe add a way to edit msg.
    return async dispatch => {
        try {
            const currUser = await getUserFromLocalStorage()
            if (currUser._id === uid) {
                const room = await httpService.post(`room/chat/${roomId}`, { msg, uid, name, isEdit, star, likes, ticket })
                dispatch({ type: 'ADD_MSG', msg: room.msgs[room.msgs.length - 1] })

            }
            else {
                console.log('shouldnt happen. means the sender is not the logged in user/guest');
            }
        } catch (err) {
            console.log('addMsg error:', err);
        }
    }
}
export const createPrivateChat = (chatId) => {
    return async dispatch => {
        try {
            const chat = await httpService.post(`room/private-chat/${chatId}`, { chatId })
            dispatch({ type: 'SET_PRIVATE_MSGS', msgs: chat.msgs })
        } catch (err) {
            console.log('createPrivateChat error:', err);
        }
    }
}
export const addPrivateMsg = (chatId, msg, uid, name, ticket) => {
    //maybe add away to edit msg.
    return async dispatch => {
        try {
            const currUser = await getUserFromLocalStorage()
            console.log('(addPrivateMsg)currUser._id === uid:', currUser._id === uid);
            console.log('chatId, msg, uid, name, ticket:', chatId, msg, uid, name, ticket);
            if (currUser._id === uid) {
                //it fails here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                const chat = await httpService.post(`room/private-chat/msg/${chatId}`, { msg, uid, name, ticket })
                //it fails here^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                console.log('times addPrivateMsg is running', 'chat:', chat);
                dispatch({ type: 'ADD_PRIVATE_MSG', msg: chat.msgs[chat.msgs.length - 1] })
            }
            // else {

            // }
        } catch (err) {
            console.log('addPrivateMsg error:', err);
        }
    }
}

export const starMsg = (roomId, uid, msgId, currRoom) => {
    return async dispatch => {
        try {
            // const msgIdx = currRoom.msgs.findIndex(msg => msg.id === msgId)
            const room = await httpService.post(`room/chat/${roomId}/star/${uid}`, { uid, msgId })
            const idx = room.msgs.findIndex(msg => msg.id === msgId)
            const msg = room.msgs[idx]
            // if (msg.likes.includes(uid)) {
            //     console.log('likes already includes uid', uid + '. msg:', msg);
            //     return
            // }
            // msg.star.push(uid)
            dispatch({ type: 'STAR_MSG', msg, idx })

        } catch (err) {
            console.log('starMsg error:', err);
        }
    }
}
export const unStarMsg = (roomId, uid, msgId) => {
    return async dispatch => {
        try {

            const room = await httpService.delete(`room/chat/${roomId}/star/${uid}`, { uid, msgId })
            const idx = room.msgs.findIndex(msg => msg.id === msgId)
            const msg = room.msgs[idx]
            msg.star.filter(u => u !== uid)
            dispatch({ type: 'UN_STAR_MSG', msg, idx })
        } catch (err) {
            console.log('unStarMsg error:', err);
        }

    }
}
export const likeMsg = (roomId, uid, msgId) => {
    return async dispatch => {
        try {
            // const currUser = await getLoggedinUser()
            // if (currUser._id === uid) {
            const room = await httpService.post(`room/chat/${roomId}/likes/${uid}`, { uid, msgId })
            const idx = room.msgs.findIndex(msg => msg.id === msgId)
            const msg = room.msgs[idx]
            // if (msg.likes.includes(uid)) {
            //     console.log('likes already includes uid', uid + '. msg:', msg);
            //     return
            // }
            // msg.likes.push(uid)
            // dispatch({ type: 'STAR_MSG', uid,idx })
            dispatch({ type: 'LIKE_MSG', msg, idx })
            // }
        } catch (err) {
            console.log('likeMsg error:', err);
        }
    }
}

export const unLikeMsg = (roomId, uid, msgId) => {
    return async dispatch => {
        try {
            const room = await httpService.delete(`room/chat/${roomId}/likes/${uid}`, { uid, msgId })
            const idx = room.msgs.findIndex(msg => msg.id === msgId)
            const msg = room.msgs[idx]
            msg.likes.filter(u => u !== uid)
            dispatch({ type: 'UN_LIKE_MSG', msg, idx })
        } catch (err) {
            console.log('unLikeMsg error:', err);
        }

    }
}
export const getMsgs = (roomId) => {
    return async dispatch => {
        try {
            // const room = await httpService.get(`room/${roomId}`)
            const msgs = roomId ? await httpService.get(`room/chat/${roomId}`) : []
            // console.log('msgs:', room.msgs);
            dispatch({ type: 'SET_MSGS', msgs })
        } catch (err) {
            console.log('getMsgs error:', err);
        }

    }
}
export const getPrivateMsgs = (chatId) => {
    return async dispatch => {
        try {
            // const room = await httpService.get(`room/${roomId}`)
            const msgs = chatId ? await httpService.get(`room/private-chat/${chatId}`) : []
            dispatch({ type: 'SET_PRIVATE_MSGS', msgs })
        } catch (err) {
            console.log('getPrivateMsgs error:', err);
        }

    }
}
export const deletePrivateChat = (chatId) => {
    return async dispatch => {
        try {
            // const room = await httpService.get(`room/${roomId}`)
            await httpService.delete(`room/private-chat/${chatId}`, { chatId })
            // console.log('msgs:', room.msgs);
            console.log('chat deleted');
            dispatch({ type: 'SET_PRIVATE_MSGS', msgs: [] })
        } catch (err) {
            console.log('getPrivateMsgs error:', err);
        }

    }
}

export const removeMsg = (msgId, roomId) => {
    return async dispatch => {
        try {
            console.log(roomId);
            await httpService.delete(`room/chat/${roomId}`, { msgId, roomId })
            eventBusService.emit('userMsg', { msg: `The message was removed!` });
            dispatch({ type: 'REMOVE_MSG', msgId })
        } catch (err) {
            console.log('error in remove msg:', err);
        }
    }
}
export const editMsg = (msgId, roomId) => {
    return async dispatch => {
        try {
            // await httpService.post(`room/chat/${roomId}`, msgId)
            // eventBusService.emit('userMsg', { msg: `The message was edited!` });
            // dispatch({ type: 'EDIT_MSG', msgId })
        } catch (err) {
            console.log('error in remove msg:', err);
        }
    }
}
