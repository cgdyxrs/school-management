import React, { useState, useEffect } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('students');
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [results, setResults] = useState([]);
  const [fees, setFees] = useState([]);

  // Forms
  const [studentForm, setStudentForm] = useState({ name: '', rollNo: '', class: '', section: '' });
  const [teacherForm, setTeacherForm] = useState({ name: '', subject: '', qualification: '' });
  const [resultForm, setResultForm] = useState({ studentId: '', subject: '', marks: '' });
  const [feeForm, setFeeForm] = useState({ studentId: '', totalAmount: '', paidAmount: '' });

  // Edit State
  const [editingStudent, setEditingStudent] = useState(null);
  const [editingTeacher, setEditingTeacher] = useState(null);

  useEffect(() => {
    fetchStudents();
    fetchTeachers();
    fetchResults();
    fetchFees();
  }, []);

  const fetchStudents = () => fetch('/api/students').then(r => r.json()).then(setStudents);
  const fetchTeachers = () => fetch('/api/teachers').then(r => r.json()).then(setTeachers);
  const fetchResults = () => fetch('/api/results').then(r => r.json()).then(setResults);
  const fetchFees = () => fetch('/api/fees').then(r => r.json()).then(setFees);

  const handleAddStudent = (e) => {
    e.preventDefault();
    fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentForm)
    }).then(() => { fetchStudents(); setStudentForm({ name: '', rollNo: '', class: '', section: '' }); });
  };

  const handleUpdateStudent = (e) => {
    e.preventDefault();
    fetch(`/api/students/${editingStudent.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingStudent)
    }).then(() => { setEditingStudent(null); fetchStudents(); });
  };

  const handleAddTeacher = (e) => {
    e.preventDefault();
    fetch('/api/teachers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teacherForm)
    }).then(() => { fetchTeachers(); setTeacherForm({ name: '', subject: '', qualification: '' }); });
  };

  const handleUpdateTeacher = (e) => {
    e.preventDefault();
    fetch(`/api/teachers/${editingTeacher.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingTeacher)
    }).then(() => { setEditingTeacher(null); fetchTeachers(); });
  };

  const handleAddResult = (e) => {
    e.preventDefault();
    fetch('/api/results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resultForm)
    }).then(() => { fetchResults(); setResultForm({ studentId: '', subject: '', marks: '' }); });
  };

  const handleAddFee = (e) => {
    e.preventDefault();
    fetch('/api/fees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feeForm)
    }).then(() => { fetchFees(); setFeeForm({ studentId: '', totalAmount: '', paidAmount: '' }); });
  };

  const getStudentName = (id) => {
    const s = students.find(st => st.id === parseInt(id) || st.id === id);
    return s ? s.name : `Student ID: ${id}`;
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '1000px', margin: 'auto' }}>
      <h1>🚀 School Management System</h1>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {['students', 'teachers', 'results', 'fees'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            style={{ 
              padding: '10px 15px', 
              backgroundColor: activeTab === tab ? '#007bff' : '#eee',
              color: activeTab === tab ? '#fff' : '#000',
              border: 'none', borderRadius: '5px', textTransform: 'capitalize', cursor: 'pointer'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* STUDENTS TAB */}
      {activeTab === 'students' && (
        <div>
          <h2>🎓 Wanafunzi</h2>
          <form onSubmit={handleAddStudent} style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <input placeholder="Jina la Mwanafunzi" value={studentForm.name} onChange={e => setStudentForm({...studentForm, name: e.target.value})} required />
            <input placeholder="Roll No" value={studentForm.rollNo} onChange={e => setStudentForm({...studentForm, rollNo: e.target.value})} required />
            <input placeholder="Darasa" value={studentForm.class} onChange={e => setStudentForm({...studentForm, class: e.target.value})} required />
            <input placeholder="Section" value={studentForm.section} onChange={e => setStudentForm({...studentForm, section: e.target.value})} />
            <button type="submit">Ongeza Mwanafunzi</button>
          </form>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px' }}>
            {students.map(s => (
              <div key={s.id} style={{ padding: '15px', borderRadius: '10px', border: '1px solid #ccc', background: 'rgba(255,255,255,0.05)' }}>
                {editingStudent?.id === s.id ? (
                  <form onSubmit={handleUpdateStudent}>
                    <input value={editingStudent.name} onChange={e => setEditingStudent({...editingStudent, name: e.target.value})} required /><br/>
                    <input value={editingStudent.rollNo} onChange={e => setEditingStudent({...editingStudent, rollNo: e.target.value})} required /><br/>
                    <input value={editingStudent.class} onChange={e => setEditingStudent({...editingStudent, class: e.target.value})} required /><br/>
                    <button type="submit" style={{ marginTop: '5px' }}>Hifadhi</button>
                    <button type="button" onClick={() => setEditingStudent(null)} style={{ marginLeft: '5px' }}>Acha</button>
                  </form>
                ) : (
                  <>
                    <h3 style={{ margin: '0 0 5px 0' }}>{s.name}</h3>
                    <p style={{ margin: '0', fontSize: '12px', opacity: 0.7 }}>ID: {s.id}</p>
                    <p style={{ margin: '5px 0' }}>Roll No: {s.rollNo}</p>
                    <p style={{ margin: '5px 0' }}>Darasa: {s.class} ({s.section})</p>
                    <button onClick={() => setEditingStudent(s)} style={{ marginTop: '10px' }}>Edit Taarifa</button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TEACHERS TAB */}
      {activeTab === 'teachers' && (
        <div>
          <h2>👨‍🏫 Walimu</h2>
          <form onSubmit={handleAddTeacher} style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <input placeholder="Jina la Mwalimu" value={teacherForm.name} onChange={e => setTeacherForm({...teacherForm, name: e.target.value})} required />
            <input placeholder="Somo" value={teacherForm.subject} onChange={e => setTeacherForm({...teacherForm, subject: e.target.value})} required />
            <input placeholder="Qualification" value={teacherForm.qualification} onChange={e => setTeacherForm({...teacherForm, qualification: e.target.value})} />
            <button type="submit">Ongeza Mwalimu</button>
          </form>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px' }}>
            {teachers.map(t => (
              <div key={t.id} style={{ padding: '15px', borderRadius: '10px', border: '1px solid #ccc', background: 'rgba(255,255,255,0.05)' }}>
                {editingTeacher?.id === t.id ? (
                  <form onSubmit={handleUpdateTeacher}>
                    <input value={editingTeacher.name} onChange={e => setEditingTeacher({...editingTeacher, name: e.target.value})} required /><br/>
                    <input value={editingTeacher.subject} onChange={e => setEditingTeacher({...editingTeacher, subject: e.target.value})} required /><br/>
                    <button type="submit" style={{ marginTop: '5px' }}>Hifadhi</button>
                    <button type="button" onClick={() => setEditingTeacher(null)} style={{ marginLeft: '5px' }}>Acha</button>
                  </form>
                ) : (
                  <>
                    <h3 style={{ margin: '0 0 5px 0' }}>{t.name}</h3>
                    <p style={{ margin: '0', fontSize: '12px', opacity: 0.7 }}>ID: {t.id}</p>
                    <p style={{ margin: '5px 0' }}>Somo: {t.subject}</p>
                    <p style={{ margin: '5px 0' }}>Elimu: {t.qualification}</p>
                    <button onClick={() => setEditingTeacher(t)} style={{ marginTop: '10px' }}>Edit Taarifa</button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RESULTS TAB */}
      {activeTab === 'results' && (
        <div>
          <h2>📝 Matokeo ya Mitihani</h2>
          <form onSubmit={handleAddResult} style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <select value={resultForm.studentId} onChange={e => setResultForm({...resultForm, studentId: e.target.value})} required>
              <option value="">-- Chagua Mwanafunzi --</option>
              {students.map(s => (<option key={s.id} value={s.id}>{s.name} ({s.class})</option>))}
            </select>
            <input placeholder="Somo" value={resultForm.subject} onChange={e => setResultForm({...resultForm, subject: e.target.value})} required />
            <input placeholder="Alama (Marks)" type="number" value={resultForm.marks} onChange={e => setResultForm({...resultForm, marks: e.target.value})} required />
            <button type="submit">Weka Matokeo</button>
          </form>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px' }}>
            {results.map(r => (
              <div key={r.id} style={{ padding: '15px', borderRadius: '10px', border: '1px solid #ccc', background: 'rgba(255,255,255,0.05)' }}>
                <h3 style={{ margin: '0 0 5px 0' }}>{getStudentName(r.studentId)}</h3>
                <p style={{ margin: '5px 0' }}>Somo: {r.subject}</p>
                <p style={{ margin: '5px 0' }}>Marks: {r.marks}</p>
                <p style={{ margin: '5px 0' }}>Grade: <strong>{r.grade}</strong></p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FEES TAB */}
      {activeTab === 'fees' && (
        <div>
          <h2>💳 Usimamizi wa Ada</h2>
          <form onSubmit={handleAddFee} style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <select value={feeForm.studentId} onChange={e => setFeeForm({...feeForm, studentId: e.target.value})} required>
              <option value="">-- Chagua Mwanafunzi --</option>
              {students.map(s => (<option key={s.id} value={s.id}>{s.name} ({s.class})</option>))}
            </select>
            <input placeholder="Jumla ya Ada" type="number" value={feeForm.totalAmount} onChange={e => setFeeForm({...feeForm, totalAmount: e.target.value})} required />
            <input placeholder="Kiasi Kilicholipwa" type="number" value={feeForm.paidAmount} onChange={e => setFeeForm({...feeForm, paidAmount: e.target.value})} required />
            <button type="submit">Weka Malipo</button>
          </form>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '15px' }}>
            {fees.map(f => (
              <div key={f.id} style={{ padding: '15px', borderRadius: '10px', border: '1px solid #ccc', background: 'rgba(255,255,255,0.05)' }}>
                <h3 style={{ margin: '0 0 5px 0' }}>{getStudentName(f.studentId)}</h3>
                <p style={{ margin: '5px 0' }}>Paid: TZS {f.paidAmount} / {f.totalAmount}</p>
                <p style={{ margin: '5px 0' }}>Status: <strong>{f.status}</strong></p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
