# Dionysus-browser

A client for Flixtor, adding functionality like

- tracking latest show releases
- tracking watched shows

![Dionysius page showing a tv show](screenshots/home.png 'Dionysius show page')

## Structure

This project contains two main components, an `express.js` store in `api/`, and a Vue3 PWA in `src/`

### Installation

To start a local dev server:

1. Git clone this repository
2. Inside the directory, install dependencies by typing `npm install`
3. Change into the `api` directory by typing `cd api`
4. Start the backend server `node server.js`
5. Start the frontend web server from the root of the project: `cd .. && npm run dev`
