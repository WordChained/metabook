import { eventBusService } from '../../services/eventBusService'
import { httpService } from '../../services/httpService'
import { getUserFromLocalStorage, setUserToLocalStorage } from '../../services/userService'
import { titleCase } from '../../services/utilService'

// const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser'
// var gWatchedUser = null;

// window.userService = userService

export const getUsers = (filter) => {
    return async dispatch => {
        try {
            const users = await httpService.get(`user/search/${filter}`)
            dispatch({ type: 'GET_USERS', users, filter })
        } catch (err) {
            console.log('getUsers error:', err);
        }
    }
}

export const getUserById = (userId) => {
    return async dispatch => {
        try {
            const user = await httpService.get(`user/${userId}`)
            // console.log('user in getUserById:', user);
            // gWatchedUser = user;
            dispatch({ type: 'SET_USER_TO_PROFILE', user })
            // setUserToLocalStorage(user)
        } catch (err) {
            console.log('getUserById error:', err);
        }
    }
}
export const getUserForProfile = (userId, returnUser) => {
    return async dispatch => {
        try {
            const user = await httpService.get(`user/${userId}`)
            // console.log('user in getUserById:', user);
            // gWatchedUser = user;
            dispatch({ type: 'SET_USER_TO_PROFILE', user })
            returnUser(user)
            // setUserToLocalStorage(user)
        } catch (err) {
            console.log('getUserById error:', err);
        }
    }
}
export const getUsersById = (idArray) => {
    console.log('getUsersById idArray:', idArray);
    return async dispatch => {
        try {
            const users = await httpService.post(`user/`, { idArray })
            // console.log('user in getUserById:', user);
            // gWatchedUser = user;
            dispatch({ type: 'GET_PUBLISHERS', users })
            // setUserToLocalStorage(user)
        } catch (err) {
            console.log('getUserById error:', err);
        }
    }
}

// export const remove = (userId) => {
//     return storageService.remove('user', userId)
// }

export const update = (userId, colName, newValue) => {
    return async dispatch => {
        try {
            const updatedUser = await httpService.put(`user/update`, { userId, colName, newValue })
            if (getUserFromLocalStorage().userId === userId) setUserToLocalStorage(updatedUser)
            dispatch({ type: 'UPDATE_USER', user: updatedUser })
        } catch (err) {
            console.log('error in update user:', err);
        }
    }
}

export const remove = (userId) => {
    return async dispatch => {
        try {
            await httpService.delete(`user/remove`, { userId })
            setUserToLocalStorage(null)
            dispatch({ type: 'REMOVE_USER', user: null })
        } catch (err) {
            console.log('error in remove user:', err);
        }
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            //trying a get req
            dispatch({ type: 'LOADER', isLoading: true })
            const user = await httpService.post('auth/login', { email, password })
            console.log('user in login after signup:', user);
            if (user) setUserToLocalStorage(user)
            dispatch({ type: 'LOGIN', user })
            eventBusService.emit('userMsg', { msg: `Welcome, ${titleCase(user.name.first)}!` });
        } catch (err) {
            console.log('login error:', err);
            console.log(err.response.status);
            console.log('MESSAGE:', err.message);
            if (err.reponse && err.response.status === 401) {
                console.log('401!!!!!!!!!!!!!!!!');
                eventBusService.emit('userMsg', (
                    {
                        msg: `Sorry, either the details you entered are wrong, or you need to signup!`,
                        time: 4000
                    }
                )
                )
            };
            dispatch({ type: 'LOGIN_ERROR', isWrong: true })
        }

    }
}

export const signup = (initialUserCred) => {
    const userCred = { ...initialUserCred, createdAt: Date.now() }
    console.log('userCred at userActions:', userCred);
    return async dispatch => {
        try {
            dispatch({ type: 'LOADER', isLoading: true })
            const user = await httpService.post('auth/signup', { userCred })
            console.log('user in signup:', user);
            setUserToLocalStorage(user)
            dispatch({ type: 'SIGNUP', user })
            dispatch({ type: 'LOADER', isLoading: false })
        } catch (err) {
            console.log('signup error:', err);
            dispatch({ type: 'LOGIN_ERROR', isWrong: true })
        }
    }
}

export const logout = () => {
    localStorage.clear()
    return dispatch => {
        dispatch({ type: 'LOGOUT' })
    }
}

export const setReady = (isReady) => {
    return dispatch => {
        dispatch({ type: 'SET_READY', isReady })
    }
}
export const setLoggedIn = (isLoggedIn, user) => {
    return dispatch => {
        setUserToLocalStorage(user)
        dispatch({ type: 'SET_LOGGED_IN', isLoggedIn, user })
    }
}
export const toggleScreenCover = (show) => {
    return dispatch => {
        dispatch({ type: 'TOGGLE_SCREEN_COVER', show })
    }
}