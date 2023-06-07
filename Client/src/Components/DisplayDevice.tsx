import axios from "axios";
import React, { useState, MouseEvent } from "react";
import Button from 'react-bootstrap/Button';

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
    }>>
}

export function DisplayDevice({ dataFromServer, setValueOfUpdate, setValueOfDelete }: DisplayDeviceProps) {

    const [status, setStatus] = useState<setStatusProp>('loading');

    // if (dataFromServer.length == 0) {
    //     setStatus('loading')
    // }
    // else if (dataFromServer.length > 0) {
    //     setStatus('success')
    // }

    const handleClickOnUpdate = (event: MouseEvent, item: { id: string, deviceName: string, deviceType: string, ownerName: string, batteryStatus: string }) => {
        event.stopPropagation();
        setValueOfUpdate((oldData) => ({ ...oldData, isButtonClicked: true, data: item }))
    };

    const handleClickOnDelete = (event: MouseEvent, item: { id: string, deviceName: string, deviceType: string, ownerName: string, batteryStatus: string }) => {
        event.stopPropagation();
        setValueOfDelete((oldData) => ({ ...oldData, isButtonClicked: true, idToDelete: [item.id] }))
    }


    let content;
    // if (status === 'loading') {
    //     content = <div>Loading...</div>;
    // }
    // else if (status === 'success') {
    content = dataFromServer.map((item) => (
        <div key={item.id} style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ display: 'flex', justifyContent: 'start', height: '50px', width: '20%' }}>
                {item.deviceName || 'N/A'}
            </div>
            <div style={{ display: 'flex', justifyContent: 'start', width: '20%' }}>
                {item.deviceType || 'N/A'}
            </div>
            <div style={{ display: 'flex', justifyContent: 'start', width: '20%' }}>
                {item.ownerName || 'N/A'}
            </div>
            <div style={{ display: 'flex', justifyContent: 'start', width: '20%' }}>
                {item.batteryStatus || 'N/A'}
            </div>
            <div style={{ display: 'flex', justifyContent: 'start', width: '20%' }}>
                <button onClick={(event) => handleClickOnUpdate(event, item)}>update</button>
                {/* <Button variant="primary" onClick={(event) => handleClickOnUpdate(event, item)}>
                    UPDATE
                </Button> */}

            </div>
            <div style={{ display: 'flex', justifyContent: 'start', width: '20%' }}>
                <button onClick={(event) => handleClickOnDelete(event, item)}>delete</button>
                {/* <DeleteDevice selectedId={item.id} /> */}
            </div>
        </div>
    ));
    // }
    // else if (status === 'error') {
    //     content = <div>ERROR</div>;
    // }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
            {content}
        </div>
    );
}