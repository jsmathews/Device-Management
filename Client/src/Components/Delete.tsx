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

    const handeClickOnYes = async (item: {
        id: string;
        deviceName: string;
        deviceType: string;
        ownerName: string;
        batteryStatus: string
    }) => {

        console.log(item)

        const fetchData = async () => {
            try {
                // setStatus("loading");
                const response = await axios.get('http://localhost:5000/readAll');
                // const response = await axios.get('http://18.184.49.238:5000/readAll');
                setDataFromServer(response.data);

            } catch (error) {
                console.log(error);
            }
        };

        axios.post('http://localhost:5000/deleteDevice', item).then((res) => {
            // axios.post('http://18.184.49.238:5000/deleteDevice', valueOfDelete).then((res) => {
            fetchData();
            // setValueOfDelete((oldData) => ({ ...oldData, isButtonClicked: false }))
        })
    }


    return (
        <>
            <i className="bi bi-trash" style={{ fontSize: '1.3rem', color: 'red' }} onClick={handleShow}></i>

            <Modal style={{ color: 'black' }} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>DELETE DEVICE</Modal.Title>
                </Modal.Header>
                <Modal.Body>PRESS CONFIRM TO DELETE</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary" onClick={handeClickOnYes}> */}
                    <Button variant="primary" onClick={() => { handeClickOnYes(item) }}>
                        CONFIRM
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}