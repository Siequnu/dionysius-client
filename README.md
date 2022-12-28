# Dionysus-browser

A client for managing movies, adding functionality like

- tracking latest show releases
- tracking watched shows

![Dionysius page showing a tv show](screenshots/home.png 'Dionysius show page')

## Structure

This project contains two main components, an `express.js` store in `api/`, and a Vue3 PWA in `src/`

### Tech stack

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" title="JavaScript"><img src="https://github.com/get-icon/geticon/raw/master/icons/javascript.svg" alt="JavaScript" width="21px" height="21px"></a>
<a href="https://vuejs.org/" title="Vue.js"><img src="https://github.com/get-icon/geticon/raw/master/icons/vue.svg" alt="Vue.js" width="21px" height="21px"></a>
<a href="https://www.w3.org/TR/CSS/" title="CSS3"><img src="https://github.com/get-icon/geticon/raw/master/icons/css-3.svg" alt="CSS3" width="21px" height="21px"></a>
<a href="https://sass-lang.com/" title="Sass"><img src="https://github.com/get-icon/geticon/raw/master/icons/sass.svg" alt="Sass" width="21px" height="21px"></a>
<a href="https://tailwindcss.com/" title="Tailwind CSS"><img src="https://github.com/get-icon/geticon/raw/master/icons/tailwindcss-icon.svg" alt="Tailwind CSS" width="21px" height="21px"></a>
<a href="https://www.w3.org/TR/html5/" title="HTML5"><img src="https://github.com/get-icon/geticon/raw/master/icons/html-5.svg" alt="HTML5" width="21px" height="21px"></a>
<a href="https://nodejs.org/" title="Node.js"><img src="https://github.com/get-icon/geticon/raw/master/icons/nodejs-icon.svg" alt="Node.js" width="21px" height="21px"></a>
<a href="https://expressjs.com/" title="Express"><img src="https://github.com/get-icon/geticon/raw/master/icons/express.svg" alt="Express" width="21px" height="21px"></a>
<a href="https://git-scm.com/" title="Git"><img src="https://github.com/get-icon/geticon/raw/master/icons/git-icon.svg" alt="Git" width="21px" height="21px"></a>
<a href="https://www.npmjs.com/" title="npm"><img src="https://github.com/get-icon/geticon/raw/master/icons/npm.svg" alt="npm" width="21px" height="21px"></a>
<a href="https://vitejs.dev/" title="Vite"><img src="https://github.com/get-icon/geticon/raw/master/icons/vite.svg" alt="Vite" width="21px" height="21px"></a>
<a href="https://eslint.org/" title="ESLint"><img src="https://github.com/get-icon/geticon/raw/master/icons/eslint.svg" alt="ESLint" width="21px" height="21px"></a>
<a href="https://prettier.io/" title="Prettier"><img src="https://github.com/get-icon/geticon/raw/master/icons/prettier.svg" alt="Prettier" width="21px" height="21px"></a>
<a href="https://code.visualstudio.com/" title="Visual Studio Code"><img src="https://github.com/get-icon/geticon/raw/master/icons/visual-studio-code.svg" alt="Visual Studio Code" width="21px" height="21px"></a>
<a href="https://www.docker.com/" title="docker"><img src="https://github.com/get-icon/geticon/raw/master/icons/docker-icon.svg" alt="docker" width="21px" height="21px"></a>

### Installation

To start a local dev server:

1. Git clone this repository
2. In the root of the repository, copy `.env.sample` to `.env`, and add your favourite movie provider in the `VITE_SOURCE_BASE_URL` variable
3. Install project dependencies by typing `npm install`
4. Change into the `api` directory by typing `cd api`
5. Start the backend server `node server.js`
6. Start the frontend web server from the root of the project: `cd .. && npm run dev`
