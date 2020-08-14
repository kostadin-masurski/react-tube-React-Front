export const playlistService = {
    loadAll() {
        return fetch('http://localhost:8080/api/playlists');
    },

    create(playlist){
        return fetch('http://localhost:8080/api/playlists/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(playlist)
        });
    },

    edit(playlist){
        return fetch('http://localhost:8080/api/playlists/edit', playlist);
    }

}