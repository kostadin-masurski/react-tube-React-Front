import React from 'react';
import styles from './index.module.css';

const Player = () => {
    return (
        <div>
            <h1 className={styles.title}>Artist -Song</h1>
            <iframe title="player"
                className={styles["half-frame"]}
                src={"https://www.youtube.com/embed/" + "kFeZdHBKFhI" + "?autoplay=1"}
                frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope" allowFullScreen={true}>
            </iframe>
        </div>
    )
}

export default Player;