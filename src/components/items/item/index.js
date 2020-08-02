import React from 'react';
import styles from './index.module.css';

const Item = ({ item }) => {
    return (
        <div className={styles.item}>
            <h4>{item.name}</h4>
            <div>
                <img className={styles['item-img']} src={item.imgUrl} alt="" />
            </div>
        </div>
    )
}

export default Item;