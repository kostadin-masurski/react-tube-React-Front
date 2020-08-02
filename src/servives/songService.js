export const songService = {
    loadAll() {
        return fetch('http://localhost:8080/api/songs');
    },

    create(song){
        return fetch('http://localhost:8080/api/songs/add', song);
    },

    getSong(youtubeIdent){
        return fetch('http://localhost:8080/api/songs/' + youtubeIdent);
    }

}