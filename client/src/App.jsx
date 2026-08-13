import React, { useState } from 'react';
import './index.css';

function App() {
  const [activeCourse, setActiveCourse] = useState(null);

  const courses = {
    "Pipe Fitting": `NOTISI ZA PIPE FITTING:
1. Utangulizi: Ni fani inayohusika na upimaji, ukataji, uunganishaji na ufungaji wa mabomba ya maji, gesi, na majitaka.
2. Vifaa Vikuu: Inajumuisha mabomba ya PVC, PPR, G.I (Galvanized Iron), wrench (spana za mabomba), na cutter.
3. Usalama: Hakikisha unafunga valvu za maji kuu kabla ya kuanza ukarabati wowote kuepusha mafuriko.`,

    "Electrical Installation": `NOTISI ZA ELECTRICAL INSTALLATION:
1. Utangulizi: Inahusika na usakinishaji wa mifumo ya umeme ya majumbani na viwandani.
2. Vipengele Vikuu: Nyaya za umeme (cables), swichi (switches), soketi (sockets), na vivunja mzunguko (circuit breakers/MCB).
3. Usalama: Kamwe usifanye kazi kwenye nyaya zenye umeme (live wires); zima kuu (main switch) kwanza na utumie vifaa vya kujikinga (PPE).`,

    "Motor Vehicle Mechanics": `NOTISI ZA MOTOR VEHICLE MECHANICS:
1. Utangulizi: Inahusika na uchunguzi, utambuzi wa hitilafu, na matengenezo ya injini na mifumo ya magari.
2. Mifumo Kuu: Injini (Engine), Mfumo wa Breki (Braking system), Mfumo wa Ubaridi (Cooling system), na Umeme wa Gari.
3. Usalama: Tumia majeketi (jacks) imara wakati wa kuinua gari na vaa nguo za kazi zinazofaa.`
  };

  return (
    <div className="app-container">
      <div className="login-box">
        {activeCourse ? (
          <div className="content-view">
            <h2 className="login-title">{activeCourse}</h2>
            <pre className="note-text">{courses[activeCourse]}</pre>
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
