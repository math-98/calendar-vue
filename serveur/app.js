const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const urlEncodedParser = bodyParser.urlencoded({ extended: false });

const port = process.env.PORT || 3000;
const users = [];
const events = [];
var eventCount = 0;
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

app.use(cors());

app.post('/add', passport.authenticate('jwt', { session: false }), urlEncodedParser, (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    let start = req.body.start;
    let end = req.body.end;
    const allDay = (req.body.allDay == "true");

    if (!title || !description || !start || !end) {
        return res.status(400).json({ error: "Missing one of these required parameters: title, description, start, end" });
    }

    if (moment(start).isValid()) {
       start = moment(start).format();
    } else {
        return res.status(400).json({ error: "Parameter start must be a valid date" });
    }

    if (moment(end).isValid()) {
        end = moment(end).format();
    } else {
        return res.status(400).json({ error: "Parameter end must be a valid date" });
    }

    eventCount++;
    events.push({
        id: eventCount,
        author: req.user.username,
        title: title,
        description: description,
        start: start,
        end: end,
        allDay: allDay,
    });
    return res.json({ id: eventCount });
});

app.get('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (isNaN(req.params.id)) {
        return res.status(400).json({ error: "Parameter id must be a number" });
    }

    const event = events.find(event => event.id === parseInt(req.params.id));
    if (!event) {
        return res.status(404).json({ error: "Event not found" });
    }

    if (event.author !== req.user.username) {
        return res.status(403).json({ error: "Forbidden access" })
    }

    const key = events.indexOf(event);
    events.splice(key, 1);

    return res.json({ message: "Successfully deleted" });
});

app.get('/list', passport.authenticate('jwt', { session: false }), (req, res) => {
    const ret = [];
    events.forEach(event => {
        if (event.author === req.user.username) {
            ret.push(event);
        }
    });

    return res.json({ events: ret });
});

app.get('/get/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (isNaN(req.params.id)) {
        return res.status(400).json({ error: "Parameter id must be a number" });
    }

    const event = events.find(event => event.id === parseInt(req.params.id));
    if (!event) {
        return res.status(404).json({ error: "Event not found" });
    }

    if (event.author !== req.user.username) {
        return res.status(403).json({ error: "Forbidden access" })
    }

    return res.json({ event: event });
});

app.post('/register', urlEncodedParser, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username or password was not provided' });
    }

    const user = users.find(user => user.username === username);
    if (user) {
        return res.status(403).json({ error: "User "+username+" already exists" });
    }

    users.push({ username: username, password: password });
    return res.json({ message: 'Successfully registered' });
});

app.post('/login', urlEncodedParser, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username or password was not provided' });
    }

    const user = users.find(user => user.username === username);
    if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Username / password do not match' });
    }

    const userJwt = jwt.sign({ user: user.email }, secret);
    return res.json({ jwt: userJwt })
});

app.listen(port, () => {
    console.log('Server running on port '+port)
});
