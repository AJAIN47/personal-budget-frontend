//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/personal-budget-frontend'));

app.get('/*', function(req: any,res: { sendFile: (arg0: any) => void; }) {

res.sendFile(path.join(__dirname+'/dist/personal-budget-frontend/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env['PORT'] || 8080);
