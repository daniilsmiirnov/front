
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ObjectsList from './components/ObjectsList/ObjectsList';
import AboutObject from './components/AboutObject/AboutObject';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {

  return (

    <BrowserRouter basename="/Main/">
      <Routes>
        <Route path="" element={<ObjectsList />} />
        {/* <Route path="/Main/" element={<ObjectsList />} /> */}
        <Route path="/about/" element={<AboutObject />} />
        {/* <Route path="/Main/about/" element={<AboutObject />} /> */}
      </Routes>
    </BrowserRouter>

  );
};

export default App
