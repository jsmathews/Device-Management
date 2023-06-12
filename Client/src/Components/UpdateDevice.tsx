import React, { useState, ChangeEvent, KeyboardEvent } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { readAll, updateDevice } from '../Communication/Communication';

type UpdateDeviceProp = {
    item: {
        id: string;
        deviceName: string;
        deviceType: string;
        ownerName: string;
        batteryStatus: string;
    },
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

export function UpdateDevice({ item, setDataFromServer }: UpdateDeviceProp) {
    const [show, setShow] = useState(false);
    const [deviceProp, setDeviceProp] = useState({
        id: '',
        deviceName: '',
        deviceType: '',
        ownerName: '',
        batteryStatus: '50',
    });

    const [error, setError] = useState<errorProp>({
        deviceName: null,
        deviceType: null,
        ownerName: null
    });

    const handleClose = () => {
        setShow(false)
    };

    const handleShow = () => {
        setError({
            deviceName: null,
            deviceType: null,
            ownerName: null
        });

        setDeviceProp(item);
        setShow(true)
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setDeviceProp({ ...deviceProp, [name]: value });
        setError({ ...error, [name]: null });
    };

    const fetchData = async () => {
        try {
            const response = await readAll();
            setDataFromServer(response);
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

    const handleSubmit = async () => {
        validateForm();
        if (!deviceProp.deviceName || !deviceProp.deviceType || !deviceProp.ownerName) {
            return
        }

        try {
            const response = await updateDevice(deviceProp);
            fetchData();
            handleClose()

        } catch (error) {
            console.error(error);
        }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%', height: '100%' }}>
                <i className="bi bi-pencil-square" style={{ fontSize: '1.3rem', color: 'green' }} onClick={handleShow}></i>
            </div>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Device</Modal.Title>
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
                                value={deviceProp.deviceName}
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
                                value={deviceProp.deviceType}
                                isInvalid={!!error.deviceType}
                            >
                                <option value="">select an option</option>
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
                                value={deviceProp.ownerName}
                                isInvalid={!!error.ownerName}
                            />
                            <Form.Control.Feedback type="invalid">{error.ownerName}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Battery Status</Form.Label>
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
                                    <Form.Text><b>{deviceProp.batteryStatus + '%'}</b></Form.Text >
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
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}