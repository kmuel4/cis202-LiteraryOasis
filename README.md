<h1 align="center"> Literary Oasis </h1>

- Desktop application for the Literary Oasis bookstore startup
- Renders a React.js app in an Electron.js desktop window

## *What does it do?*

- Search book details including location in store
- Add new customer profiles
- Purchase books in checkout

## *Have a look*
### Home page
![Home](https://github.com/kmuel4/cis202-LiteraryOasis/blob/master/PresenationFiles/Screenshots/home.png)
### Book search
![Book Search](https://github.com/kmuel4/cis202-LiteraryOasis/blob/master/PresenationFiles/Screenshots/search.png)
### Search book collection
![Similar Books](https://github.com/kmuel4/cis202-LiteraryOasis/blob/master/PresenationFiles/Screenshots/similarbooks.png)
### Book details
![Book Details](https://github.com/kmuel4/cis202-LiteraryOasis/blob/master/PresenationFiles/Screenshots/bookdetails.png)
### Checkout
![Checkout](https://github.com/kmuel4/cis202-LiteraryOasis/blob/master/PresenationFiles/Screenshots/checkout.png)
### Video Demo
[![Video Demo]
(https://github.com/kmuel4/cis202-LiteraryOasis/blob/master/PresenationFiles/Screenshots/home.png)
(https://www.youtube.com/watch?v=8Y5dNJqfMpA)

### `npm install`

install react app dependencies

### `npm i electron`

install electron dependencies

### `npm install react-bootstrap boostrap`

installs bootstrap

### `npm i --save @fortawesome/fontawesome-svg-core`

svg core for font awesome

### `npm i --save @fortawesome/free-solid-svg-icons`
### `npm i --save @fortawesome/free-regular-svg-icons`

font awesome icon packages

### `npm i --save @fortawesome/react-fontawesome@latest`

adds react component

### `npm run build`

compiles into build mode

### `yarn run:electron`

launch the app

## package.json dependencies should look like this
```ruby
{
  "name": "literary-oasis",
  "version": "0.1.0",
  "private": true,
  "homepage": "./",
  "main": "public/main.js",
  "author": "Kurt Mueller",
  "description": "Literary Oasis App",
  "license": "SUNY Brockport",
  "copyright": "Copyright © 2023 Kurt Mueller",
  "dependencies": {
    "@fortawesome/fontawesome-svg-core": "^6.4.0",
    "@fortawesome/free-solid-svg-icons": "^6.4.0",
    "@fortawesome/react-fontawesome": "^0.2.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "bootstrap": "^5.2.3",
    "electron": "^24.1.2",
    "react": "^18.2.0",
    "react-bootstrap": "^2.7.2",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4",
    "yarn": "^1.22.19"
  },
  "scripts": {
    "start": "concurrently \"react-scripts start\" \"electron . --ignore-certificate-errors\"",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "electron:start": "concurrently -k \"cross-env BROWSER=none yarn start\" \"wait-on http://localhost:3000 && electronmon .\"",
    "electron:package:mac": "yarn build && electron-builder -m -c.extraMetadata.main=build/electron.js",
    "electron:package:win": "yarn build && electron-builder -w -c.extraMetadata.main=build/electron.js",
    "electron:package:linux": "yarn build && electron-builder -l -c.extraMetadata.main=build/electron.js"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      "last 1 electron version",
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 electron version",
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "concurrently": "^8.0.1",
    "cross-env": "^7.0.3",
    "electron-builder": "^23.6.0",
    "electronmon": "^2.0.2",
    "wait-on": "^7.0.1"
  },
  "build": {
    "appId": "com.electron.myapp",
    "productName": "Literary Oasis",
    "files": [
      "build/**/*",
      "node_modules/**/*"
    ],
    "directories": {
      "buildResources": "public"
    },
    "mac": {
      "target": "dmg"
    },
    "win": {
      "target": "nsis",
      "icon": "public\book.ico"
    },
    "linux": {
      "target": "deb"
    }
  }
}

```
# Launching the Build
run the LiteraryOasis.bat file or make a shortcut to run the build

### `yarn run:electron`

command to run the electron app from a bat file








