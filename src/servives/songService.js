export const songService = {
    DEFAULT_IMG_URL: 'https://ae01.alicdn.com/kf/HTB1WQdVSXXXXXbJXFXXq6xXFXXXS/3d-DJ.jpg_960x960.jpg',

    async handleResponse(promise) {
        const resJson = await promise.json();
        return resJson;
    },

    loadAll() {
        return fetch('http://localhost:8080/api/songs');
    },

    create(song){
        return fetch('http://localhost:8080/api/songs/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(song)
        });
    },

    getSong(youtubeIdent){
        return fetch('http://localhost:8080/api/songs/' + youtubeIdent).then(promise => {
            return this.handleResponse(promise);
        });
    }

}