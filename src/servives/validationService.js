const validators = {
    username: (username) => {
        const regex = /[!#$%^&*()+=[\]{};':"\\|,<>/?]/;
        const msg = !regex.test(username) && username.length > 2 ? false : 'Username should be more than 2 symbols long and should contain only alphanumeric symbols, @ or _';
        return {username: username, usernameMsg: msg};
    },

    email: (email) => {
        const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
        const msg = regex.test(email) ? false : 'Email is not valid';
        return {email: email, emailMsg: msg};
    },

    password: (password) => {
        const msg = password.length > 5 ? false : 'Password should be more than 5 symbols long';
        return {password: password, passwordMsg: msg};
    },

    confirmPassword: (confirmPassword) => {
        const msg = confirmPassword.length > 5 ? false : 'Confirmed password should be more than 5 symbols long';
        return {confirmPassword: confirmPassword, confirmPasswordMsg: msg};
    },

    playlist: (playlist) => {
        const msg = playlist.length > 2 ? false : 'Playlist name should be more than 2 symbols long';
        return {playlist: playlist, playlistMsg: msg};
    },

    imgUrl: (url) => {
        const regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        const msg = !url || regex.test(url) ? false : 'Image URL is not valid';
        return {imgUrl: url, imgUrlMsg: msg};
    }
}

export function validate(value, type) { return validators[type](value); }