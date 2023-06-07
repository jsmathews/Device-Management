import React, { useState, MouseEvent, useEffect } from 'react';
import './App.css';
import { CreateDevice } from './Components/CreateDevice';
import { DisplayDevice } from './Components/DisplayDevice';
import { UpdateDevice } from './Components/UpdateDevice';
import { DeleteDevice } from './Components/DeleteDevice';

type Device = {
  id: string;
  deviceName: string;
  deviceType: string;
  ownerName: string;
  batteryStatus: string;
}

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isUpdateButtonClicked, setIsUpdateButtonClicked] = useState(false);
  const [isDeleteButtonClicked, setIsDeleteButtonClicked] = useState({ status: false, id: '' });
  const [selectedDeviceValue, setSelectedDeviceValue] = useState({
    id: '',
    deviceName: '',
    deviceType: '',
    ownerName: '',
    batteryStatus: ''
  });

  const openForm = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsFormOpen(true);
  };

  const closeForm = (event: MouseEvent) => {
    setIsFormOpen(false);
    setIsUpdateButtonClicked(false)
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", position: 'relative' }} onClick={closeForm}>
      <div id='header' style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: '10%' }}>
        <h2>DEVICE MANAGEMENT APP</h2>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '10%', justifyContent: 'center' }}>
        <button onClick={openForm} style={{
          borderRadius: '5px', backgroundColor: 'rgb(50,48,48)', color: 'rgb(185,184,184)', fontFamily: 'Roboto-Medium',
          fontSize: '1.5vh', border: '0px', height: '60%', justifyContent: 'center',
        }}>ADD NEW DEVICE</button>
      </div>

      {/* When CreateDevices is Displayed? blur other sibling elements */}
      {isFormOpen && <CreateDevice />}


      <div id='content' style={{ display: "flex", width: "100%", height: "80%", justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: "80%", height: "80%" }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
            <div id='headerContainer' style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'center', width: '20%' }} >DEVICE NAME</div>
              <div style={{ display: 'flex', justifyContent: 'center', width: '20%' }}>DEVICE TYPE</div>
              <div style={{ display: 'flex', justifyContent: 'center', width: '20%' }}>OWNER NAME</div>
              <div style={{ display: 'flex', justifyContent: 'center', width: '20%' }}>BATTERY STATUS</div>
              <div style={{ display: 'flex', justifyContent: 'center', width: '20%' }}>ACTION</div>
            </div>
            <div id='dataContainer' style={{ display: 'flex', width: '100%', height: '100%', overflow: 'hidden scroll' }}>
              <DisplayDevice setSelectedDeviceValue={setSelectedDeviceValue} setIsUpdateButtonClicked={setIsUpdateButtonClicked} setIsDeleteButtonClicked={setIsDeleteButtonClicked} />
            </div>
          </div>
        </div>
      </div>

      {isUpdateButtonClicked && <UpdateDevice id={selectedDeviceValue.id}
        deviceName={selectedDeviceValue.deviceName}
        deviceType={selectedDeviceValue.deviceType}
        ownerName={selectedDeviceValue.ownerName}
        batteryStatus={selectedDeviceValue.batteryStatus} />
      }

      {isDeleteButtonClicked.status && <DeleteDevice setIsDeleteButtonClicked={setIsDeleteButtonClicked} isDeleteButtonClicked={isDeleteButtonClicked} />}
    </div >
  );
}

export default App;
