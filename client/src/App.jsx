import React, { useState } from 'react';
import './index.css';

function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [sectionType, setSectionType] = useState(null); // "notes" au "exams"
  const [selectedYear, setSelectedYear] = useState(null);

  // Weka link za Google Drive (hakikisha mwisho wake kuna /preview)
  const contentLinks = {
    "Pipe Fitting": {
      notes: {
        "Mwaka wa Kwanza": "https://drive.google.com/file/d/LINK_YA_PIPE_FITTING_NOTES_Y1/preview",
        "Mwaka wa Pili": "https://drive.google.com/file/d/LINK_YA_PIPE_FITTING_NOTES_Y2/preview",
        "Mwaka wa Tatu": "https://drive.google.com/file/d/LINK_YA_PIPE_FITTING_NOTES_Y3/preview"
      },
      exams: {
        "Mwaka wa Kwanza": "https://drive.google.com/file/d/LINK_YA_PIPE_FITTING_EXAM_Y1/preview",
        "Mwaka wa Pili": "https://drive.google.com/file/d/LINK_YA_PIPE_FITTING_EXAM_Y2/preview",
        "Mwaka wa Tatu": "https://drive.google.com/file/d/LINK_YA_PIPE_FITTING_EXAM_Y3/preview"
      }
    },
    "Electrical Installation": {
      notes: {
        "Mwaka wa Kwanza": "https://drive.google.com/file/d/LINK_YA_ELECTRICAL_NOTES_Y1/preview",
        "Mwaka wa Pili": "https://drive.google.com/file/d/LINK_YA_ELECTRICAL_NOTES_Y2/preview",
        "Mwaka wa Tatu": "https://drive.google.com/file/d/LINK_YA_ELECTRICAL_NOTES_Y3/preview"
      },
      exams: {
        "Mwaka wa Kwanza": "https://drive.google.com/file/d/LINK_YA_ELECTRICAL_EXAM_Y1/preview",
        "Mwaka wa Pili": "https://drive.google.com/file/d/LINK_YA_ELECTRICAL_EXAM_Y2/preview",
        "Mwaka wa Tatu": "https://drive.google.com/file/d/LINK_YA_ELECTRICAL_EXAM_Y3/preview"
      }
    },
    "Motor Vehicle Mechanics": {
      notes: {
        "Mwaka wa Kwanza": "https://drive.google.com/file/d/LINK_YA_MECHANICS_NOTES_Y1/preview",
        "Mwaka wa Pili": "https://drive.google.com/file/d/LINK_YA_MECHANICS_NOTES_Y2/preview",
        "Mwaka wa Tatu": "https://drive.google.com/file/d/LINK_YA_MECHANICS_NOTES_Y3/preview"
      },
      exams: {
        "Mwaka wa Kwanza": "https://drive.google.com/file/d/LINK_YA_MECHANICS_EXAM_Y1/preview",
        "Mwaka wa Pili": "https://drive.google.com/file/d/LINK_YA_MECHANICS_EXAM_Y2/preview",
        "Mwaka wa Tatu": "https://drive.google.com/file/d/LINK_YA_MECHANICS_EXAM_Y3/preview"
      }
    }
  };

  return (
    <div className="app-container">
      {/* Maandishi ya chini kwenye mchanga */}
      <div className="sand-watermark">by ANDREA</div>

      <div className="login-box wide-box">
        {selectedYear ? (
          <div className="content-view">
            <h2 className="login-title">{selectedCourse}</h2>
            <h3 className="section-tag">{sectionType === "notes" ? "Notisi za Masomo" : "Mitihani ya CBA (Past Papers)"} - {selectedYear}</h3>
            
            <iframe 
              src={contentLinks[selectedCourse][sectionType][selectedYear]} 
              title="VETA Document Viewer"
              className="pdf-viewer"
            ></iframe>

            <button className="back-btn" onClick={() => setSelectedYear(null)}>Rudi Kwenye Miaka</button>
          </div>
        ) : sectionType ? (
          <div className="content-view">
            <h2 className="login-title">{selectedCourse}</h2>
            <h3 className="section-tag">{sectionType === "notes" ? "Chagua Mwaka wa Notisi" : "Chagua Mwaka wa Mtihani"}</h3>
            <div className="course-list">
              {Object.keys(contentLinks[selectedCourse][sectionType]).map(year => (
                <button key={year} className="course-btn" onClick={() => setSelectedYear(year)}>
                  {year}
                </button>
              ))}
            </div>
            <button className="back-btn" onClick={() => setSectionType(null)}>Rudi Nyuma</button>
          </div>
        ) : selectedCourse ? (
          <div className="content-view">
            <h2 className="login-title">{selectedCourse}</h2>
            <p className="subtitle">Ungependa kusoma nini?</p>
            <div className="course-list">
              <button className="course-btn main-action-btn" onClick={() => setSectionType("notes")}>
                📚 Notisi za Masomo Yote (Notes)
              </button>
              <button className="course-btn main-action-btn" onClick={() => setSectionType("exams")}>
                📝 Mitihani ya VETA (CBA Past Papers)
              </button>
            </div>
            <button className="back-btn" onClick={() => setSelectedCourse(null)}>Rudi Kwenye Fani</button>
          </div>
        ) : (
          <>
            <h2 className="login-title">VETA Portal</h2>
            <p className="subtitle">Chagua Fani ya Kujisomea</p>
            <div className="course-list">
              {Object.keys(contentLinks).map(course => (
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
