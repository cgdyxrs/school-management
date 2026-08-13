import React, { useState } from 'react';
import './index.css';

function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const pdfEmbedLinks = {
    "Pipe Fitting": {
      "Mwaka wa Kwanza": "https://drive.google.com/file/d/LINK_YA_PIPE_FITTING_Y1/preview",
      "Mwaka wa Pili": "https://drive.google.com/file/d/LINK_YA_PIPE_FITTING_Y2/preview",
      "Mwaka wa Tatu": "https://drive.google.com/file/d/LINK_YA_PIPE_FITTING_Y3/preview"
    },
    "Electrical Installation": {
      "Mwaka wa Kwanza": "https://drive.google.com/file/d/LINK_YA_ELECTRICAL_Y1/preview",
      "Mwaka wa Pili": "https://drive.google.com/file/d/LINK_YA_ELECTRICAL_Y2/preview",
      "Mwaka wa Tatu": "https://drive.google.com/file/d/LINK_YA_ELECTRICAL_Y3/preview"
    },
    "Motor Vehicle Mechanics": {
      "Mwaka wa Kwanza": "https://drive.google.com/file/d/LINK_YA_MECHANICS_Y1/preview",
      "Mwaka wa Pili": "https://drive.google.com/file/d/LINK_YA_MECHANICS_Y2/preview",
      "Mwaka wa Tatu": "https://drive.google.com/file/d/LINK_YA_MECHANICS_Y3/preview"
    }
  };

  return (
    <div className="app-container">
      {/* Maandishi ya "by ANDREA" yaliyokaa chini kwenye eneo la mchanga */}
      <div className="sand-watermark">by ANDREA</div>

      <div className="login-box wide-box">
        {selectedYear ? (
          <div className="content-view">
            <h2 className="login-title">{selectedCourse}</h2>
            <h3 className="year-subtitle">{selectedYear}</h3>
            
            <iframe 
              src={pdfEmbedLinks[selectedCourse][selectedYear]} 
              title="Notisi za VETA"
              className="pdf-viewer"
            ></iframe>

            <button className="back-btn" onClick={() => setSelectedYear(null)}>Rudi Kwenye Miaka</button>
          </div>
        ) : selectedCourse ? (
          <div className="content-view">
            <h2 className="login-title">{selectedCourse}</h2>
            <p className="subtitle">Chagua Mwaka wa Masomo</p>
            <div className="course-list">
              {Object.keys(pdfEmbedLinks[selectedCourse]).map(year => (
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
              {Object.keys(pdfEmbedLinks).map(course => (
                <button key={course} className="course-btn" onClick={() => setSelectedCourse(course)}>
                  {course}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
