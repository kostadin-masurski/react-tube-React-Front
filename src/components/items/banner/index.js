import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import PageLayout from '../../core/page-layout';

const Banner = () => {
    return (
        <PageLayout >
            <div className={styles.banner}>
                <h1 className={styles['banner-h1']} >
                    Vue Tuba - <Link to="/register" className={styles.link}>Register</Link> to create your own YouTube playlists!
            <br />No advertising! Enjoy!
            </h1>
            </div>
        </PageLayout>
    )
}

export default Banner;