const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const http = require('http').Server(app);

const hostname = '127.0.0.1';
const port = 3000;

app.use(express.json());

//cabeceras CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", ["Origin", "X-Requested-With", "Content-Type", "Accept"]);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); 
  next();
});


const routesDirectory = path.join(__dirname, 'src', 'routes');
const routeFiles = fs.readdirSync(routesDirectory);

routeFiles.forEach((routeFile) => {
  const routePath = path.join(routesDirectory, routeFile);
  const routeModule = require(routePath);

  if (typeof routeModule === 'function') {
    app.use(routeModule);
  }
});


http.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});