import React from 'react';
import './index.css';

function App() {
  return (
    <div className="app-container">
      <div className="login-box">
        <h2 className="login-title">
          <span className="lock-icon">🔒</span> Welcome
        </h2>
        <div className="input-group">
          <label>Email address</label>
          <input type="email" placeholder="Enter your email" />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <button className="login-btn">Login</button>
        <div className="extra-links">
          <a href="#">Sijakumbuka Password?</a>
          <a href="#">Sajili Akaunti</a>
        </div>
      </div>
      <div className="powered-footer">Powered by ANDREA</div>
    </div>
  );
}

export default App;
