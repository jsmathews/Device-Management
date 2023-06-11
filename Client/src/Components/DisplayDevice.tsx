import axios from "axios";
import React, { useState, MouseEvent } from "react";
import Button from 'react-bootstrap/Button';
import { DeleteDevice } from "./DeleteDevice";
import { Delete } from "./Delete";
import { UpdateDevice } from "./UpdateDevice";

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

export function DisplayDevice({ dataFromServer, setDataFromServer, sorting }: DisplayDeviceProps) {

    function sort(dataFromServer: Device, tableToSort: 'deviceName' | 'deviceType' | 'ownerName' | 'batteryStatus', sortOrder: 'ascending' | 'descending') {
        dataFromServer.sort((a, b) => {
            const nameA = a[tableToSort].toUpperCase();
            const nameB = b[tableToSort].toUpperCase();

            if (nameA < nameB) {
                return sortOrder == 'ascending' ? -1 : 1;
            }
            if (nameA > nameB) {
                return sortOrder == 'ascending' ? 1 : -1;
            }
            return 0;
        })
    }

    sort(dataFromServer, sorting.tableToSort, sorting.sortOrder);

    let content;
    content = dataFromServer.map((item) => (
        <div key={item.id} style={{ display: 'flex', flexDirection: 'row' }}>
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
                <UpdateDevice
                    item={item}
                    setDataFromServer={setDataFromServer}
                />
                <Delete
                    item={item}
                    setDataFromServer={setDataFromServer}
                />
            </div>
        </div>
    ));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
            {content}
        </div>
    );
}