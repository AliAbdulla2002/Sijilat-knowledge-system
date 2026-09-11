const express = require('express');
const router = express.Router();
const db = require('../database/db');
const upload = require('./upload');
const { autoDetectCategory } = require('../utils/dictionary');

const isAdmin = (req, res, next) => {
    if (req.session && req.session.isAdmin) {
        return next();
    }
    res.redirect('/admin/login');
};

const getLocalTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};

// عرض صفحة التقارير مع الترتيب الذكي
router.get('/', (req, res) => {
    const searchQuery = req.query.q ? req.query.q.toLowerCase().trim() : '';
    
    if (!searchQuery) {
        return res.render('reports', { 
            reports: [], 
            searchQuery: '', 
            isSearchPerformed: false,
            isAdmin: req.session ? req.session.isAdmin : false 
        });
    }

    db.all("SELECT * FROM reports", [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.render('reports', { reports: [], searchQuery, isSearchPerformed: true, isAdmin: req.session ? req.session.isAdmin : false });
        }

        let filteredRows = rows.filter(row => 
            (row.title && row.title.toLowerCase().includes(searchQuery)) || 
            (row.solution && row.solution.toLowerCase().includes(searchQuery)) ||
            (row.description && row.description.toLowerCase().includes(searchQuery)) ||
            (row.category && row.category.toLowerCase().includes(searchQuery))
        );

        filteredRows.sort((a, b) => {
            const getScore = (row) => {
                const title = (row.title || '').toLowerCase();
                const exactWordPattern = ` ${searchQuery} `;
                const titleWithSpaces = ` ${title} `;

                if (title === searchQuery || titleWithSpaces.includes(exactWordPattern)) return 3;
                else if (title.includes(searchQuery)) return 2;
                else return 1;
            };

            const scoreA = getScore(a);
            const scoreB = getScore(b);

            if (scoreA !== scoreB) return scoreB - scoreA;
            return b.id - a.id; 
        });

        res.render('reports', { 
            reports: filteredRows, 
            searchQuery, 
            isSearchPerformed: true,
            isAdmin: req.session ? req.session.isAdmin : false 
        });
    });
});

router.post('/add', isAdmin, upload.single('attachment'), (req, res) => {
    const { title, description, category, steps } = req.body;
    const attachment = req.file ? req.file.filename : '';
    const date = getLocalTime();

    let finalSolution = "";
    if (Array.isArray(steps)) {
        finalSolution = steps.filter(s => s.trim() !== "").map((s, idx) => `Step ${idx + 1}: ${s}`).join("\n\n");
    } else if (steps) {
        finalSolution = `Step 1: ${steps}`;
    }

    let finalCategory = category;
    if (!finalCategory || finalCategory === "Other / أخرى" || finalCategory.includes("Auto-Detect") || finalCategory.includes("تحديد تلقائي")) {
        finalCategory = autoDetectCategory(title + " " + (description || ""));
    }

    const query = `INSERT INTO reports (title, category, solution, date, attachment, description) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(query, [title, finalCategory, finalSolution, date, attachment, description], function(err) {
        if (!err) {
            db.run("INSERT INTO history (action, item_title, details, timestamp) VALUES (?, ?, ?, ?)",
                ['CREATED', title, `Added new report in category: ${finalCategory}`, getLocalTime()]);
        }
        res.redirect(req.get('Referrer') || '/reports');
    });
});

router.post('/edit/:id', isAdmin, upload.single('attachment'), (req, res) => {
    const reportId = req.params.id;
    const { title, description, category, steps, existing_attachment } = req.body;
    const attachment = req.file ? req.file.filename : existing_attachment;

    let finalSolution = "";
    if (Array.isArray(steps)) {
        finalSolution = steps.filter(s => s.trim() !== "").map((s, idx) => `Step ${idx + 1}: ${s}`).join("\n\n");
    } else if (steps) {
        finalSolution = steps.includes('Step 1:') ? steps : `Step 1: ${steps}`;
    }

    let finalCategory = category;
    if (!finalCategory || finalCategory === "Other / أخرى" || finalCategory.includes("Auto-Detect") || finalCategory.includes("تحديد تلقائي")) {
        finalCategory = autoDetectCategory(title + " " + (description || ""));
    }

    const query = `UPDATE reports SET title = ?, category = ?, solution = ?, description = ?, attachment = ? WHERE id = ?`;
    db.run(query, [title, finalCategory, finalSolution, description, attachment, reportId], function(err) {
        if (!err) {
            db.run("INSERT INTO history (action, item_title, details, timestamp) VALUES (?, ?, ?, ?)",
                ['UPDATED', title, `Updated report ID: ${reportId}`, getLocalTime()]);
        }
        res.redirect(req.get('Referrer') || '/reports');
    });
});

router.post('/delete/:id', isAdmin, (req, res) => {
    const reportId = req.params.id;
    db.get("SELECT title FROM reports WHERE id = ?", [reportId], (err, row) => {
        const title = row ? row.title : 'Unknown';
        db.run("DELETE FROM reports WHERE id = ?", [reportId], (err) => {
            if (!err) {
                db.run("INSERT INTO history (action, item_title, details, timestamp) VALUES (?, ?, ?, ?)",
                    ['DELETED', title, `Deleted report ID: ${reportId}`, getLocalTime()]);
            }
            res.redirect(req.get('Referrer') || '/reports');
        });
    });
});

module.exports = router;