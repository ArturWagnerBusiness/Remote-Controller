import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as path from 'path';
const app = express();

/*
var mysql = require('mysql');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'nodelogin'
});
*/

app.use(express.static(path.join(__dirname, 'build')));
app.use(session({
	secret: 'a7j~2;pY4}s@].np#@x+372',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		if (
            username === "eis3" &&
            password === "password"
        ) {
			//@ts-ignore
			request.session.loggedin = true;
			//@ts-ignore
			request.session.username = username;
			response.redirect('/desktop');
		} else {
			response.send('Incorrect Username and/or Password!');
		}			
		response.end();
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/desktop', function(request, response) {
	//@ts-ignore
	if (request.session.loggedin) {
		response.send('Logged in!');
        // response.sendFile(path.join(__dirname + '/desktop.html'));
	} else {
        response.redirect('/');
	}
	response.end();
});

app.use(function(req, res, next){
    res.status(404);
  
    // respond with html page
    if (req.accepts('html')) {
      res.send("404: Couldn't find "+ req.url);
      return;
    }
  
    // respond with json
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }
  
    // default to plain-text. send()
    res.type('txt').send('Not found');
  });

app.listen(process.env.PORT || 80);
