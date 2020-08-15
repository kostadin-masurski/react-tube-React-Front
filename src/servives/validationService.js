const validators = {
    username: (username) => {
        const regex = /[!#$%^&*()+=[\]{};':"\\|,<>/?]/;
        const msg = !regex.test(username) && username.length > 2 && username.length <= 30 ? false : 'Username should be between 3 and 30 symbols long and should contain only alphanumeric symbols, @ or _';
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

    name: (name) => {
        const regex = /[#%^*()+=[\]{};':"\\|,<>/?]/;
        const msg = !regex.test(name) && name.length > 2 && name.length <= 50 ? false : 'Name should be between 3 and 50 symbols long and should contain only alphanumeric symbols, @, $, &, ! or _';
        return {name: name, nameMsg: msg};
    },

    artist: (artist) => {
        const regex = /[#%^*()+=[\]{};':"\\|,<>/?]/;
        const msg = !regex.test(artist) && artist.length > 2 && artist.length <= 50 ? false : 'Artist name should be between 3 and 50 symbols long and should contain only alphanumeric symbols, @, $, &, ! or _';
        return {artist: artist, artistMsg: msg};
    },

    youtubeIdent: (url) => {
        const regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        const msg = url.length === 11 || regex.test(url) ? false : 'Youtube ID is not 11 symbols long or URL is not valid';
        return {youtubeIdent: url, youtubeIdentMsg: msg};
    },

    imgUrl: (url) => {
        const regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        const msg = !url || regex.test(url) ? false : 'Image URL is not valid';
        return {imgUrl: url, imgUrlMsg: msg};
    }
}

export function validate(value, type) { return validators[type](value); }