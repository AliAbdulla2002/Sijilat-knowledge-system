const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/login', (req, res) => {
    res.render('admin_login', { error: null });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
        req.session.isAdmin = true;
        res.redirect('/'); 
    } else {
        res.render('admin_login', { error: req.__('login_error') });
    }
});

router.get('/logout', (req, res) => {
    req.session.isAdmin = false;
    res.redirect('/');
});

router.get('/logs', (req, res) => {
    if (!req.session || !req.session.isAdmin) {
        return res.redirect('/admin/login');
    }

    db.all("SELECT * FROM history ORDER BY id DESC", [], (err, logs) => {
        res.render('logs', { logs: logs || [] });
    });
});

router.post('/logs/clear', (req, res) => {
    if (req.session && req.session.isAdmin) {
        db.run("DELETE FROM history", [], () => {
            res.redirect('/admin/logs');
        });
    } else {
        res.redirect('/admin/login');
    }
});

router.get('/dashboard', (req, res) => {
    if (!req.session || !req.session.isAdmin) {
        return res.redirect('/admin/login');
    }

    db.get("SELECT COUNT(*) as count FROM issues", [], (err, issuesData) => {
        db.get("SELECT COUNT(*) as count FROM reports", [], (err, reportsData) => {
            db.all("SELECT category, COUNT(*) as count FROM issues GROUP BY category", [], (err, supportCats) => {
                db.all("SELECT * FROM history ORDER BY id DESC LIMIT 5", [], (err, recentLogs) => {
                    res.render('dashboard', {
                        totalIssues: issuesData ? issuesData.count : 0,
                        totalReports: reportsData ? reportsData.count : 0,
                        supportCategories: supportCats || [],
                        recentLogs: recentLogs || [],
                        isAdmin: true
                    });
                });
            });
        });
    });
});

module.exports = router;