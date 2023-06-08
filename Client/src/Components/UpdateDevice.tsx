import React, { useState, ChangeEvent, MouseEvent, FormEvent, useEffect } from 'react'
import axios from "axios";
import './CSS/CreateDevice.css'
import CloseButton from 'react-bootstrap/CloseButton'

type UpdateDeviceProps = {
    valueOfUpdate: {
        isButtonClicked: boolean;
        data: {
            id: string;
            deviceName: string;
            deviceType: string;
            ownerName: string;
            batteryStatus: string;
        }
    },
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
    setDataFromServer: React.Dispatch<React.SetStateAction<
        {
            id: string;
            deviceName: string;
            deviceType: string;
            ownerName: string;
            batteryStatus: string;
        }[]
    >>
}
export function UpdateDevice({ valueOfUpdate, setValueOfUpdate, setDataFromServer }: UpdateDeviceProps) {
    const [deviceProp, setDeviceProp] = useState({ id: '', deviceName: '', deviceType: '', ownerName: '', batteryStatus: '' });

    useEffect(() => {
        console.log('mount')
        setDeviceProp(valueOfUpdate.data);
    }, [])

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setDeviceProp({ ...deviceProp, [name]: value });
    };

    const handleActionOnClose = () => {
        setValueOfUpdate((oldData) => ({ ...oldData, isButtonClicked: false }))
    }

    const handleMouseDown = (event: MouseEvent) => {
        event.stopPropagation();
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const fetchData = async () => {
            try {
                // setStatus("loading");
                const response = await axios.get('http://localhost:5000/readAll');
                setDataFromServer(response.data);
                // setStatus("success");
            } catch (error) {
                console.log(error);
                // setStatus("error");
            }
        };
        axios.post('http://localhost:5000/updateDevice', deviceProp).then((res) => {
            fetchData()
            setValueOfUpdate((oldData) => ({ ...oldData, isButtonClicked: false }))
            console.log('res:', res.data)
        })
    };


    return (
        <div id="createFormContainer" onClick={handleMouseDown}
        >
            <form onSubmit={handleSubmit} >

                <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <CloseButton id="closeButton" variant="white" onClick={handleActionOnClose} />
                </div>

                <div id="labelAndInputFieldContainer">
                    <div id="labelContainer">
                        <label id="label">DEVICE NAME</label>
                    </div>
                    <div id="inputFieldContainer" >
                        <input id="inputField"
                            type="text"
                            name="deviceName"
                            value={deviceProp.deviceName}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div id="labelAndInputFieldContainer">
                    <div id="labelContainer">
                        <label id="label">DEVICE TYPE</label>
                    </div>
                    <div id="inputFieldContainer" >
                        <select id="selectField" name="deviceType" onChange={handleChange} value={deviceProp.deviceType}>
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
                            value={deviceProp.ownerName}
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
                            value={deviceProp.batteryStatus}
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