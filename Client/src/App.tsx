import React, { useState, MouseEvent } from 'react';
import './App.css';
import { CreateDevice } from './Components/CreateDevice';
import { DisplayDeviceWrapper } from './Components/DisplayDevice';
import { UpdateDevice } from './Components/UpdateDevice';

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
      <div id='header' style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: '5vh' }}>
        <h2>DEVICE MANAGEMENT APP</h2>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '8vh', justifyContent: 'center' }}>
        <button onClick={openForm} style={{
          borderRadius: '5px', backgroundColor: 'rgb(50,48,48)', color: 'rgb(185,184,184)', fontFamily: 'Roboto-Medium',
          fontSize: '1.5vh', border: '0px', height: '60%', justifyContent: 'center',
        }}>ADD NEW DEVICE</button>
      </div>

      {/* When CreateDevices is Displayed? blur other sibling elements */}
      {isFormOpen && <CreateDevice />}
      <UpdateDevice batteryStatus='hello' deviceName='dfsd' deviceType='afad' ownerName='fasd' />

      <div id='content' style={{ display: "flex", width: "100%", height: "100%", justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: "80%", height: "80%" }}>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>DEVICE NAME</th>
                <th>DEVICE TYPE</th>
                <th>OWNER NAME</th>
                <th>BATTERY STATUS</th>
              </tr>
            </thead>

            {<DisplayDeviceWrapper />}

          </table>
        </div>
      </div>
    </div >
  );
}

export default App;
