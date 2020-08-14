const validators = {
    playlist: (playlist) => {
        const msg = playlist.length > 2 ? false : 'Playlist name should be more than 3 symbols long';
        return {playlist: playlist, playlistMsg: msg};
    },

    imgUrl: (url) => {
        const regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        const msg = regex.test(url) ? false : 'Image URL is not valid';
        return {imgUrl: url, imgUrlMsg: msg};
    }
}

export function validate(value, type) { return validators[type](value); }