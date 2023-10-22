import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ObjectsList from './components/ObjectsList/ObjectsList';
import {Container} from 'react-bootstrap'
function App() {

  return (
    <Container>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<HomePage /} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} /> */}
        <Route path="/" element={<ObjectsList />} />
        <Route path="/1" element={<h1>hi2</h1>} />
      </Routes>
    </BrowserRouter>
    </Container>
  );
};

export default App
