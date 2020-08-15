import React, { useContext, useEffect, useCallback, useMemo } from 'react';
import { playlistService } from '../../../servives/playlistService'
import styles from './index.module.css';
import Item from '../item';
import Context from '../../../Context';

const Playlists = () => {
    const context = useContext(Context);

    const loadAllPlaylists = useCallback( async () => {
        const playlists = await playlistService.loadAll();
        context.loadPlaylists(playlists);
    }, [context])

    const renderPlaylists = useMemo(() => {
        return context.playlists.map((playlist, index) => {
            return (
                <Item item={playlist} index={index} key={index} />
            )
        })
    }, [context.playlists])

    useEffect(() => {
        loadAllPlaylists();
    }, [])

    return (
        <div className={styles.scroll} onClick={ev => context.selectPlaylist(context.playlists[ev.target.id ? ev.target.id : ev.target.parentNode.id])}>
            <h1>Playlists</h1>
            {renderPlaylists}
        </div>
    )
}

export default Playlists;