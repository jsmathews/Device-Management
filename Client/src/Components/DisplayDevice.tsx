import React, { MouseEvent } from "react";
import { Delete } from "./DeleteDevice";
import { UpdateDevice } from "./UpdateDevice";

import '../Style/DisplayDevice.css'

type Device = {
    id: string;
    deviceName: string;
    deviceType: string;
    ownerName: string;
    batteryStatus: string;
}[]

interface DisplayDeviceProps {
    dataFromServer: Device,
    setDataFromServer: React.Dispatch<React.SetStateAction<
        {
            id: string;
            deviceName: string;
            deviceType: string;
            ownerName: string;
            batteryStatus: string;
        }[]
    >>,
    sorting: {
        tableToSort: 'deviceName' | 'deviceType' | 'ownerName' | 'batteryStatus',
        sortOrder: 'ascending' | 'descending',
        deviceName: 'ascending' | 'descending',
        deviceType: 'ascending' | 'descending',
        ownerName: 'ascending' | 'descending',
        batteryStatus: 'ascending' | 'descending'
    },
    setSorting: React.Dispatch<React.SetStateAction<
        {
            tableToSort: 'deviceName' | 'deviceType' | 'ownerName' | 'batteryStatus',
            sortOrder: 'ascending' | 'descending',
            deviceName: 'ascending' | 'descending',
            deviceType: 'ascending' | 'descending',
            ownerName: 'ascending' | 'descending',
            batteryStatus: 'ascending' | 'descending'
        }
    >>,
}

export function DisplayDevice({ dataFromServer, setDataFromServer, sorting, setSorting }: DisplayDeviceProps) {

    function sort(dataFromServer: Device, tableToSort: 'deviceName' | 'deviceType' | 'ownerName' | 'batteryStatus', sortOrder: 'ascending' | 'descending') {

        if (tableToSort === 'batteryStatus') {
            sortOrder === 'ascending'
                ? dataFromServer.sort((a, b) => parseInt(a[tableToSort], 10) - parseInt(b[tableToSort], 10))
                : dataFromServer.sort((a, b) => parseInt(b[tableToSort], 10) - parseInt(a[tableToSort], 10))
        }
        else {
            dataFromServer.sort((a, b) => {
                const nameA = a[tableToSort].toUpperCase();
                const nameB = b[tableToSort].toUpperCase();

                if (nameA < nameB) {
                    return sortOrder === 'ascending' ? -1 : 1;
                }
                if (nameA > nameB) {
                    return sortOrder === 'ascending' ? 1 : -1;
                }
                return 0;
            })
        }

    };
    sort(dataFromServer, sorting.tableToSort, sorting.sortOrder);

    const handleClickOnSort = (event: MouseEvent<HTMLDivElement>) => {
        let sortableHtmlElement = document.querySelectorAll('.sortable-table-header');
        type targetElementType = 'deviceName' | 'deviceType' | 'ownerName' | 'batteryStatus';
        let targetElementId: targetElementType;
        let sortOrder: 'ascending' | 'descending';

        sortableHtmlElement.forEach((element, idx) => {
            if (element.id === event.currentTarget.id) {
                element.classList.add('selected');
                targetElementId = element.id as targetElementType;

                sortOrder = sorting[targetElementId] === 'ascending' ? 'descending' : 'ascending';
                setSorting(prevData => ({ ...prevData, [targetElementId]: sortOrder, tableToSort: targetElementId, sortOrder: sortOrder }));
            }
            else {
                element.classList.remove('selected');
            }
        });
    };

    let content;
    content = dataFromServer.map((item) => (
        <div className="tableRows" key={item.id} >
            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', height: '50px', width: '20%' }}>
                {item.deviceName || 'N/A'}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '20%' }}>
                {item.deviceType || 'N/A'}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '20%' }}>
                {item.ownerName || 'N/A'}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '20%' }}>
                <div style={{ width: '60%', height: '50%', border: '1px solid black', borderRadius: '5px' }}>
                    <div style={{ background: 'rgb(0,128,0,0.68)', height: '98%', border: '1px solid white', borderRadius: '5px', width: item.batteryStatus + '%' }}></div>
                </div>
                <div style={{ height: '50%' }}>
                    <b>{item.batteryStatus + "%"}</b>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%' }}>
                <UpdateDevice
                    item={item}
                    setDataFromServer={setDataFromServer}
                />
                <Delete
                    item={item}
                    setDataFromServer={setDataFromServer}
                />
            </div>
        </div >
    ));

    return (
        <div className="tableContainer" style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '90%', boxShadow: '0 0 20px rgba(0,0,0,0.15)' }}>
            <div id='headerContainer'>

                <div className='sortable-table-header selected' id='deviceName' onClick={(event) => { handleClickOnSort(event) }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%', padding: '10px', boxSizing: 'content-box' }}>
                    <div className='sortIcon' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {sorting.deviceName === 'ascending' ? (<i className="bi bi-sort-down"></i>) : <i className="bi bi-sort-up"></i>}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        DEVICE NAME
                    </div>
                </div>

                <div className='sortable-table-header' id='deviceType' onClick={(event) => { handleClickOnSort(event) }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%' }}>
                    <div className='sortIcon' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {sorting.deviceType === 'ascending' ? (<i className="bi bi-sort-down"></i>) : <i className="bi bi-sort-up"></i>}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        DEVICE TYPE
                    </div>
                </div>

                <div className='sortable-table-header' id='ownerName' onClick={(event) => { handleClickOnSort(event) }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%' }}>
                    <div className='sortIcon' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {sorting.ownerName === 'ascending' ? (<i className="bi bi-sort-down"></i>) : <i className="bi bi-sort-up"></i>}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        OWNER NAME
                    </div>
                </div>

                <div className='sortable-table-header' id='batteryStatus' onClick={(event) => { handleClickOnSort(event) }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%' }}>
                    <div className='sortIcon' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {sorting.batteryStatus === 'ascending' ? (<i className="bi bi-sort-numeric-down"></i>) : < i className="bi bi-sort-numeric-up"></i>}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        BATTERY STATUS
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%', height: '100%' }}>
                        ACTION
                    </div>
                </div>

            </div>
            <div id='dataContainer' style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', overflow: 'hidden scroll' }}>
                {content}
            </div>
        </div >
    );
}