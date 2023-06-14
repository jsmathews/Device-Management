import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { readAll, deleteDevice } from '../Communication/Communication';

import '../Style/DeleteDevice.css'

type DeleteProp = {
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

export function Delete({ item, setDataFromServer }: DeleteProp) {
    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchData = async () => {
        try {
            const response = await readAll();
            setDataFromServer(response);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (item: { id: string; deviceName: string; deviceType: string; ownerName: string; batteryStatus: string }) => {

        try {
            await deleteDevice(item);
            fetchData();
            handleClose()

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className='deleteButtonContainer' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%', height: '100%' }}>
                <i className="bi bi-trash" style={{ fontSize: '1.3rem', color: 'red' }} onClick={handleShow}></i>
            </div>

            <Modal style={{ color: 'black' }} show={show} onHide={handleClose}>
                <Modal.Header closeButton className="titleHeader">
                    <Modal.Title>Delete device</Modal.Title>
                </Modal.Header>
                <Modal.Body>Plese click <b>Delete</b> button to confirm action</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button id="deleteDeviceButton" variant="primary" onClick={() => { handleSubmit(item) }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}