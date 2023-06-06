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
    const handleRowClick = (id: number) => {
        console.log('Clicked item id:', id);
        // Perform any additional logic with the id
    };

    let content = dataFromServer.map((item) => (
        <tr key={item.id} onClick={() => handleRowClick(item.id)}>
            <td>{item.deviceName || "N/A"}</td>
            <td>{item.deviceType || "N/A"}</td>
            <td>{item.ownerName || "N/A"}</td>
            <td>{item.batteryStatus || "N/A"}</td>
            <td><button>update</button></td>
            <td><button>delete</button></td>
        </tr>
    ))

    return (
        <tbody>
            {content}
        </tbody>


    )

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
        return (<tbody>
            <tr>
                <td>Loading...</td>
            </tr>
        </tbody>
        )  // Render a loading state or placeholder while data is being fetched
    }

    return <DisplayDevice dataFromServer={dataFromServer} />;
}