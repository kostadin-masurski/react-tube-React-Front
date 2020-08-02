import React from 'react';
import styles from './index.module.css';

const Title = ({ title }) => {
    return (
        <div>
        <h1 className={styles["text-center"]}>{title}</h1>
        <hr />
        </div>
    )
}

export default Title;