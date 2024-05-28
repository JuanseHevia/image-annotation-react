import * as constants from  '../actions/constants';

const initialState = {
    image: null,
};

const imageViewerReducer = (state = initialState, action) => {
    switch (action.type) {

        case constants.SET_IMAGE:
            return {
                ...state,
                image: {
                    url: action.payload.url,
                    filename: action.payload.filename,
                    id: action.payload.id
                }
            }    
        ;
        
        default:
            return state;

    }
};

export default imageViewerReducer;