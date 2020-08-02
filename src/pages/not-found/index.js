import React from 'react';
import styles from './index.module.css';
import skull from '../../images/404_skull.png';
import PageLayout from '../../components/core/page-layout';
import Title from '../../components/core/title';

const NotFound = () => {
    return (
        <PageLayout>
            <Title title="Page not found" />
            <div className={styles["img-div"]}>
                <img className={styles["not-found-img"]} src={skull} alt="404" />
            </div>
        </PageLayout>
    )
}

export default NotFound;