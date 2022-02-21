import React from 'react';
import styles from './ErrorPage.module.css';

export const ErrorPage = () => {
    return (
        <div className={styles.errorWrapper}>
            <div className={`${styles.text404} ${styles.gradient}`}>404</div>
            <div className={`${styles.notFound} ${styles.gradient}`}>Page not found!</div>
            <div className={`${styles.picture} ${styles.gradient}`}>—ฅ/ᐠ.̫ .ᐟ\ฅ—</div>
        </div>
    );
};