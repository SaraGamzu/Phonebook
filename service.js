
var express = require('express');
var routes = require('./routes');
var http = require('http');
var controllers = require('./api');
var bodyParser = require("body-parser");

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));
app.use("/node_modules", express.static('node_modules'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use('/', require('./routes/routes.js'));


//app.all('/*', function (request, response, next) {
//	if (request.method == 'OPTIONS') {
//		response.status(200).end();
//	} else {
//		next();
//	}
//});

// Map the routes
controllers.init(app);

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
