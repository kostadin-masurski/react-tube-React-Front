import React from 'react';

const Context = React.createContext({
  user: null,
  logIn: () => {},
  logOut: () => {},
  selectedSong: null,
  allSongs: [],
  selectSong: () => {},
  loadAllSongs: () => {}
})

export default Context