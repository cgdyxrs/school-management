const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = path.join(__dirname, 'db.json');

// Kusoma na Kuhifadhi
const readData = () => JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
const saveData = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

// API ZA KUBADILISHA (EDIT/UPDATE)
app.put('/api/students/:id', (req, res) => {
    const db = readData();
    const id = parseInt(req.params.id);
    const index = db.students.findIndex(s => s.id === id);
    if(index !== -1) {
        db.students[index] = { ...db.students[index], ...req.body };
        saveData(db);
        res.json(db.students[index]);
    } else res.status(404).send('Hajapatikana');
});

app.put('/api/teachers/:id', (req, res) => {
    const db = readData();
    const id = parseInt(req.params.id);
    const index = db.teachers.findIndex(t => t.id === id);
    if(index !== -1) {
        db.teachers[index] = { ...db.teachers[index], ...req.body };
        saveData(db);
        res.json(db.teachers[index]);
    } else res.status(404).send('Hajapatikana');
});

// Zile zingine (GET, POST) tunaziacha vilevile...
app.get('/api/students', (req, res) => res.json(readData().students));
app.get('/api/teachers', (req, res) => res.json(readData().teachers));
app.post('/api/students', (req, res) => {
    const db = readData();
    const newStudent = { id: Date.now(), ...req.body };
    db.students.push(newStudent);
    saveData(db);
    res.json(newStudent);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0');
