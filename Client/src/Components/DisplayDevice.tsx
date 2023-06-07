import axios from "axios";
import { type } from "os";
import React, { useState, useEffect, MouseEvent } from "react";

type Device = {
    id: string;
    deviceName: string;
    deviceType: string;
    ownerName: string;
    batteryStatus: string;
}[]

type setStatusProp = 'loading' | 'success' | 'error';

interface DisplayDeviceProps {
    setSelectedDeviceValue: React.Dispatch<React.SetStateAction<{
        id: string;
        deviceName: string;
        deviceType: string;
        ownerName: string;
        batteryStatus: string;
    }>>,
    setIsUpdateButtonClicked: React.Dispatch<React.SetStateAction<boolean>>,
    setIsDeleteButtonClicked: React.Dispatch<React.SetStateAction<{
        status: boolean,
        id: string
    }>>
}

export function DisplayDevice({ setSelectedDeviceValue, setIsUpdateButtonClicked, setIsDeleteButtonClicked }: DisplayDeviceProps) {

    const [status, setStatus] = useState<setStatusProp>('loading');
    const [dataFromServer, setDataFromServer] = useState<Device>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setStatus("loading");
                const response = await axios.get('http://localhost:5000/readAll');
                setDataFromServer(response.data);
                setStatus("success");
            } catch (error) {
                console.log(error);
                setStatus("error");
            }
        };

        fetchData();
    }, []);

    const handleClickOnUpdate = (event: MouseEvent, item: { id: string, deviceName: string, deviceType: string, ownerName: string, batteryStatus: string }) => {
        event.stopPropagation();
        console.log('click on update button')
        setIsUpdateButtonClicked(true)
        setSelectedDeviceValue(item);
    };

    const handleClickOnDelete = (event: MouseEvent, item: { id: string, deviceName: string, deviceType: string, ownerName: string, batteryStatus: string }) => {
        event.stopPropagation();
        setIsDeleteButtonClicked((oldData) => ({ ...oldData, status: true, id: item.id }));
    }


    let content;
    if (status === 'loading') {
        content = <div>Loading...</div>;
    }
    else if (status === 'success') {
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
                </div>
                <div style={{ display: 'flex', justifyContent: 'start', width: '20%' }}>
                    <button onClick={(event) => handleClickOnDelete(event, item)}>delete</button>
                </div>
            </div>
        ));
    }
    else if (status === 'error') {
        content = <div>ERROR</div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
            {content}
        </div>
    );
}