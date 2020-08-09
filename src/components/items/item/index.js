import React from 'react';
import styles from './index.module.css';

const Item = ({ item, index }) => {
    return (
        <div className={styles.item} id={index}>
            <h4>{item.name}</h4>
            <img className={styles['item-img']} src={item.imgUrl} alt="" />
        </div>
    )
}

export default Item;