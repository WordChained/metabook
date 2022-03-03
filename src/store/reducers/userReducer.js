const INITIAL_STATE = {
  users: null,
  filteredUsers: [],
  loggedInUser: null,
  isLoggedIn: false,
  loginLoader: false,
  userToProfile: null,
  //
  wrongCreds: null,
  ready: false,
  isCoverOn: false,
  previousSearch: undefined
}



export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_READY':
      // console.log('action.user:', action.user);
      return {
        ...state,
        ready: action.isReady
      }
    case 'SET_LOGGED_IN':
      // console.log('action.user:', action.user);
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
        loggedInUser: action.user
      }
    case 'LOGIN':
      console.log('LOGIN');
      return {
        ...state,
        loggedInUser: action.user,
        isLoggedIn: true,
        loginLoader: false
      }
    case 'LOGOUT':
      return {
        ...state,
        loggedInUser: null,
        isLoggedIn: false,
        loginLoader: false
      }
    case 'LOGIN_ERROR':
    case 'SIGNUP_ERROR':
      return {
        ...state,
        wrongCreds: action.isWrong,
        loginLoader: false
      }

    case 'GET_USERS':
      return {
        ...state,
        filteredUsers: action.users,
        previousSearch: action.filter
      }
    case 'UPDATE_USER':
      return {
        ...state,
        loggedInUser: action.user
      }
    // case 'GET_USER':
    //   return {
    //     ...state,
    //     loggedInUser: action.user
    //   }
    case 'LOADER':
      return {
        ...state,
        loginLoader: action.isLoading
      }
    case 'TOGGLE_SCREEN_COVER':
      return {
        ...state,
        isCoverOn: action.show
      }
    case 'SET_USER_TO_PROFILE':
      return {
        ...state,
        userToProfile: action.user
      }

    default:
      return state
  }
}