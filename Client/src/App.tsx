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
  }, []);

  return (
    <div id='app'>

      <div id='header'>

        <div >
          <i className="bi bi-laptop" style={{ fontSize: '2em' }}></i>
        </div>
        <div style={{ fontWeight: 'bolder', fontSize: '1.5em', padding: '10px' }}>
          DEVICE MANAGEMENT
        </div>

      </div>

      <div id='content'>

        <div>

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
