export const getUserFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('USER') || 'null')
}
export const setUserToLocalStorage = (user) => {
    return localStorage.setItem('USER', JSON.stringify(user))
}

