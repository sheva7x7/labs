# Labs repository

This repository consists of

- labs_app: A react app that displays a dashboard on the cybersecurity data
- labs_server: An express.js powered server to return some mocked data for the dashboard app

## labs_app

### Get started

```
// install dependencies
npm install

// run dev mode
npm start
```

### Routes

- localhost:3000 : Home page of the dashboard where user can select a client from the dropdown at the right hand side of the top navbar
- localhost:3000/client/:clientId: Client page of the dashboard with 2 tabs: "Assets" and "Hunts" displaying the corresponding cybersecurity data

## labs_server

### Get started

```
// start the server
npm start
```
