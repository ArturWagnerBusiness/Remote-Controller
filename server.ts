import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as path from 'path';
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(session({
	secret: 'a7j~2;pY4}s@].np#@x+372',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

/*
 * Returns:
 * False  - Not logged in / Login failed
 * True   - Logged in     / Login successfull
 */
app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		if (
      username === "admin7" &&
			password === "password7"
    ) {
			//@ts-ignore
			request.session.loggedin = true;
			//@ts-ignore
			request.session.username = username;
			response.redirect('/');
		} else {
			response.redirect('/');
		}			
		response.end();
	} else {
		//@ts-ignore
		if (request.session.loggedin) {
			response.send('true');
		} else {
			response.send('false');
		}
		response.end();
	}
});

app.post('/ping', function(request, response) {
	response.send('pong');
	response.end();
})

app.use(function(req, res, next){
    res.status(404);
    if (req.accepts('html')) {
      res.send("404: Couldn't find "+ req.url);return;
    }
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });return;
    }
    res.type('txt').send('Not found');
  });

app.listen(80, '192.168.0.25'); // User your own IPV4 Address
