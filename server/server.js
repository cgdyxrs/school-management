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

// Kazi ya kusoma data kutoka kwenye faili la db.json
function readData() {
  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      users: [],
      students: [
        { id: 1, name: 'Baraka Ali', class: 'Form 1', age: 14 },
        { id: 2, name: 'Amina Salum', class: 'Form 2', age: 15 }
      ]
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  const fileData = fs.readFileSync(DB_FILE, 'utf-8');
  return JSON.parse(fileData);
}

// Kazi ya kuhifadhi data kwenye db.json
function saveData(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// 1. Auth Routes
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, role } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Tafadhali jaza email na password!' });
  }

  const db = readData();
  const existingUser = db.users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'Email hii tayari imeshasajiliwa!' });
  }

  const newUser = { id: db.users.length + 1, name, email, password, role: role || 'TEACHER' };
  db.users.push(newUser);
  saveData(db);

  res.status(201).json({ message: 'Usajili umekamilika kikamilifu!' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = readData();

  const user = db.users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Email au Password siyo sahihi!' });
  }

  res.json({ message: 'Login imefanikiwa', role: user.role, token: 'fake-jwt-token-1' });
});

// 2. Student Routes
app.get('/api/students', (req, res) => {
  const db = readData();
  res.json(db.students);
});

app.post('/api/students', (req, res) => {
  const { name, studentClass, age } = req.body;
  if (!name || !studentClass) {
    return res.status(400).json({ message: 'Tafadhali ingiza jina na darasa!' });
  }

  const db = readData();
  const newStudent = { 
    id: db.students.length > 0 ? db.students[db.students.length - 1].id + 1 : 1, 
    name, 
    class: studentClass, 
    age: age || 'N/A' 
  };

  db.students.push(newStudent);
  saveData(db);

  res.status(201).json({ message: 'Mwanafunzi amesajiliwa kikamilifu!', student: newStudent });
});

app.delete('/api/students/:id', (req, res) => {
  const { id } = req.params;
  const db = readData();
  
  db.students = db.students.filter(s => s.id !== parseInt(id));
  saveData(db);

  res.json({ message: 'Mwanafunzi amefutwa kikamilifu!' });
});

// Catch-all route
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    return res.sendFile(path.join(distPath, 'index.html'));
  }
  next();
});

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server ipo tayari na Database kwenye: http://127.0.0.1:${PORT}`));
