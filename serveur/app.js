const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const urlEncodedParser = bodyParser.urlencoded({ extended: false });

const users = [
    { email: 'pcavalet@kaliop.com', password: 'kaliop' }
];
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
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        res.status(401).json({ error: 'Email or password was not provided.'});
        return
    }

    const user = users.find(user => user.email === email);
    if (!user || user.password !== password) {
        res.status(401).json({ error: 'Email / password do not match.'});
        return
    }

    const userJwt = jwt.sign({ user: user.email }, secret);
    res.json({ jwt: userJwt })
});

app.listen(3000, () => {
    console.log('app running on port 3000')
});
