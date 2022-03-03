const INITIAL_STATE = {
    friends: null,
    pendingFriends: null
}
export const friendsReducer = (state = INITIAL_STATE, action) => {
    // let idx;
    switch (action.type) {
        case 'GET_FRIENDS':
            const pendingFriendRequest = action.friends.filter(friend => friend.status === 'p')
            const verifiedFriends = action.friends.filter(friend => friend.status === 'f')
            console.log('pendingFriendRequest:', pendingFriendRequest);
            console.log('verifiedFriends:', verifiedFriends);
            return {
                ...state,
                friends: verifiedFriends,
                pendingFriends: pendingFriendRequest
            }
        case 'ADD_FRIEND':
            return {
                ...state,
                pendingFriends: [...state.pendingFriends, action.friend]
            }
        case 'APPROVE_FRIEND':
            return {
                ...state,
                friends: [...state.pendingFriends, action.friend],
                pendingFriends: state.pendingFriends.filter(friend => friend.userId !== action.friend.userId)

            }
        case 'REMOVE_FRIEND':
            return {
                ...state,
                friends: state.friends.filter(friend => friend.userId !== action.friendId),
                pendingFriends: state.pendingFriends.filter(friend => friend.userId !== action.friendId)
            }
        default:
            return state
    }
}