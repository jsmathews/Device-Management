import axios from "axios";
import { type } from "os";
import React, { useState, useEffect } from "react";

type Device = {
    id: number;
    deviceName: string;
    deviceType: string;
    ownerName: string;
    batteryStatus: string;
}[]

function DisplayDevice({ dataFromServer }: { dataFromServer: Device }) {
    return (
        <div>
            {dataFromServer.map((item) => (
                <div key={item.id}>
                    <p>Device Name: {item.deviceName || "N/A"}</p>
                    <p>Device Type: {item.deviceType || "N/A"}</p>
                    <p>Owner Name: {item.ownerName || "N/A"}</p>
                    <p>Battery Status: {item.batteryStatus || "N/A"}</p>
                </div>
            ))}
        </div>
    );
}

export function DisplayDeviceWrapper() {
    const [dataFromServer, setDataFromServer] = useState<Device>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/readAll');
                setDataFromServer(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    if (dataFromServer.length === 0) {
        return <div>Loading...</div>; // Render a loading state or placeholder while data is being fetched
    }

    return <DisplayDevice dataFromServer={dataFromServer} />;
}