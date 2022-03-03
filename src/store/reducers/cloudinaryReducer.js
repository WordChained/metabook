const INITIAL_STATE = {
    currentUserId: null,
    userMedia: null,

}

export const cloudinaryReducer = (state = INITIAL_STATE, action) => {
    let idx;
    switch (action.type) {
        case 'GET_MEDIA':
            return {
                ...state,
                userMedia: action.media,
                currentUserId: action.userId
            }

        // case 'REMOVE_IMAGE':
        //     // idx
        //     return {
        //         ...state,
        //         userMedia: state.userMedia.filter((mediaItem, mediaItemIdx) => idx !== mediaItemIdx)
        //     }
        default:
            return state
    }
}