import React, { useState, useEffect } from 'react';
import { CreateDevice } from './Components/CreateDevice';
import { DisplayDevice } from './Components/DisplayDevice';
import { readAll } from './Communication/Communication';

import './App.css';

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
  }, [])

  // const handleClickOnSort = (event: MouseEvent<HTMLDivElement>) => {
  //   let sortableHtmlElement = document.querySelectorAll('.sortable-table-header');
  //   type targetElementType = 'deviceName' | 'deviceType' | 'ownerName' | 'batteryStatus';
  //   let targetElementId: targetElementType;
  //   let sortOrder: 'ascending' | 'descending';

  //   sortableHtmlElement.forEach((element, idx) => {
  //     if (element.id == event.currentTarget.id) {
  //       element.classList.add('selected');
  //       targetElementId = element.id as targetElementType;

  //       sortOrder = sorting[targetElementId] == 'ascending' ? 'descending' : 'ascending';
  //       setSorting(prevData => ({ ...prevData, [targetElementId]: sortOrder, tableToSort: targetElementId, sortOrder: sortOrder }));
  //     }
  //     else {
  //       element.classList.remove('selected');
  //     }
  //   });

  // };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", position: 'relative' }} >
      <div id='header' style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: '10%' }}>
        <h2>DEVICE MANAGEMENT APP</h2>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '10%', justifyContent: 'center' }}>
        <CreateDevice setDataFromServer={setDataFromServer} />
      </div>

      <div id='content' style={{ display: "flex", flexDirection: 'column', width: "100%", height: "80%", justifyContent: 'center', alignItems: 'center' }}>


        <div style={{ width: "80%", height: "80%" }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>

            <DisplayDevice
              dataFromServer={dataFromServer}
              setDataFromServer={setDataFromServer}
              sorting={sorting}
              setSorting={setSorting}
            />

          </div>
        </div>

      </div>

    </div >
  );
}

export default App;
