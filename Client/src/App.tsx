import React, { useState, MouseEvent, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { CreateDevice } from './Components/CreateDevice';
import { DisplayDevice } from './Components/DisplayDevice';
import './Components/CSS/DisplayDevice.css'

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
        const response = await axios.get('http://localhost:5000/readAll');
        // const response = await axios.get('http://18.184.49.238:5000/readAll');
        setDataFromServer(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData()
  }, [])

  const handleClickOnSort = (event: MouseEvent<HTMLDivElement>) => {
    let sortableHtmlElement = document.querySelectorAll('.sortable-table-header');
    type targetElementType = 'deviceName' | 'deviceType' | 'ownerName' | 'batteryStatus';
    let targetElementId: targetElementType;
    let sortOrder: 'ascending' | 'descending';

    sortableHtmlElement.forEach((element, idx) => {
      if (element.id == event.currentTarget.id) {
        element.classList.add('selected');
        targetElementId = element.id as targetElementType;

        sortOrder = sorting[targetElementId] == 'ascending' ? 'descending' : 'ascending';
        setSorting(prevData => ({ ...prevData, [targetElementId]: sortOrder, tableToSort: targetElementId, sortOrder: sortOrder }));
      }
      else {
        element.classList.remove('selected');
      }
    });

  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", position: 'relative' }} >
      <div id='header' style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: '10%' }}>
        <h2>DEVICE MANAGEMENT APP</h2>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '10%', justifyContent: 'center' }}>
        {/* <CreateDevice setDataFromServer={setDataFromServer} /> */}
      </div>

      <div id='content' style={{ display: "flex", flexDirection: 'column', width: "100%", height: "80%", justifyContent: 'center', alignItems: 'center' }}>
        {/* <CreateDevice setDataFromServer={setDataFromServer} /> */}

        <div style={{ width: "80%", height: "80%" }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>

            <div id='headerContainer' style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '10%', fontFamily: 'Roboto-Medium' }}>


              <div className='sortable-table-header selected' id='deviceName' onClick={(event) => { handleClickOnSort(event) }} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '20%', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%', height: '100%' }}>
                  DEVICE NAME
                </div>
                <div className='sortIcon' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%' }}>
                  {sorting.deviceName == 'ascending' ? (<i className="bi bi-sort-down"></i>) : <i className="bi bi-sort-up"></i>}
                </div>
              </div>

              <div className='sortable-table-header' id='deviceType' onClick={(event) => { handleClickOnSort(event) }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%', height: '100%' }}>
                  DEVICE TYPE
                </div>
                <div className='sortIcon' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%' }}>
                  {sorting.deviceType == 'ascending' ? (<i className="bi bi-sort-down"></i>) : <i className="bi bi-sort-up"></i>}
                </div>
              </div>

              <div className='sortable-table-header' id='ownerName' onClick={(event) => { handleClickOnSort(event) }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%', height: '100%' }}>
                  OWNER NAME
                </div>
                <div className='sortIcon' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%' }}>
                  {sorting.ownerName == 'ascending' ? (<i className="bi bi-sort-down"></i>) : <i className="bi bi-sort-up"></i>}
                </div>
              </div>

              <div className='sortable-table-header' id='batteryStatus' onClick={(event) => { handleClickOnSort(event) }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%', height: '100%' }}>
                  BATTERY STATUS
                </div>
                <div className='sortIcon' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%' }}>
                  {sorting.batteryStatus == 'ascending' ? (<i className="bi bi-sort-numeric-down"></i>) : < i className="bi bi-sort-numeric-up"></i>}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%', height: '100%' }}>
                  ACTION
                </div>
              </div>

            </div>

            <div id='dataContainer' style={{ display: 'flex', width: '100%', height: '100%', overflow: 'hidden scroll' }}>
              <DisplayDevice
                dataFromServer={dataFromServer}
                setDataFromServer={setDataFromServer}
                sorting={sorting}
              />
            </div>

          </div>
        </div>

      </div>

    </div >
  );
}

export default App;
