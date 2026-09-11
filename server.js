require('dotenv').config();
const express = require('express');
const path = require('path');
const i18n = require('i18n');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

i18n.configure({
    locales: ['en', 'ar'],
    directory: path.join(__dirname, 'locales'),
    defaultLocale: 'en',
    cookie: 'lang',
    queryParameter: 'lang',
    autoReload: true,
    syncFiles: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback_secret_key',
    resave: false,
    saveUninitialized: true
}));

app.use(i18n.init);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
    if (req.query.lang) {
        req.session.lang = req.query.lang;
    }
    
    if (req.session.lang) {
        i18n.setLocale(req, req.session.lang);
    }

    res.locals.isAdmin = req.session ? req.session.isAdmin : false;
    next();
});

app.get('/', (req, res) => {
    res.render('home');
});

const supportRoutes = require('./routes/support');
app.use('/support', supportRoutes);

const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

const reportsRoutes = require('./routes/reports');
app.use('/reports', reportsRoutes);

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});