import React, { MouseEvent, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
            const response = await axios.get('http://localhost:5000/readAll');
            // const response = await axios.get('http://18.184.49.238:5000/readAll');
            setDataFromServer(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const handeClickOnYes = async (item: {
        id: string;
        deviceName: string;
        deviceType: string;
        ownerName: string;
        batteryStatus: string
    }) => {
        axios.post('http://localhost:5000/deleteDevice', item).then((res) => {
            // axios.post('http://18.184.49.238:5000/deleteDevice', valueOfDelete).then((res) => {
            fetchData();
        })
    }


    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%', height: '100%' }}>
                <i className="bi bi-trash" style={{ fontSize: '1.3rem', color: 'red' }} onClick={handleShow}></i>
            </div>

            <Modal style={{ color: 'black' }} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete device</Modal.Title>
                </Modal.Header>
                <Modal.Body>Plese click <b>Delete</b> button to confirm action</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary" onClick={handeClickOnYes}> */}
                    <Button variant="primary" onClick={() => { handeClickOnYes(item) }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}