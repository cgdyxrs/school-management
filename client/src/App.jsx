import React, { useState } from 'react';
import './index.css';

function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const syllabus = {
    "Pipe Fitting": {
      "Mwaka wa Kwanza": `PIPE FITTING - MWAKA WA KWANZA:
1. Utangulizi wa Usalama Kazini na Zana (Safety & Tools):
- Kanuni za usalama sehemu za kazi na matumizi sahihi ya zana za mikono (hand tools).
2. Upimaji na Uchora Ramani (Measurement & Sketching):
- Kusoma michoro rahisi ya ujenzi na kupima vipimo sahihi vya mabomba.
3. Mabomba ya Plastiki (PVC & PPR):
- Misingi ya kukata, kusafisha, na kuunganisha mabomba ya maji baridi na majitaka kwa kutumia gundi au machine ya moto.`,

      "Mwaka wa Pili": `PIPE FITTING - MWAKA WA PILI:
1. Mifumo ya Mabomba ya Vyuma (G.I Pipes):
- Namna ya kukata nyuzi (threading) kwenye mabomba ya chuma na kutumia thread tape kuzuia uvujaji.
2. Usakinishaji wa Vifaa vya Ziada (Sanitary Fixtures):
- Kufunga sinki za kufulia, vyoo (toilets), na mifumo ya kupitishia maji machafu ndani ya nyumba.
3. Udhibiti wa Shinikizo la Maji (Pressure Testing):
- Kupima uwezo wa mabomba kuhimili shinikizo la maji ili kugundua kama kuna uvujaji kabla ya kukabidhi kazi.`,

      "Mwaka wa Tatu": `PIPE FITTING - MWAKA WA TATU:
1. Mifumo ya Maji ya Moto na Gesi (Hot Water & Gas Systems):
- Kanuni za usalama na ufungaji wa mabomba yanayohimili joto kubwa na mifumo ya gesi ya kupikia au viwandani.
2. Kuchora na Kubuni Mitandao Mikubwa (Advanced Plumbing Design):
- Kubuni mfumo mzima wa maji safi na majitaka kwa majengo makubwa ya ghorofa.
3. Ukaguzi na Matengenezo Makubwa (Maintenance & Troubleshooting):
- Kutambua hitilafu zilizofichika chini ya sakafu au ukutani na kuzitengeneza kwa ustadi.`
    },

    "Home electrical Installation": {
      "Mwaka wa Kwanza": `ELECTRICAL INSTALLATION - MWAKA WA KWANZA:
1. Sheria za Usalama wa Umeme (Electrical Safety):
- Kanuni za kujikinga na shoti, matumizi ya PPE, na huduma ya kwanza kwa mtu aliyepigwa na umeme.
2. Zana na Vipimo vya Msingi:
- Matumizi ya Multimeter kupima voltage, mkondo (current), na ukinzani (resistance).
3. Misingi ya Nyaya za Majumbani (Basic Wiring):
- Kuelewa saketi rahisi ya taa moja na swichi yake (1-way switch).`,

      "Mwaka wa Pili": `ELECTRICAL INSTALLATION - MWAKA WA PILI:
1. Mifumo ya Njia Mbili na Zaidi (Two-way & Intermediate Switching):
- Kufunga taa zinazowashwa au kuzimwa kutoka sehemu mbili au zaidi (kama vile ngazi).
2. Usakinishaji wa Soketi na Vitengo vya Kinga (MCB & RCD):
- Kufunga vivunja mzunguko na mifumo ya kulinda nyumba dhidi ya hitilafu za ghafla.
3. Upimaji wa Insulation na Earth Resistance:
- Kuhakikisha mfumo wa kutuliza umeme (earthing system) upo salama na unafanya kazi vizuri.`,

      "Mwaka wa Tatu": `ELECTRICAL INSTALLATION - MWAKA WA TATU:
1. Umeme wa Viwandani (Industrial Electrical Systems):
- Kufunga na kuendesha mota za umeme (3-phase motors) na mifumo ya kudhibiti viwandani.
2. Usakinishaji wa Mifumo ya Jua (Solar PV Systems):
- Kanuni za kuunganisha paneli za jua, betri, na inverter kwa ajili ya kuzalisha umeme mbadala.
3. Usomaji wa Ramani Kubwa za Umeme (Electrical Blueprints):
- Kuchora na kutafsiri michoro mikubwa ya nyaya za umeme kwa majengo ya ghorofa na viwanda.`
    },

    "Motor Vehicle Mechanics": {
      "Mwaka wa Kwanza": `MOTOR VEHICLE MECHANICS - MWAKA WA KWANZA:
1. Utangulizi wa Injini na Usalama Kazini:
- Utambuzi wa sehemu mbalimbali za gari na kanuni za usalama ukiwa karibu na eneo la kutengenezea magari.
2. Matengenezo Madogo (Routine Service):
- Kubadilisha mafuta ya injini (engine oil), vichungi vya hewa, na mafuta.
3. Mfumo wa Breki za Awali (Basic Braking System):
- Kuchunguza na kubadilisha viatu vya breki (brake pads) na kuangalia kiwango cha mafuta ya breki.`,

      "Mwaka wa Pili": `MOTOR VEHICLE MECHANICS - MWAKA WA PILI:
1. Mfumo wa Ubaridi na Mafuta (Cooling & Fuel Systems):
- Utunzaji wa radiator, pampu ya maji, na mfumo wa kuchoma mafuta kwenye injini.
2. Mfumo wa Kusimamisha Gari (Suspension & Steering):
- Kuhudumia mitambo ya usukani, vifaa vya kupunguza mishtuko (shock absorbers), na matairi.
3. Utambuzi wa Hitilafu kwa Kutumia Kompyuta (Diagnostic Scanners):
- Kufunganisha mashine ya kutambua hitilafu kwenye kompyuta ya gari (ECU) ili kusoma makosa.`,

      "Mwaka wa Tatu": `MOTOR VEHICLE MECHANICS - MWAKA WA TATU:
1. Uchunguzi na Ukarabati Mkubwa wa Injini (Engine Overhaul):
- Kufumua injini nzima, kubadilisha piston, ringi, na kutengeneza kichwa cha injini (cylinder head).
2. Mfumo wa Umeme wa Gari (Automotive Electronics):
- Kurekebisha mfumo wa kuwasha moto (ignition system), alternator, na betri.
3. Mifumo ya Usalama wa Kisasa (ABS & Airbags):
- Kuelewa mifumo ya kompyuta inayodhibiti breki za kuzuia kufungika (ABS) na mifuko ya hewa.`
    }
  };

  return (
    <div className="app-container">
      <div className="login-box">
        {selectedYear ? (
          <div className="content-view">
            <h2 className="login-title">{selectedCourse}</h2>
            <h3 className="year-subtitle">{selectedYear}</h3>
            <pre className="note-text">{syllabus[selectedCourse][selectedYear]}</pre>
            <button className="back-btn" onClick={() => setSelectedYear(null)}>Rudi Kwenye Miaka</button>
          </div>
        ) : selectedCourse ? (
          <div className="content-view">
            <h2 className="login-title">{selectedCourse}</h2>
            <p className="subtitle">Chagua Mwaka wa Masomo</p>
            <div className="course-list">
              {Object.keys(syllabus[selectedCourse]).map(year => (
                <button key={year} className="course-btn" onClick={() => setSelectedYear(year)}>
                  {year}
                </button>
              ))}
            </div>
            <button className="back-btn" onClick={() => setSelectedCourse(null)}>Rudi Kwenye Fani</button>
          </div>
        ) : (
          <>
            <h2 className="login-title">VETA Portal</h2>
            <p className="subtitle">Chagua Fani ya Kujisomea</p>
            <div className="course-list">
              {Object.keys(syllabus).map(course => (
                <button key={course} className="course-btn" onClick={() => setSelectedCourse(course)}>
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
