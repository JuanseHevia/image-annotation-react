import React, { useState, useEffect, Component } from "react";
import { addAnnotation, fetchImage, fetchAnnotations } from '../actions/index';
import { connect } from "react-redux";
import styles from './ImageComponent.module.css';


const ImageComponent = (props) => {

    const { fetchImage, fetchAnnotations, imageId, imageViewer, controlPanel, addAnnotation } = props;

    // image click handler for drawing annotations
    const handleImageClick = (event) => {
        const rect = event.target.getBoundingClientRect();
        const { addAnnotation } = props;
        const x = parseInt(event.clientX - rect.left);
        const y = parseInt(event.clientY - rect.top);

        // save to state store
        addAnnotation({ x: x, y: y });
        
        console.log("Clicked at: " + x + ", " + y);
    }

    // get image to display
    useEffect(() => {
        fetchImage(imageId);
        fetchAnnotations(imageId);
    }, [fetchImage, fetchAnnotations, imageId]);
    
    if (!imageViewer.image) {
        return <div>Loading...</div>;
    }
    
    // unpack all annotations, both saved and unsaved
    const allAnnotations = [...controlPanel.annotations, ...controlPanel.unsavedAnnotations];

    return (
        <div className={styles.imageContainer}>
            <img
                src={imageViewer.image.url}
                alt={imageViewer.image.filename}
                onClick={handleImageClick}
                className={styles.imageComponent}
            />
            {(allAnnotations.length > 0) &&
                allAnnotations.map((click, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            top: click.y,
                            left: click.x,
                            width: '10px',
                            height: '10px',
                            backgroundColor: 'red',
                            borderRadius: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    ></div>
                ))
            }
        </div>
    )

}

const mapStateToProps = (state) => ({
    controlPanel: state.annotations,
    imageViewer: state.image
});

const mapDispatchToProps = (dispatch) => ({
    addAnnotation: (annotation) => dispatch(addAnnotation(annotation)),
    fetchImage: (imageId) => dispatch(fetchImage(imageId)),
    fetchAnnotations: (imageId) => dispatch(fetchAnnotations(imageId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageComponent);