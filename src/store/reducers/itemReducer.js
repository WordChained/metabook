const INITIAL_STATE = {
    items: {
        posts: null,
        notifications: null
    },
    currentPost: null,
    // filterBy: { description: '', name: '' },
    showLoader: false,
    myPosts: null,
    singleMedia: null
}
export const itemReducer = (state = INITIAL_STATE, action) => {
    let idx;
    switch (action.type) {
        case 'GET_POSTS':
            return {
                ...state,
                items: {
                    ...state.items,
                    posts: action.data
                },
            }
        case 'GET_MY_POSTS':
            return {
                ...state,
                myPosts: action.posts
            }

        case 'GET_ITEM':
            return {
                ...state,
                //find by index
            }
        case 'REMOVE_POST':
            console.log(state.items.posts.filter((post) => post._id !== action.postId));
            return {
                ...state,
                items: {
                    ...state.items,
                    posts: state.items.posts.filter((post) => post._id !== action.postId)
                }
            }
        case 'REMOVE_COMMENT':
            idx = state.items.posts.findIndex(post => post._id === action.parentId)
            return {
                ...state,
                items: {
                    ...state.items,
                    posts: state.items.posts.map((post, postIdx) => {
                        if (postIdx === idx) {
                            post.engagement.comments = post.engagement.comments.filter(comment => comment._id !== action.commentId)
                            return post
                        } else return post
                    })
                }
            }
        case 'ADD_POST':
            return {
                ...state,
                items: {
                    ...state.items,
                    posts: [...state.items.posts, action.post]
                },
                showLoader: false
            }
        case 'ADD_COMMENT':
            idx = state.items.posts.findIndex(post => post._id === action.comment.parentId)
            return {
                ...state,
                items: {
                    ...state.items,
                    posts: state.items.posts.map((post, postIdx) => {
                        if (postIdx === idx) {
                            post.engagement.comments = [...post.engagement.comments, action.comment]
                            return post
                        } else {
                            return post
                        }
                    })
                }

            }
        case 'UPDATE_POST':
            idx = state.items.posts.findIndex(post => post._id === action.updatedItem._id)
            return {
                ...state,
                items: {
                    ...state.items,
                    posts: state.items.posts.map((post, postIdx) => idx === postIdx ? action.updatedItem : post)
                }
            }
        case 'UPDATE_COMMENT':
            idx = state.items.posts.findIndex(post => post._id === action.updatedItem.parentId)
            return {
                ...state,
                items: {
                    ...state.items,
                    posts: state.items.posts.map((post, postIdx) => {
                        if (postIdx === idx) {
                            post.engagement.comments = post.engagement.comments.map(comment => comment.parentId === action.updatedItem.parentId ? action.updatedItem : comment)
                            return post
                        } else {
                            return post
                        }
                    })
                }
            }
        case 'LOADER':
            return {
                ...state,
                showLoader: action.show
            }
        case 'SET_CURRENT_POST':
            return {
                ...state,
                currentPost: action.post
            }
        case 'SET_SINGLE_MEDIA':
            return {
                ...state,
                singleMedia: action.mediaItem
            }
        default:
            return state
    }
}