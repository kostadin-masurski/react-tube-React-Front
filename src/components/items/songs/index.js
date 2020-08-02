import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import { songService } from '../../../servives/songService'
import styles from './index.module.css';
import Item from '../item';

class Songs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: [],
            selectPlaylistInces: 0
        }
    }

    async loadAllSongs() {
        const songs = await (await songService.loadAll()).json();
        this.setState({
            songs
        })
    }

    renderSongs() {
        const { songs } = this.state;
        return songs.map((song, index) => {
            return (
                <Item item={song} key={index} />
            )
        })
    }

    componentDidMount() {
        this.loadAllSongs();
    }

    render() {
        return (
            <div className={styles.scroll}>
                <h1>Songs</h1>
                <Button variant="dark">All songs</Button>
                {this.renderSongs()}
            </div>
        )
    }
}

export default Songs;