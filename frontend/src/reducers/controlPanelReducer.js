import * as constants from '../actions/constants';

const initialState = {
    annotations: [],
    unsavedAnnotations: []
}

const controlPanelReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.ADD_ANNOT:
            return {
                ...state,
                unsavedAnnotations: [...state.unsavedAnnotations, action.payload],
            };

        case constants.SAVE_ANNOTS:
            // clear annotations and save them to the database
            return {
                ...state,
                annotations: [...state.annotations, ...state.unsavedAnnotations],
                unsavedAnnotations: []
            };

        case constants.CLEAR_ANNOTS:
            // clear annotations
            return { ...state, annotations: [], unsavedAnnotations: [] };

        case constants.SET_ANNOTATIONS:
            // fetch annotations from the database
            return {
                ...state,
                annotations: action.payload
            };

        default:
            return { ...state };
    }
}

export default controlPanelReducer;