import React from 'react';
import styles from './index.module.css';

const Footer = () => {
    return (
        <footer>
            <a className={styles['footer-a']} href="/">&#169; У Туба</a>
            <a className={styles['footer-a']} href="/">About</a>
            <a className={styles['footer-a']} href="/">Contact us</a>
        </footer>
    )
}

export default Footer;