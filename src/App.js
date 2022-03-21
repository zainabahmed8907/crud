import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './components/Home';
import View from "./components/View";
import Edit from "./components/Edit";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route  path="/" element={<Home/>} />
          <Route path="/view/:id" element={<View/>}/>
          <Route path="/edit/:id" element={<Edit/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
