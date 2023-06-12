import React, { useState, useEffect } from 'react';
import { CreateDevice } from './Components/CreateDevice';
import { DisplayDevice } from './Components/DisplayDevice';
import { readAll } from './Communication/Communication';

import './Style/App.css'

type DataFromServerProp = {
  id: string;
  deviceName: string;
  deviceType: string;
  ownerName: string;
  batteryStatus: string;
}[]

function App() {
  const [dataFromServer, setDataFromServer] = useState<DataFromServerProp>([]);

  type sortingProp = {
    tableToSort: 'deviceName' | 'deviceType' | 'ownerName' | 'batteryStatus',
    sortOrder: 'ascending' | 'descending',
    deviceName: 'ascending' | 'descending',
    deviceType: 'ascending' | 'descending',
    ownerName: 'ascending' | 'descending',
    batteryStatus: 'ascending' | 'descending'
  }

  const [sorting, setSorting] = useState<sortingProp>({
    tableToSort: 'deviceName',
    sortOrder: 'ascending',
    deviceName: 'ascending',
    deviceType: 'ascending',
    ownerName: 'ascending',
    batteryStatus: 'ascending'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await readAll();
        setDataFromServer(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData()
    console.log(process.env.REACT_APP_STATUS)
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", position: 'relative' }} >

      <div id='header' style={{
        display: "flex", justifyContent: "flex-end", alignItems: "center", width: "100%", height: '10%',
        backgroundColor: 'rgb(0, 98, 255, 0.9)', color: '#ffffff', borderBottomLeftRadius: '5px', borderBottomRightRadius: '5px'
      }}>
        <div >
          <i className="bi bi-laptop" style={{ fontSize: '2em' }}></i>
        </div>
        <div style={{ fontWeight: 'bolder', fontSize: '1.5em', padding: '10px' }}>
          DEVICE MANAGEMENT APP
        </div>
        {/* <h2>DEVICE MANAGEMENT APP</h2> */}
      </div>

      <div id='content' style={{ display: "flex", flexDirection: 'column', width: "100%", height: "90%", justifyContent: 'center', alignItems: 'center' }}>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: "80%", height: "80%" }}>
          <div>
            <CreateDevice setDataFromServer={setDataFromServer} />
          </div>

          <DisplayDevice
            dataFromServer={dataFromServer}
            setDataFromServer={setDataFromServer}
            sorting={sorting}
            setSorting={setSorting}
          />

        </div>

      </div>

    </div >
  );
}

export default App;
