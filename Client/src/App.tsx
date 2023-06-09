import React, { useState, MouseEvent, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { FetchCurrentData } from './Components/FetchCurrentData';
import { CreateDevice } from './Components/CreateDevice';
import { DisplayDevice } from './Components/DisplayDevice';
import { UpdateDevice } from './Components/UpdateDevice';
import { DeleteDevice } from './Components/DeleteDevice';
import Button from 'react-bootstrap/Button';

type DataFromServerProp = {
  id: string;
  deviceName: string;
  deviceType: string;
  ownerName: string;
  batteryStatus: string;
}[]

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [dataFromServer, setDataFromServer] = useState<DataFromServerProp>([])
  const [valueOfUpdate, setValueOfUpdate] = useState({
    isButtonClicked: false,
    data: {
      id: '',
      deviceName: '',
      deviceType: '',
      ownerName: '',
      batteryStatus: ''
    }
  })
  const [valueOfDelete, setValueOfDelete] = useState({
    isButtonClicked: false,
    idToDelete: ['']
  })
  const [sortOrder, setSortOrder] = useState({
    ascending: true

  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // setStatus("loading");
        // const response = await axios.get('http://localhost:5000/readAll');
        const response = await axios.get('http://localhost:5000/readAll');
        // const response = await axios.get('http://18.184.49.238:5000/readAll');
        setDataFromServer(response.data);
        // setStatus("success");
      } catch (error) {
        console.log(error);
        // setStatus("error");
      }
    };
    fetchData()
  }, [])

  // FetchCurrentData({ setDataFromServer: setDataFromServer })

  const openForm = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsFormOpen(true);
  };

  const closeForm = (event: MouseEvent) => {
    setIsFormOpen(false)
    setValueOfUpdate((oldData) => ({ ...oldData, isButtonClicked: false }))
  };

  const handleClickOnSelectAllCheckbox = () => {

    var selectAllCheckbox = document.getElementById("selectAllCheckbox") as HTMLInputElement;
    var checkboxes = document.querySelectorAll('input[name="checkbox"]') as NodeListOf<HTMLInputElement>;
    let selectedItems: string[] = []

    if (selectAllCheckbox.checked) {
      for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = true
        setValueOfDelete((oldData) => ({ ...oldData, isButtonClicked: true }));
        selectedItems.push(checkboxes[i].id)
      }
    }
    else {
      for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
        setValueOfDelete((oldData) => ({ ...oldData, isButtonClicked: false }));
        selectedItems.push(checkboxes[i].id)
      }
    }
    setValueOfDelete((oldData) => ({ ...oldData, idToDelete: selectedItems }));
  }

  const handleClickOnSort = () => {

    if (sortOrder.ascending) {
      setSortOrder((sordOrder) => ({ ...sordOrder, ascending: false }))
      dataFromServer.sort((a, b) => {
        const nameA = a.deviceName.toUpperCase(); // ignore upper and lowercase
        const nameB = b.deviceName.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      })
    }
    else {
      setSortOrder((sordOrder) => ({ ...sordOrder, ascending: true }))
      dataFromServer.sort((a, b) => {
        const nameA = a.deviceName.toUpperCase(); // ignore upper and lowercase
        const nameB = b.deviceName.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }

        // names must be equal
        return 0;
      })
    }





  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", position: 'relative' }} onClick={closeForm}>
      <div id='header' style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: '10%' }}>
        <h2>DEVICE MANAGEMENT APP</h2>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '10%', justifyContent: 'center' }}>
        {/* <button onClick={openForm} style={{
          borderRadius: '5px', backgroundColor: 'rgb(50,48,48)', color: 'rgb(185,184,184)', fontFamily: 'Roboto-Medium',
          fontSize: '1.5vh', border: '0px', height: '60%', justifyContent: 'center',
        }}>ADD NEW DEVICE</button> */}

        <Button variant="secondary" onClick={openForm}>
          ADD NEW DEVICE
        </Button>
      </div>

      {/* When CreateDevices is Displayed? blur other sibling elements */}
      {isFormOpen && <CreateDevice setDataFromServer={setDataFromServer} setIsFormOpen={setIsFormOpen} />}


      <div id='content' style={{ display: "flex", width: "100%", height: "80%", justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: "80%", height: "80%" }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
            <div id='headerContainer' style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '10%', fontFamily: 'Roboto-Medium' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '5%', height: '100%' }}>
                <input id='selectAllCheckbox' type="checkbox" style={{ width: '1.5rem', height: '1.5rem' }} onChange={handleClickOnSelectAllCheckbox} />
              </div>
              <div id='deleteButton' style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '3%', height: '100%' }}>
                {valueOfDelete.isButtonClicked &&
                  <DeleteDevice
                    valueOfDelete={valueOfDelete}
                    setValueOfDelete={setValueOfDelete}
                    setDataFromServer={setDataFromServer}
                  />
                }
              </div>
              <div id='titleContainer' style={{ display: 'flex', flexDirection: 'row', width: '90%', height: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '20%', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '0px' }}>

                    {sortOrder.ascending
                      ? <i className="bi bi-sort-down" style={{ fontSize: '1.5rem' }} onClick={handleClickOnSort}></i>
                      : <i className="bi bi-sort-up" style={{ fontSize: '1.5rem' }} onClick={handleClickOnSort}></i>}
                  </div>
                  <div>
                    DEVICE NAME
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%' }}>DEVICE TYPE</div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%' }}>OWNER NAME</div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%' }}>BATTERY STATUS</div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%' }}>ACTION</div>
              </div>
            </div>
            <div id='dataContainer' style={{ display: 'flex', width: '100%', height: '100%', overflow: 'hidden scroll' }}>
              <DisplayDevice
                dataFromServer={dataFromServer}
                setValueOfUpdate={setValueOfUpdate}
                setValueOfDelete={setValueOfDelete}
                sortOrder={sortOrder}
              />
            </div>
          </div>
        </div>
      </div>

      {
        valueOfUpdate.isButtonClicked && <UpdateDevice
          valueOfUpdate={valueOfUpdate}
          setValueOfUpdate={setValueOfUpdate}
          setDataFromServer={setDataFromServer}
        />
      }

      {/* {
        valueOfDelete.isButtonClicked && <DeleteDevice
          valueOfDelete={valueOfDelete}
          setValueOfDelete={setValueOfDelete}
          setDataFromServer={setDataFromServer}
        />
      } */}
    </div >
  );
}

export default App;
