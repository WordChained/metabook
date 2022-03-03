
export function makeId(length = 5) {
    var text = "";
    var possible = "0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
export function makeIdWithLetters(length = 5) {
    var text = "";
    var possible = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPUVWXYZ";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

const _validateEmail = (email) => {
    const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    return emailRegex.test(email)
}
const _validatePassword = (password) => {
    const passwordRegex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,32}$/)
    // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ ===> Capital and lower case, 8-32 long.
    // /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/ ===> Capital and lower case, 8-32 long, special characters.
    return passwordRegex.test(password)
}
const _validateName = (name) => {
    const nameRegex = new RegExp(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/)
    // no numbers, no spaces, no special characters
    return nameRegex.test(name)
}
export function validate(type, data) {
    console.log('validating');
    switch (type) {
        case 'email':
            // console.log('validating email...');
            return _validateEmail(data)
        case 'password':
            // console.log('validating password...');
            return _validatePassword(data)
        case 'name':
            // console.log('validating name...');
            return _validateName(data)
        default:
            return false;
    }
}

export function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}
export function getTitledName(name) {
    let fullName;
    if (name.middle) {
        fullName = name.first + " " + name.middle + " " + name.last
    } else {
        fullName = name.first + " " + name.last;
    }
    return titleCase(fullName);
};
