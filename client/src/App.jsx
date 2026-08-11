import React, { useState, useEffect } from 'react';

const API_URL = '';

function App() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState({ email: 'anna@shule.com', role: 'TEACHER', token: 'fake' });

  // Auth States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('TEACHER');
  const [message, setMessage] = useState('');

  // Student States
  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('Form 1');
  const [studentAge, setStudentAge] = useState('');
  const [studentMsg, setStudentMsg] = useState('');

  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API_URL}/api/students`);
      if (res.ok) {
        const data = await res.json();
        setStudents(data);
      }
    } catch (err) {
      console.error('Shida ya kupata wanafunzi:', err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchStudents();
    }
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setUser({ email, role: data.role, token: data.token });
      } else {
        setMessage(data.message || 'Kuna tatizo limetokea!');
      }
    } catch (err) {
      setMessage('Imefeli kuunganishwa na Server.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Hongera! Usajili umekamilika. Sasa unaweza kuingia.');
        setIsRegistering(false);
        setPassword('');
      } else {
        setMessage(data.message || 'Kuna tatizo limetokea!');
      }
    } catch (err) {
      setMessage('Imefeli kuunganishwa na Server.');
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setStudentMsg('');
    try {
      const res = await fetch(`${API_URL}/api/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: studentName, studentClass, age: studentAge })
      });
      const data = await res.json();
      if (res.ok) {
        setStudentMsg('Mwanafunzi ameongezwa kikamilifu!');
        setStudentName('');
        setStudentAge('');
        fetchStudents();
      } else {
        setStudentMsg(data.message || 'Imefeli kuongeza mwanafunzi');
      }
    } catch (err) {
      setStudentMsg('Kuna tatizo la mtandao!');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setEmail('');
    setPassword('');
    setMessage('');
  };

  if (user) {
    return (
      <div style={{ fontFamily: 'sans-serif', padding: '15px', maxWidth: '500px', margin: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#007bff', color: 'white', padding: '10px 15px', borderRadius: '8px' }}>
          <h3 style={{ margin: 0 }}>🏫 Mfumo wa Shule</h3>
          <button onClick={handleLogout} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', fontWeight: 'bold' }}>
            Logout
          </button>
        </div>

        <div style={{ backgroundColor: '#e9ecef', padding: '15px', borderRadius: '8px', marginTop: '15px' }}>
          <h4 style={{ margin: '0 0 5px 0' }}>Karibu, {user.email}! 👋</h4>
          <p style={{ margin: 0 }}><strong>Wadhifa:</strong> <span style={{ color: '#28a745', fontWeight: 'bold' }}>{user.role}</span></p>
        </div>

        <div style={{ backgroundColor: '#ffffff', border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginTop: '15px' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>➕ Sajili Mwanafunzi Mpya</h4>
          <form onSubmit={handleAddStudent}>
            <input 
              type="text" 
              placeholder="Jina la Mwanafunzi" 
              value={studentName} 
              onChange={(e) => setStudentName(e.target.value)} 
              required 
              style={{ width: '100%', padding: '8px', marginBottom: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <select 
                value={studentClass} 
                onChange={(e) => setStudentClass(e.target.value)}
                style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                <option value="Form 1">Form 1</option>
                <option value="Form 2">Form 2</option>
                <option value="Form 3">Form 3</option>
                <option value="Form 4">Form 4</option>
              </select>
              <input 
                type="number" 
                placeholder="Umri" 
                value={studentAge} 
                onChange={(e) => setStudentAge(e.target.value)} 
                style={{ width: '80px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
              Hifadhi Mwanafunzi
            </button>
          </form>
          {studentMsg && <p style={{ marginTop: '8px', color: studentMsg.includes('kikamilifu') ? 'green' : 'red', fontSize: '14px', textAlign: 'center' }}>{studentMsg}</p>}
        </div>

        <div style={{ marginTop: '20px' }}>
          <h4>📚 Orodha ya Wanafunzi ({students.length})</h4>
          {students.map((st) => (
            <div key={st.id} style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#f8f9fa', padding: '10px 15px', borderRadius: '6px', marginBottom: '8px', borderLeft: '4px solid #007bff' }}>
              <div>
                <strong>{st.name}</strong>
                <div style={{ fontSize: '12px', color: '#666' }}>Umri: {st.age} yrs</div>
              </div>
              <span style={{ backgroundColor: '#007bff', color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', height: 'fit-content' }}>
                {st.class}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '400px', margin: '40px auto', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>🏫 Mfumo wa Shule</h2>
      <h4 style={{ textAlign: 'center', color: '#666', marginTop: '-10px' }}>
        {isRegistering ? 'Sajili Akunti Mpya' : 'Kuingia (Login)'}
      </h4>

      {isRegistering ? (
        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ fontWeight: 'bold' }}>Jina Kamili:</label><br />
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Anna Juma" style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ fontWeight: 'bold' }}>Email Address:</label><br />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="anna@shule.com" style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ fontWeight: 'bold' }}>Password:</label><br />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Weka password" style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold' }}>Wadhifa (Role):</label><br />
            <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}>
              <option value="TEACHER">Mwalimu (TEACHER)</option>
              <option value="ADMIN">Mkuu wa Shule (ADMIN)</option>
            </select>
          </div>
          <button type="submit" style={{ padding: '12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', width: '100%', fontWeight: 'bold', cursor: 'pointer' }}>
            Kamilisha Usajili
          </button>
        </form>
      ) : (
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold' }}>Email Address:</label><br />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="anna@shule.com" style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold' }}>Password:</label><br />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="123" style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
          </div>
          <button type="submit" style={{ padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', width: '100%', fontWeight: 'bold', cursor: 'pointer' }}>
            Ingia (Login)
          </button>
        </form>
      )}

      <div style={{ textAlign: 'center', marginTop: '15px' }}>
        <button onClick={() => { setIsRegistering(!isRegistering); setMessage(''); }} style={{ background: 'none', border: 'none', color: '#007bff', textDecoration: 'underline', cursor: 'pointer' }}>
          {isRegistering ? 'Umeshajisajili? Ingia hapa (Login)' : 'Huna akunti? Jisajili hapa (Register)'}
        </button>
      </div>

      {message && <p style={{ marginTop: '15px', color: message.includes('Hongera') ? 'green' : 'red', fontWeight: 'bold', textAlign: 'center' }}>{message}</p>}
    </div>
  );
}

export default App;
