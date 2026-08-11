const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory Database
let users = [
  { id: 1, email: 'admin@gmail.com', password: '123' }
];
let students = [
  { id: 1, name: 'Juma Hassan', rollNo: '101', class: 'Form 1', section: 'A' }
];
let teachers = [
  { id: 1, name: 'Mwalimu John', subject: 'Mathematics', qualification: 'Degree' }
];
let results = [
  { id: 1, studentId: 1, subject: 'Mathematics', marks: 85, grade: 'A' }
];
let fees = [
  { id: 1, studentId: 1, totalAmount: 500000, paidAmount: 300000, status: 'Incomplete' }
];

// AUTH API
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'Email hii imeshasajiliwa!' });
  }
  const newUser = { id: Date.now(), email, password };
  users.push(newUser);
  res.json({ message: 'Usajili umefanikiwa! Unaweza kuingia sasa.' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Email au password si sahihi' });
  }
});

app.post('/api/reset-password', (req, res) => {
  const { email, newPassword } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(404).json({ error: 'Email hii haijapatikana!' });
  }
  user.password = newPassword;
  res.json({ message: 'Password imebadilishwa kikamilifu!' });
});

// STUDENTS API
app.get('/api/students', (req, res) => res.json(students));
app.post('/api/students', (req, res) => {
  const newStudent = { id: Date.now(), ...req.body };
  students.push(newStudent);
  res.json(newStudent);
});
app.put('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  students = students.map(s => s.id === id ? { ...s, ...req.body } : s);
  res.json({ message: 'Updated' });
});

// TEACHERS API
app.get('/api/teachers', (req, res) => res.json(teachers));
app.post('/api/teachers', (req, res) => {
  const newTeacher = { id: Date.now(), ...req.body };
  teachers.push(newTeacher);
  res.json(newTeacher);
});
app.put('/api/teachers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  teachers = teachers.map(t => t.id === id ? { ...t, ...req.body } : t);
  res.json({ message: 'Updated' });
});

// RESULTS API
app.get('/api/results', (req, res) => res.json(results));
app.post('/api/results', (req, res) => {
  const { studentId, subject, marks } = req.body;
  const m = parseInt(marks);
  let grade = 'F';
  if (m >= 80) grade = 'A';
  else if (m >= 70) grade = 'B';
  else if (m >= 60) grade = 'C';
  else if (m >= 50) grade = 'D';

  const newResult = { id: Date.now(), studentId, subject, marks: m, grade };
  results.push(newResult);
  res.json(newResult);
});

// FEES API
app.get('/api/fees', (req, res) => res.json(fees));
app.post('/api/fees', (req, res) => {
  const { studentId, totalAmount, paidAmount } = req.body;
  const total = parseFloat(totalAmount);
  const paid = parseFloat(paidAmount);
  const status = paid >= total ? 'Completed' : 'Incomplete';

  const newFee = { id: Date.now(), studentId, totalAmount: total, paidAmount: paid, status };
  fees.push(newFee);
  res.json(newFee);
});

// Serve frontend build files in production
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
