import React, { useState, useEffect, useCallback } from 'react';
import Context from './Context';
import './App.css';
import Router from './router';
import Player from './components/core/player'
import { userService } from './servives/userService';

function App(props) {
  const [user, setUser] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [allSongs, setAllSongs] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylistSongs, setSelectedPlaylistSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const logIn = (user) => {
    setUser({
      ...user
    })
  }

  const logOut = () => {
    document.cookie = "x-auth-token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    setUser(null);
  }

  const selectPlaylist = (playlist, songs) => {
    if (playlist) {
      setSelectedPlaylist({
        ...playlist
      });

      const playlistSongs = playlist.songs;
      setSelectedPlaylistSongs(playlistSongs);
      return;
    }

    if (songs) { setSelectedPlaylistSongs(songs); }
  }

  const loadPlaylists = (playlists) => {
    setPlaylists(playlists)
  }

  const selectSong = (song) => {
    if (song) { setSelectedSong({ ...song }); }
  }

  const loadAllSongs = (allSongs) => {
    setAllSongs(allSongs)
  }

  const authenticate = useCallback(async () => {
    const response = await userService.login();
    if (response.message) {
      logOut();
      setLoading(false);
      return;
    }

    logIn(response);
    setLoading(false);
  }, [])

  useEffect(() => {
    const token = userService.getCookie('x-auth-token');
    if (!token) {
      logOut();
      setLoading(false);
      return;
    }

    authenticate();
  }, [authenticate])

  if (loading) {
    return (
      <div>Loading....</div>
    )
  }

  return (
    <div className="App">
      <Context.Provider value={{
        user,
        logIn,
        logOut,
        playlists,
        selectedPlaylist,
        selectPlaylist,
        loadPlaylists,
        selectedSong,
        selectedPlaylistSongs,
        allSongs,
        selectSong,
        loadAllSongs
      }}>
        {props.children}
        {selectedSong ? <Player /> : null}
        <Router />
      </Context.Provider>
    </div>
  );
}

export default App;
