import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadImage } from '@/actions';
import styles from './ModalForm.module.scss';
import * as constants from '../actions/constants';

const ModalForm = ({ handleClose }) => {
    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState('');
    const [filename, setFilename] = useState('');

    const handleUrlChange = (event) => {
        setImageUrl(event.target.value);
    };

    const handleFilenameChange = (event) => {
        setFilename(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (imageUrl === '' || filename === '') {
            return;
        };
        dispatch(uploadImage(imageUrl, filename));
        handleClose(); // Close the modal after submitting
    };

    return (
        <div className={styles.uploadFormContainer}>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="imageUrl">Image URL</label>
                    <input
                        type="text"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={handleUrlChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="filename">Filename</label>
                    <input
                        type="text"
                        id="filename"
                        value={filename}
                        onChange={handleFilenameChange}
                    />
                </div>
                <input type="submit" value="Set Image" className={styles.btn} />
            </form>
        </div>
    );
};

export default ModalForm;