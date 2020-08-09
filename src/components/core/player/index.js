import React, { useContext } from 'react';
import styles from './index.module.css';
import Context from '../../../Context';

const Player = () => {
    const context = useContext(Context);

    return (
        <div>
            <h1 className={styles.title}>Artist -Song</h1>
            <iframe title="player"
                className={styles["half-frame"]}
                src={"https://www.youtube.com/embed/" + context.selectedSong.youtubeIdent + "?autoplay=1"}
                frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope" allowFullScreen={true}>
            </iframe>
        </div>
    )
}

export default Player;