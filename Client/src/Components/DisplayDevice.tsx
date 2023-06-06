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

interface ChildComponentProps {
    setSelectedDeviceValue: React.Dispatch<React.SetStateAction<{
        id: string;
        deviceName: string;
        deviceType: string;
        ownerName: string;
        batteryStatus: string;
    }>>,
    setIsUpdateButtonClicked: React.Dispatch<React.SetStateAction<boolean>>
}

export function DisplayDevice({ setSelectedDeviceValue, setIsUpdateButtonClicked }: ChildComponentProps) {

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

    const handleClickOnUpdate = (event: MouseEvent, item: { id: string, deviceName: string, deviceType: string, ownerName: string, batteryStatus: string, }) => {
        event.stopPropagation();
        console.log('click on update button')
        setIsUpdateButtonClicked(true)
        setSelectedDeviceValue(item);
    };


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
                    <button>delete</button>
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



// function DisplayDeviceTest({ dataFromServer }: { dataFromServer: Device }) {
//     const handleRowClick = (id: number) => {
//         console.log('Clicked item id:', id);
//         // Perform any additional logic with the id
//     };


//     let content = dataFromServer.map((item) => (
//         <div style={{ display: 'flex', flexDirection: 'row' }}>
//             <div style={{ display: 'flex', justifyContent: 'start', height: '50px', width: '20%' }}>{item.deviceName || "N/A"}</div>
//             <div style={{ display: 'flex', justifyContent: 'start', width: '20%' }}>{item.deviceType || "N/A"}</div>
//             <div style={{ display: 'flex', justifyContent: 'start', width: '20%' }}>{item.ownerName || "N/A"}</div>
//             <div style={{ display: 'flex', justifyContent: 'start', width: '20%' }}>{item.batteryStatus || "N/A"}</div>
//             <div style={{ display: 'flex', justifyContent: 'start', width: '20%' }}><button>update</button></div>
//             <div style={{ display: 'flex', justifyContent: 'start', width: '20%' }}><button>delete</button></div>
//         </div>

//     ))

//     return (
//         <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
//             {content}
//         </div>
//     )
// }

// export function DisplayDeviceWrapper() {
//     const [dataFromServer, setDataFromServer] = useState<Device>([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/readAll');
//                 setDataFromServer(response.data);
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         fetchData();
//     }, []);

//     if (dataFromServer.length === 0) {
//         return (<tbody>
//             <tr>
//                 <td>Loading...</td>
//             </tr>
//         </tbody>
//         )  // Render a loading state or placeholder while data is being fetched
//     }

//     return <DisplayDevice dataFromServer={dataFromServer} />;
// }