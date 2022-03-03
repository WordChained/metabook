const INITIAL_STATE = {
    currChatMsgs: null,
    // [{
    //     text: '',
    //     id: null,
    //     sentAt: null,
    //     uid: null,
    //     name: '',
    //     isEdit: false,
    //     star: null,
    //     likes: null
    // }]
    quota: null,
    roomFull: false
}
export const chatReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_MSGS':
            return {
                ...state,
                currChatMsgs: action.msgs
            }
        case 'SET_PRIVATE_MSGS':
            return {
                ...state,
                currChatMsgs: action.msgs
            }
        case 'ADD_MSG':
            return {
                ...state,
                currChatMsgs: [...state.currChatMsgs, action.msg]
            }
        case 'ADD_PRIVATE_MSG':
            return {
                ...state,
                currChatMsgs: [...state.currChatMsgs, action.msg]
            }
        case 'STAR_MSG':
        case 'UN_STAR_MSG':
            return {
                ...state,
                currChatMsgs: state.currChatMsgs.map((msg, idx) => {
                    return idx === action.idx ?
                        action.msg
                        :
                        msg
                })
            }
        // case 'UN_STAR_MSG':
        //     return {
        //         ...state,
        //         currChatMsgs: state.currChatMsgs.filter((msg, idx) => { return idx !== action.idx })
        //     }
        case 'LIKE_MSG':
        case 'UN_LIKE_MSG':
            return {
                ...state,
                currChatMsgs: state.currChatMsgs.map((msg, idx) => {
                    return idx === action.idx ?
                        action.msg
                        :
                        msg
                })

            }
        case 'REMOVE_MSG':
            //     console.log('like action:', state.currChatMsgs[action.idx]);
            return {
                ...state,
                currChatMsgs: state.currChatMsgs.filter((msg) => msg.id !== action.msgId)
            }
        case 'EDIT_MSG':
            //     console.log('like action:', state.currChatMsgs[action.idx]);
            return {
                ...state,
                // need to change only the specific msg and not all msgs
                // currChatMsgs: state.currChatMsgs.map((msg) => msg.id === action.msg.id ? action.msg : msg)


            }
        default:
            return state
    }
}