import React from 'react';

const Context = React.createContext({
  user: null,
  logIn: () => {},
  logOut: () => {},
  playlists: [],
  selectedPlaylist: {},
  selectPlaylist: () => {},
  loadPlaylists: () => {},
  allSongs: [],
  selectedPlaylistSongs: [],
  selectedSong: null,
  selectSong: () => {},
  loadAllSongs: () => {}
})

export default Context