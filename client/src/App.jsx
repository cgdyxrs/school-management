import React, { useState, useEffect } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({ totalStudents: 0, totalTeachers: 0, totalClasses: 0, totalFeeCollected: 0 });
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [results, setResults] = useState([]);
  const [fees, setFees] = useState([]);

  // Forms states
  const [studentForm, setStudentForm] = useState({ name: '', rollNo: '', class: '', section: '' });
  const [teacherForm, setTeacherForm] = useState({ name: '', subject: '', qualification: '' });
  const [resultForm, setResultForm] = useState({ studentId: '', subject: '', marks: '' });
  const [feeForm, setFeeForm] = useState({ studentId: '', totalAmount: '', paidAmount: '' });

  useEffect(() => {
    fetchStats();
    fetchStudents();
    fetchTeachers();
    fetchResults();
    fetchFees();
  }, []);

  const fetchStats = () => fetch('/api/dashboard/stats').then(r => r.json()).then(setStats);
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
    }).then(() => { fetchStudents(); fetchStats(); setStudentForm({ name: '', rollNo: '', class: '', section: '' }); });
  };

  const handleAddTeacher = (e) => {
    e.preventDefault();
    fetch('/api/teachers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teacherForm)
    }).then(() => { fetchTeachers(); fetchStats(); setTeacherForm({ name: '', subject: '', qualification: '' }); });
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
    }).then(() => { fetchFees(); fetchStats(); setFeeForm({ studentId: '', totalAmount: '', paidAmount: '' }); });
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '1000px', margin: 'auto' }}>
      <h1>🚀 School Management System</h1>
      
      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {['dashboard', 'students', 'teachers', 'results', 'fees'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            style={{ 
              padding: '10px 15px', 
              cursor: 'pointer', 
              backgroundColor: activeTab === tab ? '#007bff' : '#eee',
              color: activeTab === tab ? '#fff' : '#000',
              border: 'none', borderRadius: '5px', textTransform: 'capitalize' 
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* DASHBOARD TAB */}
      {activeTab === 'dashboard' && (
        <div>
          <h2>📊 System Overview</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <div style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
              <h3>Wanafunzi</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.totalStudents}</p>
            </div>
            <div style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
              <h3>Walimu</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.totalTeachers}</p>
            </div>
            <div style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
              <h3>Ada Iliyokusanywa</h3>
              <p style={{ fontSize: '24px', fontWeight: 'bold' }}>TZS {stats.totalFeeCollected.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}

      {/* STUDENTS TAB */}
      {activeTab === 'students' && (
        <div>
          <h2>🎓 Student Management</h2>
          <form onSubmit={handleAddStudent} style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <input placeholder="Jina la Mwanafunzi" value={studentForm.name} onChange={e => setStudentForm({...studentForm, name: e.target.value})} required />
            <input placeholder="Roll No" value={studentForm.rollNo} onChange={e => setStudentForm({...studentForm, rollNo: e.target.value})} required />
            <input placeholder="Darasa" value={studentForm.class} onChange={e => setStudentForm({...studentForm, class: e.target.value})} required />
            <input placeholder="Section" value={studentForm.section} onChange={e => setStudentForm({...studentForm, section: e.target.value})} />
            <button type="submit">Ongeza Mwanafunzi</button>
          </form>
          <ul>
            {students.map(s => (
              <li key={s.id}>{s.name} - Roll: {s.rollNo} | Class: {s.class} ({s.section})</li>
            ))}
          </ul>
        </div>
      )}

      {/* TEACHERS TAB */}
      {activeTab === 'teachers' && (
        <div>
          <h2>👨‍🏫 Teacher Management</h2>
          <form onSubmit={handleAddTeacher} style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <input placeholder="Jina la Mwalimu" value={teacherForm.name} onChange={e => setTeacherForm({...teacherForm, name: e.target.value})} required />
            <input placeholder="Somo" value={teacherForm.subject} onChange={e => setTeacherForm({...teacherForm, subject: e.target.value})} required />
            <input placeholder="Elimu/Qualification" value={teacherForm.qualification} onChange={e => setTeacherForm({...teacherForm, qualification: e.target.value})} />
            <button type="submit">Ongeza Mwalimu</button>
          </form>
          <ul>
            {teachers.map(t => (
              <li key={t.id}>{t.name} - Somo: {t.subject} ({t.qualification})</li>
            ))}
          </ul>
        </div>
      )}

      {/* RESULTS TAB */}
      {activeTab === 'results' && (
        <div>
          <h2>📝 Examination Results</h2>
          <form onSubmit={handleAddResult} style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <input placeholder="Student ID" value={resultForm.studentId} onChange={e => setResultForm({...resultForm, studentId: e.target.value})} required />
            <input placeholder="Somo" value={resultForm.subject} onChange={e => setResultForm({...resultForm, subject: e.target.value})} required />
            <input placeholder="Alama (Marks)" type="number" value={resultForm.marks} onChange={e => setResultForm({...resultForm, marks: e.target.value})} required />
            <button type="submit">Weka Matokeo</button>
          </form>
          <ul>
            {results.map(r => (
              <li key={r.id}>Student ID: {r.studentId} | Somo: {r.subject} | Marks: {r.marks} | <strong>Grade: {r.grade}</strong></li>
            ))}
          </ul>
        </div>
      )}

      {/* FEES TAB */}
      {activeTab === 'fees' && (
        <div>
          <h2>💳 Fee Management</h2>
          <form onSubmit={handleAddFee} style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <input placeholder="Student ID" value={feeForm.studentId} onChange={e => setFeeForm({...feeForm, studentId: e.target.value})} required />
            <input placeholder="Jumla ya Ada" type="number" value={feeForm.totalAmount} onChange={e => setFeeForm({...feeForm, totalAmount: e.target.value})} required />
            <input placeholder="Kiasi Kilicholipwa" type="number" value={feeForm.paidAmount} onChange={e => setFeeForm({...feeForm, paidAmount: e.target.value})} required />
            <button type="submit">Weka Malipo</button>
          </form>
          <ul>
            {fees.map(f => (
              <li key={f.id}>Student ID: {f.studentId} | Paid: TZS {f.paidAmount} / {f.totalAmount} | <strong>Status: {f.status}</strong></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
