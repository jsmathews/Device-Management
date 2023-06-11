import React, { useState, ChangeEvent, FormEvent, MouseEvent, KeyboardEvent } from "react";
import axios from "axios"
import './CSS/CreateDevice.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

type CreateDeviceProp = {
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

type errorProp = {
    deviceName: 'Please enter device name' | null,
    deviceType: 'Please enter device type' | null,
    ownerName: 'Please enter owner name' | null,
}

function CreateDevice({ setDataFromServer }: CreateDeviceProp) {
    const [show, setShow] = useState(false);
    const [deviceProp, setDeviceProp] = useState({
        deviceName: '',
        deviceType: '',
        ownerName: '',
        batteryStatus: '50',
    });

    const [error, setError] = useState<errorProp>({
        deviceName: null,
        deviceType: null,
        ownerName: null
    })

    const handleClose = () => {
        setShow(false)
    };

    const handleShow = () => {
        setError({
            deviceName: null,
            deviceType: null,
            ownerName: null
        });

        setDeviceProp({
            deviceName: '',
            deviceType: '',
            ownerName: '',
            batteryStatus: '50'
        })
        setShow(true)
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        setDeviceProp({ ...deviceProp, [name]: value });
        setError({ ...error, [name]: null });
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/readAll');
            // const response = await axios.get('http://18.184.49.238:5000/readAll');
            setDataFromServer(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const validateForm = () => {
        const { deviceName, deviceType, ownerName } = deviceProp;
        if (!deviceName) {
            setError((prevData) => ({ ...prevData, deviceName: "Please enter device name" }));
        }
        if (!deviceType) {
            setError((prevData) => ({ ...prevData, deviceType: "Please enter device type" }));
        }
        if (!ownerName) {
            setError((prevData) => ({ ...prevData, ownerName: "Please enter owner name" }));
        }
    }

    const handleSubmit = () => {
        // event.preventDefault();
        validateForm();

        if (!deviceProp.deviceName || !deviceProp.deviceType || !deviceProp.ownerName) {
            return
        }

        axios.post('http://localhost:5000/createDevice', deviceProp).then((res) => {
            // axios.post('http://18.184.49.238:5000/createDevice', deviceProp).then((res) => {
            fetchData();
            handleClose()

        }).catch(error => {
            console.log(error);
        });
    };

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                ADD NEW DEVICE
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Device</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Device Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="deviceName"
                                onChange={handleChange as (event: ChangeEvent<HTMLInputElement>) => void}
                                onKeyDown={handleKeyPress}
                                isInvalid={!!error.deviceName}
                            />
                            <Form.Control.Feedback type="invalid">{error.deviceName}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Device Type</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                name="deviceType"
                                onChange={handleChange as (event: ChangeEvent<HTMLSelectElement>) => void}
                                onKeyDown={handleKeyPress}
                                isInvalid={!!error.deviceType}
                            >
                                <option>select an option</option>
                                <option value="Smartphone">Smartphone</option>
                                <option value="Tablet">Tablet</option>
                                <option value="Camera">Camera</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">{error.deviceType}</Form.Control.Feedback>
                        </Form.Group>



                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Owner Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="ownerName"
                                onChange={handleChange as (event: ChangeEvent<HTMLInputElement>) => void}
                                onKeyDown={handleKeyPress}
                                isInvalid={!!error.ownerName}
                            />
                            <Form.Control.Feedback type="invalid">{error.ownerName}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Battery Status</Form.Label>
                            {/* <Form.Control type="number" max={100} /> */}
                            <div style={{ display: 'flex', width: '100%', height: '100%' }}>
                                <div style={{ display: 'flex', alignItems: 'center', width: '85%' }}>
                                    <Form.Range
                                        min={0} max={100} step={1}
                                        value={deviceProp.batteryStatus}
                                        name="batteryStatus"
                                        onChange={handleChange as (event: ChangeEvent<HTMLInputElement>) => void}
                                        onKeyDown={handleKeyPress}
                                        required />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', width: '15%' }}>
                                    <Form.Text><b>{deviceProp.batteryStatus}</b></Form.Text >
                                </div>
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export { CreateDevice }