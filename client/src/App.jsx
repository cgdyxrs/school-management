import React, { useState, useEffect } from 'react';

export default function App() {
  const [students, setStudents] = useState([]);
  const [edit, setEdit] = useState(null); // Inatambua nani anaeditika

  useEffect(() => { fetchStudents(); }, []);
  const fetchStudents = () => fetch('/api/students').then(r => r.json()).then(setStudents);

  const handleSave = (id, data) => {
    fetch(`/api/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(() => { setEdit(null); fetchStudents(); });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>🎓 Wanafunzi</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
        {students.map(s => (
          <div key={s.id} style={{ padding: '15px', borderRadius: '15px', background: 'rgba(255,255,255,0.1)', border: '1px solid white' }}>
            {edit?.id === s.id ? (
              <>
                <input value={edit.name} onChange={e => setEdit({...edit, name: e.target.value})} />
                <button onClick={() => handleSave(s.id, edit)}>Save</button>
              </>
            ) : (
              <>
                <h3 style={{ margin: '0' }}>{s.name}</h3>
                <p style={{ opacity: 0.6, fontSize: '0.8em' }}>ID: {s.id}</p>
                <p>Darasa: {s.class}</p>
                <button onClick={() => setEdit(s)}>Edit</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
