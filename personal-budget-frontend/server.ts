import express from "express";

//Install express server
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/personal-budget-frontend'));

app.get('/', function(req:express.Request, res:express.Response){

res.sendFile(path.join(__dirname+'/dist/personal-budget-frontend/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env['PORT'] || 8080);
