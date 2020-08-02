import React, { Component } from 'react';
import { playlistService } from '../../../servives/playlistService'
import styles from './index.module.css';
import Item from '../item';

class Playlists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: [],
            selectPlaylistInces: 0
        }
    }

    async loadAllPlaylists() {
        const playlists = await (await playlistService.loadAll()).json();
        this.setState({
            playlists
        })
    }

    renderPlaylists() {
        const { playlists } = this.state;
        return playlists.map((playlist, index) => {
            return (
                <Item item={playlist} key={index} />
            )
        })
    }

    componentDidMount() {
        this.loadAllPlaylists();
    }

    render() {
        return (
            <div className={styles.scroll}>
                <h1>Playlists</h1>
                {this.renderPlaylists()}
            </div>
        )
    }
}

export default Playlists;