import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './index.module.css';
import PageLayout from '../../core/page-layout';
import UserContext from '../../../Context';

const Banner = () => {
    const context = useContext(UserContext);
    const history = useHistory();
    return (
        <PageLayout >
            <div className={styles.banner}>
                {context.user ?
                <h1 className={styles['banner-h1']} >
                    Vue Tuba - <Link to="/playlist/create" className={styles.link}>Create</Link> your own YouTube playlists!
                    <br />No advertising! Enjoy!
                </h1>
                :
                <h1 className={styles['banner-h1']} >
                    Vue Tuba - <Link to="/register" className={styles.link}>Register</Link> to create your own YouTube playlists!
                    <br />No advertising! Enjoy!
                </h1>}
            </div>
        </PageLayout>
    )
}

export default Banner;