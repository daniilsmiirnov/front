
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ObjectsList from './components/ObjectsList/ObjectsList';
import AboutObject from './components/AboutObject/AboutObject';
import Auth from './components/auth/auth'
import Register from './components/auth/register'
import Expeditions from './components/Expeditions/expedition'
import ExpHistory from './components/Expeditions/exp_history';
import SingleExpedition from './components/Expeditions/singelExp'; 
import ObjectTable from './components/ObjMod/Obj_Mod'
import  ObjectDetails from './components/ObjMod/AboutObjMod'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {

  return (

    <BrowserRouter basename="/Main/">
      <Routes>
        <Route path="" element={<ObjectsList />} />
        {/* <Route path="/Main/" element={<ObjectsList />} /> */}
        <Route path="/about/" element={<AboutObject />} />
        <Route path="/object_list/" element={<ObjectTable />} />
        <Route path="/object/:id" element={<ObjectDetails />} />
        {/* <Route path="/Main/about/" element={<AboutObject />} /> */}
        <Route path="/auth/" element={<Auth />} />
        <Route path="/register/" element={<Register />} />
        <Route path="/expedition/:id" element={<Expeditions />} />
        <Route path="/expedition_history/" element={<ExpHistory />} />
        {/* <Route path="/expedition/:id" element={<SingleExpedition />} /> */}

      </Routes>
    </BrowserRouter>

  );
};

export default App