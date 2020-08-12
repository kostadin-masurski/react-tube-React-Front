import React, { useContext } from 'react';
import styles from './index.module.css';
import Context from '../../../Context';

const Player = () => {
    const context = useContext(Context);

    return (
        <div className={styles.player}>
            <h3 className={styles.title}>{context.selectedSong.artist} - {context.selectedSong.name}</h3>
            <iframe title="player"
                className={styles["half-frame"]}
                src={"https://www.youtube.com/embed/" + context.selectedSong.youtubeIdent + "?autoplay=1"}
                frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope" allowFullScreen={true}>
            </iframe>
        </div>
    )
}

export default Player;