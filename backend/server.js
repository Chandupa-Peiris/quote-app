const express = require('express')
const app = express();
require('dotenv').config();
const dbConnect = require('./config/db');
const User = require("./models/User");
const auth = require("./routes/auth");
const quotes = require("./routes/quotes");
const cors = require('cors');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwtOptions = require('./config/jwt');

const HTTP_PORT = process.env.PORT || 8080;

let JwtStrategy = passportJWT.Strategy;

let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);

    if (jwt_payload) {
        // The following will ensure that all routes using 
        // passport.authenticate have a req.user._id, req.user.userName, req.user.fullName & req.user.role values 
        // that matches the request payload data
        next(null, { _id: jwt_payload._id, 
            userName: jwt_payload.userName, }); 

    } else {
        next(null, false);
    }
});

// tell passport to use our "strategy"
passport.use(strategy);

// add passport as application-level middleware
app.use(passport.initialize());


app.use(cors());
app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/quotes", quotes);


// Better JSON error message for malformed JSON bodies
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ message: 'Invalid JSON' });
    }
    next();
});




dbConnect.connect()
	.then(() => {
		app.listen(HTTP_PORT, () => { console.log(`server is listening on port ${HTTP_PORT}`); });
	})
	.catch((err) => {
		console.error('Failed to connect to DB', err);
		process.exit(1);
	});



app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.get('/api/auth/Squotes', passport.authenticate('jwt', { session: false }), (req,res)=>{
	res.json({"quote1": 'You are on the way', "quote2": 'It will all work out'})
})