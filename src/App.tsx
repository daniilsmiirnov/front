// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ObjectsList from './components/ObjectsList/ObjectsList';
// import {Container} from 'react-bootstrap'
import AboutObject from './components/AboutObject/AboutObject';
// import React from 'react'
// import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {

  return (

    <BrowserRouter basename="/front">
      <Routes>
        <Route path="" element={<ObjectsList />} />
        {/* <Route path="/Main/" element={<ObjectsList />} /> */}
        <Route path="/about/" element={<AboutObject />} />
        {/* <Route path="/Main/about/" element={<AboutObject />} /> */}
      </Routes>
    </BrowserRouter>

  );
};
// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );

// root.render(
//     // <BrowserRouter basename="/front">
//     <BrowserRouter basename="/front">
//       <Routes>
//         <Route path="" element={<ObjectsList />} />
//         <Route path="/Main/" element={<ObjectsList />} />
//         <Route path="/about/" element={<AboutObject />} />
//         <Route path="/Main/about/" element={<AboutObject />} />
//       </Routes>
//     </BrowserRouter>
// );
export default App
