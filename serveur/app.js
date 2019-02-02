const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const urlEncodedParser = bodyParser.urlencoded({ extended: false });

const port = 3000;
const users = [];
const secret = 'thisismysecret';

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

const jwtStrategy = new JwtStrategy(jwtOptions, function(payload, next) {
    const user = users.find(user => user.email === payload.user);
    if (user) {
        next(null, user)
    } else {
        next(null, false)
    }
});

passport.use(jwtStrategy);
const app = express();

app.get('/public', (req, res) => {
    res.send('I am public folks!')
});

app.get('/private', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('Hello ' + req.user.email)
});

app.post('/login', urlEncodedParser, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        res.status(401).json({ error: 'Username or password was not provided' });
        return
    }

    const user = users.find(user => user.username === username);
    if (!user || user.password !== password) {
        res.status(401).json({ error: 'Username / password do not match' });
        return
    }

    const userJwt = jwt.sign({ user: user.email }, secret);
    res.json({ jwt: userJwt })
});

app.listen(port, () => {
    console.log('Server running on port '+port)
});
