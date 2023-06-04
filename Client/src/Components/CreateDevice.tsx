import React, { useState, ChangeEvent, FormEvent, MouseEvent } from "react";
import axios from "axios";

type DeviceFormState = {
    name: string;
    type: string;
    owner: string;
    batteryStatus: string;
}

function CreateDevice() {
    const [device, setDevice] = useState<DeviceFormState>({
        name: '',
        type: '',
        owner: '',
        batteryStatus: '',
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDevice({ ...device, [name]: value });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        axios.post('http://localhost:5000/createDevice', device).then((res) => { console.log('res:', res.data) })
        console.log(device);
    };

    const handleMouseDown = (event: MouseEvent) => {
        event.stopPropagation();
    };

    return (
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} onClick={handleMouseDown}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <label>
                    Device Name:
                    <input
                        type="text"
                        name="name"
                        value={device.name}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Device Type:
                    <input
                        type="text"
                        name="type"
                        value={device.type}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Owner Name:
                    <input
                        type="text"
                        name="owner"
                        value={device.owner}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Battery Status:
                    <input
                        type="text"
                        name="batteryStatus"
                        value={device.batteryStatus}
                        onChange={handleChange}
                    />
                </label>

                <button type="submit">Submit</button>
            </form>
        </div>


    );
}

export { CreateDevice }

// import React from "react"

// interface DeviceProperties {
//     deviceName: string,
//     deviceType: string
// }

// function CreateDevice(props: DeviceProperties) {
//     return (
//         <div>
//             <div>{props.deviceName}</div>
//             <div>{props.deviceType}</div>
//         </div>
//     )
// }

// export { CreateDevice }