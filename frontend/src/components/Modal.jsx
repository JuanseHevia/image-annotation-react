import React from 'react';
import styles from './Modal.module.scss';

const Modal = ({ show, handleClose, children }) => {
    return (
        <div className={show ? styles.modalDisplayBlock : styles.modalDisplayNone}>
            <section className={styles.modalMain}>
                {children}
                <button onClick={handleClose} className={styles.closeButton}>Close</button>
            </section>
        </div>
    );
};

export default Modal;