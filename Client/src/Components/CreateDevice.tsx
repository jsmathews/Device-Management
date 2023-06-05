import React, { useState, ChangeEvent, FormEvent, MouseEvent } from "react";
import axios from "axios";
import './CSS/CreateDevice.css'

type DeviceFormState = {
    deviceName: string;
    deviceType: string;
    ownerName: string;
    batteryStatus: string;
}

function CreateDevice() {
    const [device, setDevice] = useState<DeviceFormState>({
        deviceName: '',
        deviceType: '',
        ownerName: '',
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
        <div id="createFormContainer" onClick={handleMouseDown}>
            <form onSubmit={handleSubmit} >

                <div id="labelAndInputFieldContainer">
                    <div id="labelContainer">
                        <label id="label">DEVICE NAME</label>
                    </div>
                    <div id="inputFieldContainer" >
                        <input id="inputField"
                            type="text"
                            name="deviceName"
                            value={device.deviceName}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div id="labelAndInputFieldContainer">
                    <div id="labelContainer">
                        <label id="label">DEVICE TYPE</label>
                    </div>
                    <div id="inputFieldContainer" >
                        <input id="inputField"
                            type="text"
                            name="deviceType"
                            value={device.deviceType}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div id="labelAndInputFieldContainer">
                    <div id="labelContainer">
                        <label id="label">OWNER NAME</label>
                    </div>
                    <div id="inputFieldContainer" >
                        <input id="inputField"
                            type="text"
                            name="ownerName"
                            value={device.ownerName}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div id="labelAndInputFieldContainer">
                    <div id="labelContainer">
                        <label id="label">BATTERY STATUS</label>
                    </div>
                    <div id="inputFieldContainer" >
                        <input id="inputField"
                            type="text"
                            name="batteryStatus"
                            value={device.batteryStatus}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div id="labelAndInputFieldContainer">
                    <div id="submitButtonContainer" >
                        <button id="submitButton" >CREATE</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export { CreateDevice }