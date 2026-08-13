import React, { useState } from 'react';
import './index.css';

function App() {
  const [activeCourse, setActiveCourse] = useState(null);

  const courses = {
    "Pipe Fitting": "Notisi za Pipe Fitting: Hapa utajifunza kuhusu aina za mabomba, upimaji, kukata, na kuunganisha mabomba ya maji na mifumo mbalimbali kwa usalama.",
    "Electrical Installation": "Notisi za Electrical Installation: Hapa utajifunza usakinishaji wa nyaya za umeme, saketi, ufungaji wa swichi na taa, pamoja na sheria za usalama wa umeme.",
    "Motor Vehicle Mechanics": "Notisi za Motor Vehicle Mechanics: Hapa utajifunza kuhusu mfumo wa injini, breki, mfumo wa mafuta, na matengenezo ya jumla ya vyombo vya moto."
  };

  return (
    <div className="app-container">
      <div className="login-box">
        {activeCourse ? (
          <div className="content-view">
            <h2 className="login-title">{activeCourse}</h2>
            <p className="note-text">{courses[activeCourse]}</p>
            <button className="back-btn" onClick={() => setActiveCourse(null)}>Rudi Nyuma</button>
          </div>
        ) : (
          <>
            <h2 className="login-title">VETA Portal</h2>
            <p className="subtitle">Chagua Fani ya Kujisomea</p>
            <div className="course-list">
              {Object.keys(courses).map(course => (
                <button key={course} className="course-btn" onClick={() => setActiveCourse(course)}>
                  {course}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="powered-footer">Powered by ANDREA</div>
    </div>
  );
}

export default App;
