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

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setDevice({ ...device, [name]: value });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post('http://localhost:5000/createDevice', device).then((res) => { console.log('res:', res.data) })
        console.log(device)
    };

    const handleMouseDown = (event: MouseEvent) => {
        event.stopPropagation();
    };

    type LabelAndInputFieldContainerProps = {
        label: string,
        name: string,
        value: string
    }

    function LabelAndInputFieldContainer(props: LabelAndInputFieldContainerProps) {
        return (
            <div id="labelAndInputFieldContainer">
                <div id="labelContainer">
                    <label id="label">{props.label}</label>
                </div>
                <div id="inputFieldContainer" >
                    <input id="inputField"
                        type="text"
                        name={props.name}
                        value={props.value}
                        onChange={handleChange}
                    />
                </div>
            </div>
        );
    }

    return (
        <div id="createFormContainer" onClick={handleMouseDown}>
            <form onSubmit={handleSubmit} >

                <LabelAndInputFieldContainer label='DEVICE NAME' name='deviceName' value={device.deviceName} />

                <div id="labelAndInputFieldContainer">
                    <div id="labelContainer">
                        <label id="label">DEVICE TYPE</label>
                    </div>
                    <div id="inputFieldContainer" >
                        <select id="selectField" name="deviceType" onChange={handleChange} >
                            <option value="">select an option</option>
                            <option value="Smartphone">Smartphone</option>
                            <option value="Tablet">Tablet</option>
                            <option value="Camera">Camera</option>
                        </select>
                    </div>
                </div>

                <LabelAndInputFieldContainer label='OWNER NAME' name='ownerName' value={device.ownerName} />

                <LabelAndInputFieldContainer label='BATTERY STATUS' name='batteryStatus' value={device.batteryStatus} />

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