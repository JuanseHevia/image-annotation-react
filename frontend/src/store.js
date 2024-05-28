import { configureStore } from "@reduxjs/toolkit";
import imageViewerReducer from "./reducers/imageViewerReducer";
import controlPanelReducer from "./reducers/controlPanelReducer";

const store = configureStore({
    reducer: {
        annotations: controlPanelReducer,
        image: imageViewerReducer,
    },
});

export default store;