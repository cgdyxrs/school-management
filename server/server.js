const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.json());

const distPath = path.resolve(__dirname, '../client/dist');
app.use(express.static(distPath));

const DB_FILE = path.join(__dirname, 'db.json');

// Kusoma Data
function readData() {
  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      users: [
        { id: 1, name: 'Admin Boss', email: 'admin@school.com', password: 'admin', role: 'ADMIN' }
      ],
      students: [
        { id: 1, name: 'Baraka Ali', rollNo: '101', class: 'Form 1', section: 'A', age: 14, parentContact: '0712345678' }
      ],
      teachers: [
        { id: 1, name: 'Mwl. Juma', subject: 'Mathematics', qualification: 'B.Ed', contact: '0755123456' }
      ],
      classes: [
        { id: 1, name: 'Form 1', section: 'A', classTeacher: 'Mwl. Juma' }
      ],
      subjects: [
        { id: 1, name: 'Mathematics', code: 'MATH101', teacher: 'Mwl. Juma' }
      ],
      attendance: [
        { id: 1, studentId: 1, date: '2026-08-11', status: 'Present' }
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

// Kuhifadhi Data
function saveData(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// --- AUTHENTICATION ROUTES ---
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, role } = req.body;
  const db = readData();
  if (db.users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'Email tayari ipo!' });
  }
  const newUser = { id: Date.now(), name, email, password, role: role || 'TEACHER' };
  db.users.push(newUser);
  saveData(db);
  res.status(201).json({ message: 'Usajili umekamilika!', user: newUser });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = readData();
  const user = db.users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'Email au Password siyo sahihi!' });
  res.json({ message: 'Login Imefanikiwa', user });
});

// --- DASHBOARD STATS ---
app.get('/api/dashboard/stats', (req, res) => {
  const db = readData();
  res.json({
    totalStudents: db.students.length,
    totalTeachers: db.teachers.length,
    totalClasses: db.classes.length,
    totalFeeCollected: db.fees.reduce((acc, curr) => acc + (curr.paidAmount || 0), 0)
  });
});

// --- STUDENTS ---
app.get('/api/students', (req, res) => res.json(readData().students));
app.post('/api/students', (req, res) => {
  const db = readData();
  const newStudent = { id: Date.now(), ...req.body };
  db.students.push(newStudent);
  saveData(db);
  res.status(201).json(newStudent);
});
app.delete('/api/students/:id', (req, res) => {
  const db = readData();
  db.students = db.students.filter(s => s.id !== parseInt(req.params.id));
  saveData(db);
  res.json({ message: 'Amefutwa!' });
});

// --- TEACHERS ---
app.get('/api/teachers', (req, res) => res.json(readData().teachers));
app.post('/api/teachers', (req, res) => {
  const db = readData();
  const newTeacher = { id: Date.now(), ...req.body };
  db.teachers.push(newTeacher);
  saveData(db);
  res.status(201).json(newTeacher);
});

// --- CLASSES & SUBJECTS ---
app.get('/api/classes', (req, res) => res.json(readData().classes));
app.post('/api/classes', (req, res) => {
  const db = readData();
  const newClass = { id: Date.now(), ...req.body };
  db.classes.push(newClass);
  saveData(db);
  res.status(201).json(newClass);
});

// --- ATTENDANCE ---
app.get('/api/attendance', (req, res) => res.json(readData().attendance));
app.post('/api/attendance', (req, res) => {
  const db = readData();
  const record = { id: Date.now(), ...req.body };
  db.attendance.push(record);
  saveData(db);
  res.status(201).json(record);
});

// --- EXAMINATIONS & RESULTS ---
app.get('/api/results', (req, res) => res.json(readData().results));
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

// --- FEES MANAGEMENT ---
app.get('/api/fees', (req, res) => res.json(readData().fees));
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

// Catch-all
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    return res.sendFile(path.join(distPath, 'index.html'));
  }
  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server ipo tayari kwenye port: ${PORT}`));
