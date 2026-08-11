const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Njia sahihi ya kuelekeza kwenye client/dist
const distPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(distPath));

const DB_FILE = path.join(__dirname, 'db.json');

function readData() {
  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      students: [
        { id: 1, name: 'Baraka Ali', rollNo: '101', class: 'Form 1', section: 'A' }
      ],
      teachers: [
        { id: 1, name: 'Mwl. Juma', subject: 'Mathematics', qualification: 'B.Ed' }
      ],
      results: [
        { id: 1, studentId: 1, subject: 'Mathematics', marks: 85, grade: 'A' }
      ],
      fees: [
        { id: 1, studentId: 1, totalAmount: 500000, paidAmount: 300000, status: 'Partial' }
      ]
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
}

function saveData(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// API Routes
app.get('/api/students', (req, res) => res.json(readData().students));
app.get('/api/teachers', (req, res) => res.json(readData().teachers));
app.get('/api/results', (req, res) => res.json(readData().results));
app.get('/api/fees', (req, res) => res.json(readData().fees));

app.post('/api/students', (req, res) => {
  const db = readData();
  const newStudent = { id: Date.now(), ...req.body };
  db.students.push(newStudent);
  saveData(db);
  res.status(201).json(newStudent);
});

app.post('/api/teachers', (req, res) => {
  const db = readData();
  const newTeacher = { id: Date.now(), ...req.body };
  db.teachers.push(newTeacher);
  saveData(db);
  res.status(201).json(newTeacher);
});

app.post('/api/results', (req, res) => {
  const db = readData();
  const marks = parseInt(req.body.marks);
  let grade = 'F';
  if (marks >= 80) grade = 'A';
  else if (marks >= 65) grade = 'B';
  else if (marks >= 50) grade = 'C';
  else if (marks >= 40) grade = 'D';

  const newResult = { id: Date.now(), ...req.body, marks, grade };
  db.results.push(newResult);
  saveData(db);
  res.status(201).json(newResult);
});

app.post('/api/fees', (req, res) => {
  const db = readData();
  const total = parseInt(req.body.totalAmount);
  const paid = parseInt(req.body.paidAmount);
  const status = paid >= total ? 'Paid' : paid > 0 ? 'Partial' : 'Unpaid';

  const newFee = { id: Date.now(), ...req.body, totalAmount: total, paidAmount: paid, status };
  db.fees.push(newFee);
  saveData(db);
  res.status(201).json(newFee);
});

app.put('/api/students/:id', (req, res) => {
  const db = readData();
  const id = parseInt(req.params.id);
  const index = db.students.findIndex(s => s.id === id);
  if (index !== -1) {
    db.students[index] = { ...db.students[index], ...req.body };
    saveData(db);
    res.json(db.students[index]);
  } else res.status(404).send('Hajapatikana');
});

app.put('/api/teachers/:id', (req, res) => {
  const db = readData();
  const id = parseInt(req.params.id);
  const index = db.teachers.findIndex(t => t.id === id);
  if (index !== -1) {
    db.teachers[index] = { ...db.teachers[index], ...req.body };
    saveData(db);
    res.json(db.teachers[index]);
  } else res.status(404).send('Hajapatikana');
});

// Kuelekeza maombi yote yanayobaki kwenye index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
