const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const users = [];

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = users.find(u => u.email === email);
  if (userExists) return res.status(400).json({ message: 'Email hii imeshasajiliwa!' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { id: users.length + 1, name, email, password: hashedPassword, role };
  users.push(newUser);

  res.status(201).json({ message: 'Mtumiaji amesajiliwa kikamilifu!', user: { name, email, role } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ message: 'Mtumiaji hajapatikana!' });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ message: 'Password si sahihi!' });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    'SECRET_KEY_YAKO_HAPA',
    { expiresIn: '1d' }
  );

  res.json({ message: 'Umeingia kikamilifu!', token, role: user.role });
});

module.exports = router;
