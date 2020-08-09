import React, { useContext, useEffect, useCallback, useMemo } from 'react';
import { Button } from 'react-bootstrap'
import { songService } from '../../../servives/songService'
import styles from './index.module.css';
import Item from '../item';
import Context from '../../../Context';

const Songs = () => {
    const context = useContext(Context);

    const loadAllSongs = useCallback( async () => {
        const songs = await (await songService.loadAll()).json();
        context.loadAllSongs(songs);
    }, [context])

    const renderSongs = useMemo(() => {
        return Object.values(context.allSongs).map((song, index) => {
            return (
                <Item item={song} index={index} key={index} />
            )
        })
    }, [context.allSongs])

    useEffect(() => {
        loadAllSongs();
    }, [loadAllSongs])

    const showAllSongs = () => {
        console.log(context.selectedSong)
    }

    return (
        <div className={styles.scroll} onClick={ev => context.selectSong(context.allSongs[ev.target.parentNode.id])}>
            <h1>Songs</h1>
            <Button onClick={ev => showAllSongs()} variant="dark">All songs</Button>
            {renderSongs}
        </div>
    )
}

export default Songs;