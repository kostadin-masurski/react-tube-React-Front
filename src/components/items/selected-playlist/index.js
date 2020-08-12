import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import styles from './index.module.css';
import Context from '../../../Context';

const SelectedPlaylist = () => {
    const context = useContext(Context);
    return (
        <div className={context.selectedSong ? styles.container : null}>
            <h1>{context.selectedPlaylist.name}</h1>
            <img className={context.selectedSong ? styles['playlist-img-small'] : styles['playlist-img-big']}
                src={context.selectedPlaylist.imgUrl} alt="" />
            <Link className={context.selectedSong ? null : styles.block} to="/playlist/edit">
                <Button type="button" variant="dark">Edit Playlist</Button>
            </Link>
        </div>
    )
}

export default SelectedPlaylist;