import React, { useState, MouseEvent } from 'react';
import logo from './logo.svg';
import flowers from './icons/flower.jpg';
import './App.css';
import { CreateDevice } from './Components/CreateDevice';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsFormOpen(true);
  };

  const closeForm = (event: MouseEvent) => {
    setIsFormOpen(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", position: 'relative' }} onClick={closeForm}>
      <div id='header' style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: (window.innerHeight * 0.1) }}>
        <h2>DEVICE MANAGEMENT APP</h2>
      </div>

      <div>
        <button onClick={openForm}>ADD NEW DEVICE</button>
      </div>

      {isFormOpen && <CreateDevice />}


      <div id='content' style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%" }}>
        <div style={{ width: "100%", height: "100%" }}>

        </div>

      </div>
    </div >
  );
}

export default App;
