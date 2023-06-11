import axios from "axios";
import React, { useState, MouseEvent } from "react";
import Button from 'react-bootstrap/Button';
import { DeleteDevice } from "./DeleteDevice";
import { Delete } from "./Delete";

type Device = {
    id: string;
    deviceName: string;
    deviceType: string;
    ownerName: string;
    batteryStatus: string;
}[]

type setStatusProp = 'loading' | 'success' | 'error';

interface DisplayDeviceProps {
    dataFromServer: Device,

    setValueOfUpdate: React.Dispatch<React.SetStateAction<{
        isButtonClicked: boolean,
        data: {
            id: string;
            deviceName: string;
            deviceType: string;
            ownerName: string;
            batteryStatus: string;
        }
    }>>,
    setValueOfDelete: React.Dispatch<React.SetStateAction<{
        isButtonClicked: boolean,
        idToDelete: string[]
    }>>,
    setDataFromServer: React.Dispatch<React.SetStateAction<
        {
            id: string;
            deviceName: string;
            deviceType: string;
            ownerName: string;
            batteryStatus: string;
        }[]
    >>,
    sorting: {
        tableToSort: 'deviceName' | 'deviceType' | 'ownerName' | 'batteryStatus',
        sortOrder: 'ascending' | 'descending'
    }
}

export function DisplayDevice({ dataFromServer, setValueOfUpdate, setValueOfDelete, setDataFromServer, sorting }: DisplayDeviceProps) {

    const handleClickOnUpdate = (event: MouseEvent, item: { id: string, deviceName: string, deviceType: string, ownerName: string, batteryStatus: string }) => {
        event.stopPropagation();
        setValueOfUpdate((oldData) => ({ ...oldData, isButtonClicked: true, data: item }))
    };

    const findListOfSelectedItems = (item: { id: string, deviceName: string, deviceType: string, ownerName: string, batteryStatus: string }) => {
        var checkboxes = document.querySelectorAll('input[name="checkbox"]:checked');
        let selectedItems: string[] = []

        if (checkboxes.length == 0) {
            setValueOfDelete((oldData) => ({ ...oldData, isButtonClicked: false }));
            return
        }

        for (var i = 0; i < checkboxes.length; i++) {
            selectedItems.push(checkboxes[i].id)
        }
        setValueOfDelete((oldData) => ({ ...oldData, isButtonClicked: true, idToDelete: selectedItems }));
    }

    function sort(dataFromServer: Device, tableToSort: 'deviceName' | 'deviceType' | 'ownerName' | 'batteryStatus', sortOrder: 'ascending' | 'descending') {
        dataFromServer.sort((a, b) => {
            const nameA = a[tableToSort].toUpperCase(); // ignore upper and lowercase
            const nameB = b[tableToSort].toUpperCase(); // ignore upper and lowercase

            if (nameA < nameB) {
                return sortOrder == 'ascending' ? -1 : 1;
            }
            if (nameA > nameB) {
                return sortOrder == 'ascending' ? 1 : -1;
            }

            // names must be equal
            return 0;
        })
    }

    sort(dataFromServer, sorting.tableToSort, sorting.sortOrder);



    let content;
    content = dataFromServer.map((item) => (
        <div key={item.id} style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ display: 'none', justifyContent: 'center', alignItems: 'center', width: '5%', height: '100%' }}>
                <input style={{ width: '1.5rem', height: '1.5rem' }} name="checkbox" type="checkbox" id={item.id} onClick={() => { findListOfSelectedItems(item) }} />
            </div>
            <div style={{ width: '3%', height: '100%' }}>

            </div>
            <div style={{ display: 'flex', flexDirection: 'row', width: '90%', height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', height: '50px', width: '20%' }}>
                    {item.deviceName || 'N/A'}
                </div>
                <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', width: '20%' }}>
                    {item.deviceType || 'N/A'}
                </div>
                <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', width: '20%' }}>
                    {item.ownerName || 'N/A'}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%' }}>
                    {item.batteryStatus || 'N/A'}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%' }}>
                    {/* <Button variant="secondary" onClick={(event) => handleClickOnUpdate(event, item)}>
                        UPDATE
                    </Button> */}
                    <div style={{ width: '50%', height: '100%' }}>
                        <i className="bi bi-pencil-square" style={{ fontSize: '1.3rem', color: 'green' }} onClick={(event) => handleClickOnUpdate(event, item)}></i>
                    </div>
                    <div style={{ width: '50%', height: '100%' }}>
                        {/* <i className="bi bi-pencil-square" style={{ fontSize: '1.3rem', color: 'green' }} onClick={(event) => handleClickOnUpdate(event, item)}></i> */}
                        {/* <i className="bi bi-trash" style={{ fontSize: '1.3rem', color: 'red' }}></i> */}
                        {/* <DeleteDevice
                    valueOfDelete={valueOfDelete}
                    setValueOfDelete={setValueOfDelete}
                    setDataFromServer={setDataFromServer}
                  /> */}

                        <Delete
                            item={item}
                            setDataFromServer={setDataFromServer}
                        />
                    </div>

                </div>
            </div>
        </div>
    ));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
            {content}
        </div>
    );
}