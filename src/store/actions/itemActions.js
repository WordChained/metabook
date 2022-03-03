import { eventBusService } from '../../services/eventBusService.js';
import { httpService } from '../../services/httpService.js';

export const queryPosts = (userId) => {
    return async dispatch => {
        try {
            const data = await httpService.post(`item`, { typeOfItem: 'post', userId })
            dispatch({ type: 'GET_POSTS', data })
        } catch (error) {
            console.log('Query error:', error);
        }
    }
}
export const queryMyPosts = (userId) => {
    return async dispatch => {
        try {
            const posts = await httpService.get(`item/my-posts/${userId}`)
            dispatch({ type: 'GET_MY_POSTS', posts })
        } catch (error) {
            console.log('Query error:', error);
        }
    }
}


export const getItemById = (typeOfItem, itemId, userId) => {
    return async dispatch => {
        try {
            const item = await httpService.post(`item/${itemId}`, { typeOfItem, userId })
            dispatch({ type: 'GET_ITEM', item, typeOfItem })
        } catch (err) {
            console.log('getItemById error:', err);
        }
    }
}

export const removePost = (itemId, userId, publisherId, public_ids) => {
    return async dispatch => {
        try {
            await httpService.delete(`item/post/${itemId}`, { userId, typeOfItem: 'post', itemId, publisherId })
            await httpService.delete(`cloudinary/remove-media`, { userId, public_ids })
            dispatch({ type: 'REMOVE_POST', postId: itemId })
            eventBusService.emit('userMsg', { msg: `Post Removed!`, time: 3000 });
        } catch (err) {
            console.log('Error on remove, item service =>', err)
            eventBusService.emit('userMsg', { msg: `Post Failed to be Removed!`, time: 3000 });
            throw err;
        }
    }

}
export const removeComment = (itemId, userId, publisherId, parentId) => {
    return async dispatch => {
        try {
            await httpService.delete(`item/comment/${itemId}`, { userId, typeOfItem: 'comment', itemId, publisherId, parentId })
            dispatch({ type: 'REMOVE_COMMENT', parentId, commentId: itemId })
        } catch (err) {
            console.log('Error on remove, item service =>', err)
            eventBusService.emit('userMsg', { msg: `Post Failed to be Removed!`, time: 3000 });
            throw err;
        }
    }
}
//add and update

export const save = (item, typeOfItem, checkSuccess = () => { }, sendToUserMsg = true) => {
    if (!item._id) {
        //add
        console.log(`add ${typeOfItem}`);
        return async dispatch => {
            try {
                // dispatch({ type: 'LOADER', show: true })
                const newItem = await httpService.post(`item/add/${typeOfItem}`, { item, typeOfItem })
                if (typeOfItem === 'post') {
                    eventBusService.emit('userMsg', { msg: 'Great, Posted!', time: 4000 });
                    // dispatch({ type: 'ADD_POST', post: newItem })
                    dispatch({ type: 'LOADER', show: false })
                }
                else if (typeOfItem === 'comment') {
                    dispatch({ type: 'ADD_COMMENT', comment: newItem })
                    //for notification
                    checkSuccess({
                        to: item.parentPublisherId,
                        from: item.publisher.id,
                        content: item.text,
                        item_type: "post",
                        interaction: "comment"
                    })
                    // eventBusService.emit('notification', {
                    //     to: item.parentPublisherId,
                    //     from: item.publisher.id,
                    //     content: item.text,
                    //     item_type: "post",
                    //     interaction: "comment"
                    // })
                }
            } catch (err) {
                console.log('save (add) error:', err);
                dispatch({ type: 'LOADER', show: false })
                checkSuccess(null)
                eventBusService.emit('userMsg', { msg: `Adding the item has failed..`, time: 4000 });
            }
        }
    }
    else {
        //update
        return async dispatch => {
            try {
                const updatedItem = await httpService.put(`item/${typeOfItem}/${item._id}`, { item, typeOfItem })
                // eventBusService.emit('userMsg', { msg: `The item ${updatedItem._id} was updated!` });
                if (typeOfItem === 'post') {
                    dispatch({ type: 'UPDATE_POST', updatedItem })
                    //for notification
                    checkSuccess({
                        to: item.parentPublisherId,
                        from: item.publisher.id,
                        content: item.text,
                    })
                    if (sendToUserMsg) eventBusService.emit('userMsg', { msg: 'Post Updated!', time: 4000 });
                }
                else if (typeOfItem === 'comment') {
                    dispatch({ type: 'UPDATE_COMMENT', updatedItem, })
                    //for notification
                    checkSuccess({
                        to: item.parentPublisherId,
                        from: item.publisher.id,
                        content: item.text,
                    })
                }
            } catch (err) {
                console.log('save (update) error:', err);
                checkSuccess(null)
                eventBusService.emit('userMsg', { msg: 'Failed to Update', time: 4000 });
            }
        }
    }
}

export const toggleUploadLoader = (show) => {
    return dispatch => {
        dispatch({ type: 'LOADER', show })
    }
}
export const setCurrentPost = (post) => {
    return dispatch => {
        dispatch({ type: 'SET_CURRENT_POST', post })
    }
}



