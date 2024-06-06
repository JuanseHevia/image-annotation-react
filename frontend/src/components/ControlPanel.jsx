// TODO: Work in progress, not prioritary right now
import React, {Component} from "react";
import styles from './ControlPanel.module.scss';
import { connect, useDispatch } from "react-redux";
import { clearAnnotations, fetchAnnotations, saveAnnotations } from "@/actions";
import Modal from "./Modal";
import ModalForm from "./ModalForm";

const ControlPanel = (props) => {
    const { imageId, clearAnnotations, saveAnnotations, annotations } = props;
    const dispatch = useDispatch();
    const [showModal, setShowModal] = React.useState(false);

    const handleClear = () => {
        clearAnnotations(imageId);
    }

    const handleSave = () => {
        saveAnnotations(imageId, annotations.unsavedAnnotations);
    }

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className={styles.controlPanelContainer}>
            <div className={styles.controlPanel}>
                <button className={styles.uploadButton} onClick={handleOpenModal}>Upload Image</button>
                <Modal show={showModal} handleClose={handleCloseModal}>
                    <ModalForm handleClose={handleCloseModal} />
                </Modal>


                <button className={styles.clearButton} onClick={handleClear}>Clear Annotations</button>
                <button className={styles.saveButton} onClick={handleSave}>Save Annotations</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    annotations: state.annotations
})

const mapDispatchToProps = (dispatch) => {
    return {
        clearAnnotations: (imageId) => dispatch(clearAnnotations(imageId)),
        saveAnnotations: (imageId, unsavedAnnotations) => dispatch(saveAnnotations(imageId, unsavedAnnotations))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);