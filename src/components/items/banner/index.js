import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import Context from '../../../Context';

const Banner = () => {
    const context = useContext(Context);
    return (
        <div className={styles.banner}>
            <h1 className={styles['banner-h1']} >Vue Tuba - 
                <Link to={context.user ? "/playlist/create" : "/register"} className={styles.link}>
                    {context.user ? 'Create' : 'Register'}
                </Link>
                {context.user ? ' ' : ' to create '}your own YouTube playlists!
                <br />No advertising! Enjoy!
            </h1>
        </div>
    )
}

export default Banner;