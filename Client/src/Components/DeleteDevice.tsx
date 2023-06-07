import React, { useState, useEffect, MouseEvent } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface DeleteDeviceProps {
    setIsDeleteButtonClicked: React.Dispatch<React.SetStateAction<{
        status: boolean,
        id: string
    }>>,
    isDeleteButtonClicked: {
        status: boolean,
        id: string
    }
}

// export function DeleteDevice({ setIsDeleteButtonClicked, isDeleteButtonClicked }: DeleteDeviceProps) {
export function DeleteDevice({ selectedId }: { selectedId: string }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClickOnDelete = (event: MouseEvent) => {
        axios.post('http://localhost:5000/deleteDevice', { id: selectedId }).then((res) => { handleClose(); console.log('res:', res.data) })
    }

    return (
        <>
            <button onClick={handleShow}>delete</button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ARE YOU SURE YOU WANT TO DELETE ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClickOnDelete}>DELETE</Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}