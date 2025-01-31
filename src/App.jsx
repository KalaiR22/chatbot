import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router } from "react-router-dom";

function App() {


  return (
    <>
      <Router>
        <Dashboard />
      </Router>
    </>
  );
}

export default App
