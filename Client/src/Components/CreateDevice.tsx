import React, { useState, ChangeEvent, FormEvent, MouseEvent } from "react";
import axios from "axios";
import './CSS/CreateDevice.css'
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

type CreateDeviceProp = {
    setDataFromServer: React.Dispatch<React.SetStateAction<
        {
            id: string;
            deviceName: string;
            deviceType: string;
            ownerName: string;
            batteryStatus: string;
        }[]
    >>,
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function CreateDevice({ setDataFromServer, setIsFormOpen }: CreateDeviceProp) {
    const [loadingStatus, setLoadingStatus] = useState<"loading" | "success" | "error">("loading");
    const [deviceProp, setDeviceProp] = useState({
        deviceName: '',
        deviceType: '',
        ownerName: '',
        batteryStatus: '',
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setDeviceProp({ ...deviceProp, [name]: value });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/readAll');
                // const response = await axios.get('http://18.184.49.238:5000/readAll');
                setDataFromServer(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        setLoadingStatus("loading")
        axios.post('http://localhost:5000/createDevice', deviceProp).then((res) => {
            // axios.post('http://18.184.49.238:5000/createDevice', deviceProp).then((res) => {
            fetchData();
            setIsFormOpen(false);
            setLoadingStatus("success")
        }).catch(error => {
            setLoadingStatus("error")
        });
    };

    const handleActionOnClose = () => {
        setIsFormOpen(false)
    }

    const handleMouseDown = (event: MouseEvent) => {
        event.stopPropagation();
    };

    // if (loadingStatus == 'loading') {
    //     console.log('loading')
    // }
    // else if (loadingStatus == 'success') {
    //     console.log('success')
    // }
    // else if (loadingStatus == 'error') {
    //     console.log('error')
    // }

    return (
        <div id="createFormContainer" onClick={handleMouseDown}>
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
                            maxLength={50}
                            required
                        />
                    </div>
                </div>

                <div id="labelAndInputFieldContainer">
                    <div id="labelContainer">
                        <label id="label">DEVICE TYPE</label>
                    </div>
                    <div id="inputFieldContainer" >
                        <select id="selectField" name="deviceType" onChange={handleChange} required>
                            <option value="" style={{ height: '30px' }}>select an option</option>
                            <option value="Smartphone" style={{ height: '30px' }}>Smartphone</option>
                            <option value="Tablet" style={{ height: '30px' }}>Tablet</option>
                            <option value="Camera" style={{ height: '30px' }}>Camera</option>
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
                            maxLength={50}
                            required
                        />
                    </div>
                </div>

                <div id="labelAndInputFieldContainer">
                    <div id="labelContainer">
                        <label id="label">BATTERY STATUS</label>
                    </div>
                    <div id="inputFieldContainer" >
                        <input id="inputField"
                            type="number"
                            name="batteryStatus"
                            value={deviceProp.batteryStatus}
                            onChange={handleChange}
                            max={100}
                            required
                        />
                    </div>
                </div>

                <div id="labelAndInputFieldContainer">
                    <div id="submitButtonContainer" >
                        <button id="submitButton" >CREATE</button>

                        {/* <Button variant="primary" disabled>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Loading...
                        </Button> */}
                    </div>
                </div>
            </form >
        </div >
    );
}

export { CreateDevice }