const express = require('express');
const app = express();
const path = require('path');
const port = process.env['PORT'] || 3000;
const server = require('http').Server(app);


// Serve only the static files form the angular app directory
app.use(express.static(__dirname + '/personal-budget-frontend/personal-budget-frontend'));

app.get('/*', function(req: any, res: { sendFile: (arg0: any) => void; }) {

res.sendFile(path.join(__dirname+'/personal-budget-frontend/personal-budget-frontend/index.html'));
});

// Start the app by listening on the default Heroku port


server.listen(port, function () {
    console.log("App running on port " + port);
})
