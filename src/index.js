import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <App />
    <div className="star-wars-animation">
      <div className="star star1"></div>
      <div className="star star2"></div>
      <div className="star star3"></div>
      <div className="star star4"></div>
      <div className="star star5"></div>
      <div className="star star6"></div>
      <div className="star star7"></div>
      <div className="star star8"></div>
    </div>
  </>
);
