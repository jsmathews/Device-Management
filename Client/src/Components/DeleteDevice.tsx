
import React, { useState, useEffect, MouseEvent } from "react";
import axios from "axios";

interface DeleteDeviceProps {
    setIsDeleteButtonClicked: React.Dispatch<React.SetStateAction<{
        status: boolean,
        id: string
    }>>,
    isDeleteButtonClicked: {
        status: boolean,
        id: string
    },
    setDataFromServer: React.Dispatch<React.SetStateAction<{
        id: string,
        deviceName: string,
        deviceType: string,
        ownerName: string,
        batteryStatus: string
    }[]>>
}

export function DeleteDevice({ setIsDeleteButtonClicked, isDeleteButtonClicked, setDataFromServer }: DeleteDeviceProps) {
    const handeClickOnYes = async (event: MouseEvent) => {
        const fetchData = async () => {
            try {
                // setStatus("loading");
                const response = await axios.get('http://localhost:5000/readAll');
                setDataFromServer(response.data);
                // setStatus("success");
                // console.log('FETCH CALLED')
            } catch (error) {
                console.log(error);
                // setStatus("error");
            }
        };


        axios.post('http://localhost:5000/deleteDevice', isDeleteButtonClicked).then((res) => {
            fetchData();
            setIsDeleteButtonClicked((oldData) => ({ ...oldData, status: false }))
            console.log('res:', res.data)
        })
    }

    const handeClickOnNo = (event: MouseEvent) => {
        setIsDeleteButtonClicked((oldData) => ({ ...oldData, status: false, id: '' }))
    }

    return (
        <div style={{
            display: 'flex', flexDirection: 'column', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '40vh', height: '150px',
            backgroundColor: 'rgb(26,26,26)', borderRadius: '10px', padding: '10px', border: '1px solid #b6b6b6', justifyContent: 'space-evenly'
        }}>
            {/* <div style={{ width: '100%', height: '10%' }}>
                DELETE
            </div> */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '60%' }}>
                ARE YOU SURE YOU WANT TO DELETE
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', height: '30%' }}>
                <button onClick={handeClickOnNo}>CLOSE</button>
                <button onClick={handeClickOnYes}>DELETE</button>
            </div>
        </div>
    )
}

// import React, { useState, useEffect, MouseEvent } from "react";
// import axios from "axios";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

// interface DeleteDeviceProps {
//     setIsDeleteButtonClicked: React.Dispatch<React.SetStateAction<{
//         status: boolean,
//         id: string
//     }>>,
//     isDeleteButtonClicked: {
//         status: boolean,
//         id: string
//     }
// }

// // export function DeleteDevice({ setIsDeleteButtonClicked, isDeleteButtonClicked }: DeleteDeviceProps) {
// export function DeleteDevice({ selectedId }: { selectedId: string }) {
//     const [show, setShow] = useState(false);

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     const handleClickOnDelete = (event: MouseEvent) => {
//         axios.post('http://localhost:5000/deleteDevice', { id: selectedId }).then((res) => { handleClose(); console.log('res:', res.data) })
//     }

//     return (
//         <>
//             {/* <button onClick={handleShow}>delete</button> */}
//             <Button variant="primary" onClick={handleShow}>
//                 DELETE
//             </Button>

//             <Modal
//                 show={show}
//                 onHide={handleClose}
//                 backdrop="static"
//                 keyboard={false}
//             >
//                 <Modal.Header closeButton>
//                     <Modal.Title>Modal title</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     ARE YOU SURE YOU WANT TO DELETE ?
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Close
//                     </Button>
//                     <Button variant="primary" onClick={handleClickOnDelete}>DELETE</Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );

// }