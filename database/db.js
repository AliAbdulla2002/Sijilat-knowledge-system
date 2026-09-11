const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'sijilat.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('✅ Connected to SQLite database.');
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS issues (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        category TEXT,
        solution TEXT,
        date TEXT,
        attachment TEXT,
        description TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        action TEXT,
        item_title TEXT,
        details TEXT,
        timestamp TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS issues (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        category TEXT,
        solution TEXT,
        date TEXT,
        attachment TEXT,
        description TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS reports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        category TEXT,
        solution TEXT,
        date TEXT,
        attachment TEXT,
        description TEXT
    )`);

    db.run("ALTER TABLE history ADD COLUMN action TEXT", () => {});
    db.run("ALTER TABLE history ADD COLUMN item_title TEXT", () => {});
    db.run("ALTER TABLE history ADD COLUMN details TEXT", () => {});
    db.run("ALTER TABLE history ADD COLUMN timestamp TEXT", () => {});
});

module.exports = db;