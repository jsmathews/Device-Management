import React, { useState, ChangeEvent, MouseEvent, FormEvent, useEffect } from 'react'
import axios from "axios";
import './CSS/CreateDevice.css'

type UpdateDeviceProps = {
    id?: string;
    deviceName: string;
    deviceType: string;
    ownerName: string;
    batteryStatus: string;
}

export function UpdateDevice(props: UpdateDeviceProps) {
    const [updatedData, setUpdatedData] = useState<UpdateDeviceProps>({ id: '', deviceName: '', deviceType: '', ownerName: '', batteryStatus: '' });

    useEffect(() => {
        console.log('mount')
        setUpdatedData(props);
    }, [])

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setUpdatedData({ ...updatedData, [name]: value });
    };

    const handleMouseDown = (event: MouseEvent) => {
        event.stopPropagation();
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.post('http://localhost:5000/updateDevice', updatedData).then((res) => { console.log('res:', res.data) })
    };


    return (
        <div id="createFormContainer" onClick={handleMouseDown}
        >
            <form onSubmit={handleSubmit} >

                <div id="labelAndInputFieldContainer">
                    <div id="labelContainer">
                        <label id="label">DEVICE NAME</label>
                    </div>
                    <div id="inputFieldContainer" >
                        <input id="inputField"
                            type="text"
                            name="deviceName"
                            value={updatedData.deviceName}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div id="labelAndInputFieldContainer">
                    <div id="labelContainer">
                        <label id="label">DEVICE TYPE</label>
                    </div>
                    <div id="inputFieldContainer" >
                        <select id="selectField" name="deviceType" onChange={handleChange} value={updatedData.deviceType}>
                            <option value="">select an option</option>
                            <option value="Smartphone">Smartphone</option>
                            <option value="Tablet">Tablet</option>
                            <option value="Camera">Camera</option>
                        </select>
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
                            value={updatedData.ownerName}
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
                            value={updatedData.batteryStatus}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div id="labelAndInputFieldContainer">
                    <div id="submitButtonContainer" >
                        <button id="submitButton" >UPDATE</button>
                    </div>
                </div>
            </form>
        </div>
    )
}