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
    }
}

export function DeleteDevice({ setIsDeleteButtonClicked, isDeleteButtonClicked }: DeleteDeviceProps) {
    const handeClickOnYes = (event: MouseEvent) => {
        // console.log(isDeleteButtonClicked)
        axios.post('http://localhost:5000/deleteDevice', isDeleteButtonClicked).then((res) => { console.log('res:', res.data) })
    }

    const handeClickOnNo = (event: MouseEvent) => {
        setIsDeleteButtonClicked((oldData) => ({ ...oldData, status: false, id: '' }))
    }

    return (
        <div>
            <button onClick={handeClickOnYes}>YES</button>
            <button onClick={handeClickOnNo}>NO</button>
        </div>
    )
}