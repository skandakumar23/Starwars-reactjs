import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Posts from './components/posts/posts.component';
import CharacterPage from './components/characterPage/characterPage.component';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/characters/:characterId" element={<CharacterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
