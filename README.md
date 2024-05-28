# Project Structure

This repository contains the code for my Image Annotation application, which is divided into two main directories: backend and frontend.

The main goal of this exercise was to learn React and have a basic SPA that allows users to upload images and annotate them with bounding boxes. The backend is built with Flask and the frontend with Next.js.

## Backend

The `backend` directory contains the code for the backend of our application. It is built with Flask and follows a typical Flask project structure.

### Directory Structure

- `app.py`: This is the main entry point of our Flask application. It creates the Flask app and sets up the routes.
- `models/`: This directory contains the SQLAlchemy models for our application. Each file corresponds to a table in the database.
- `routes/`: This directory contains the route definitions for our application. Each file corresponds to a different part of the API.

## Frontend

The frontend directory contains the code for the frontend of our application. It is built with Next.js and Redux, and follows a typical Next.js project structure.

### Directory Structure
`src/`: This directory contains the main source code for the frontend application.
- `actions/`: This directory contains Redux actions for managing state related to images and annotations.
- `components/`: This directory contains React components used in the application. Each file corresponds to a different component.
- `reducers/`: This directory contains Redux reducers for managing state related to images and annotations.
- `pages/`: This directory contains the main pages of the application. Each file corresponds to a different route in the application.
- `styles/`: This directory contains CSS modules for styling the application.

- `store.js`: This file sets up the Redux store for state management.

### How it Works
The frontend application is built with Next.js, a React-based framework for building web applications. It uses Redux for state management.

The application's main entry point is `_app.js`, which wraps the application with the Redux provider.

The pages directory contains the main pages of the application. The `index.js` file corresponds to the home page, which displays an image and a control panel for managing annotations.

The src directory contains the main source code for the application. The actions directory contains Redux actions for managing state related to images and annotations. The reducers directory contains Redux reducers for managing this state.

The components directory contains React components used in the application. The ImageComponent component displays an image and handles click events for adding annotations. The ControlPanel component provides buttons for managing annotations.

The styles directory contains CSS modules for styling the application. Each file corresponds to a different component or page.

To start the development server, run one of the following commands:

```
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then, open http://localhost:3000 with your browser to see the result. The page auto-updates as you edit the file.