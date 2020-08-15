export const playlistService = {
    DEFAULT_IMG_URL: 'http://www.panachfm.be/wp-content/uploads/2015/05/playlist-illu.jpg',

    async handleResponse(promise) {
        const resJson = await promise.json();
        return resJson;
    },

    loadAll() {
        return fetch('http://localhost:8080/api/playlists').then(promise => {
            return this.handleResponse(promise);
        });
    },

    create(playlist){
        return fetch('http://localhost:8080/api/playlists/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(playlist)
        }).then(promise => {
            return this.handleResponse(promise);
        });
    },

    edit(playlist){
        if (playlist.songs.length === 0) {
            playlist.songs = [{}];
        }

        if (playlist.imgUrl.length === 0) {
            playlist.imgUrl = this.DEFAULT_IMG_URL;
        }

        return fetch('http://localhost:8080/api/playlists/edit', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(playlist)
        }).then(promise => {
            return this.handleResponse(promise);
        });
    }
}