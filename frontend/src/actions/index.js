import * as constants from './constants.js';

export const addAnnotation = (annotation) => {
  return {
    type: constants.ADD_ANNOT,
    payload: annotation,
  }
};


export const setImage = (imageData) => ({
  type: constants.SET_IMAGE,
  payload: imageData,
});

export const fetchImage = (imageId) => async (dispatch) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/images/${imageId}`);
    if (!response.ok) {
      throw new Error(`Network response was not ok at fetchImage: ${response.json().message}`);
    }
    const imageData = await response.json();
    dispatch(setImage(imageData));
  } catch (error) {
    console.error('Fetch image failed:', error);
  }
};

// Annotation Actions
export const fetchAnnotations = (imageId) => async (dispatch) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/annotations/images/${imageId}`);
    if (!response.ok) {
      throw new Error(`Network response was not ok at fetchAnnotations: ${response.status}`);
    }
    const annotations = await response.json();
    const processedAnnotations = annotations.map((annotation) => {
      return {
        x: annotation.annotation_x,
        y: annotation.annotation_y,
      }
    })

    dispatch(setAnnotations(processedAnnotations));
  }
  catch (error) {
    console.error('Fetch annotations failed:', error);
  }
}

export const setAnnotations = (annotations) => ({
  type: constants.SET_ANNOTATIONS,
  payload: annotations,
});

export const clearAnnotations = (imageId) => async (dispatch) => {
  // TODO:
  // make a DELETE request to the server with the image ID
  // then dispatch the action to clear the annotations
  const response = await fetch(`http://127.0.0.1:5000/annotations/images/${imageId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );

  if (!response.ok) {
    console.error('Failed to clear annotations:', response);
  }
  
  dispatch({
    type: constants.CLEAR_ANNOTS,
  })

}


export const saveAnnotations = (imageId, unsavedAnnotations) => async (dispatch) => {
  // TODO:
  // make a POST request to the server with the image ID and annotations
  // then dispatch the action to save the annotations
  const annotations = unsavedAnnotations.map((annotation) => {
    return {
      image_id: imageId,
      x: annotation.x,
      y: annotation.y,
      user_id: 9999,
    }
  });

  // TODO: adapt the methods to allow for saving annotation batches
  const response = await fetch('http://127.0.0.1:5000/annotations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({stored_data : annotations}),
    });

  if (!response.ok) {
    console.error('Failed to save annotations:', response);
  }

  dispatch({
    type: constants.SAVE_ANNOTS,
  });

}