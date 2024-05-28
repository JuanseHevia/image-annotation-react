// TODO: Work in progress, not prioritary right now
import React, {Component} from "react";
import styles from './ControlPanel.module.css';
import { connect } from "react-redux";
import { clearAnnotations, fetchAnnotations, saveAnnotations } from "@/actions";

const ControlPanel = (props) => {
    const { imageId, clearAnnotations, saveAnnotations, annotations } = props;

    const handleClear = () => {
        clearAnnotations(imageId);
    }

    const handleSave = () => {
        saveAnnotations(imageId, annotations.unsavedAnnotations);
    }

    return (
        <div className={styles.controlPanelContainer}>
            <div className={styles.controlPanel}>
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