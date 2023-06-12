import React, { MouseEvent } from "react";
import { Delete } from "./Delete";
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

        if (tableToSort == 'batteryStatus') {
            sortOrder == 'ascending'
                ? dataFromServer.sort((a, b) => parseInt(a[tableToSort], 10) - parseInt(b[tableToSort], 10))
                : dataFromServer.sort((a, b) => parseInt(b[tableToSort], 10) - parseInt(a[tableToSort], 10))
        }
        else {
            dataFromServer.sort((a, b) => {
                const nameA = a[tableToSort].toUpperCase();
                const nameB = b[tableToSort].toUpperCase();

                if (nameA < nameB) {
                    return sortOrder == 'ascending' ? -1 : 1;
                }
                if (nameA > nameB) {
                    return sortOrder == 'ascending' ? 1 : -1;
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
            if (element.id == event.currentTarget.id) {
                element.classList.add('selected');
                targetElementId = element.id as targetElementType;

                sortOrder = sorting[targetElementId] == 'ascending' ? 'descending' : 'ascending';
                setSorting(prevData => ({ ...prevData, [targetElementId]: sortOrder, tableToSort: targetElementId, sortOrder: sortOrder }));
            }
            else {
                element.classList.remove('selected');
            }
        });
    };

    let content;
    content = dataFromServer.map((item) => (
        <div key={item.id} style={{ display: 'flex', flexDirection: 'row' }}>
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
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
            <div id='headerContainer' style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '10%', fontFamily: 'Roboto-Medium' }}>


                <div className='sortable-table-header selected' id='deviceName' onClick={(event) => { handleClickOnSort(event) }} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '20%', position: 'relative' }}>
                    <div className='sortIcon' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%' }}>
                        {sorting.deviceName == 'ascending' ? (<i className="bi bi-sort-down"></i>) : <i className="bi bi-sort-up"></i>}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%', height: '100%' }}>
                        DEVICE NAME
                    </div>
                </div>

                <div className='sortable-table-header' id='deviceType' onClick={(event) => { handleClickOnSort(event) }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%' }}>
                    <div className='sortIcon' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%' }}>
                        {sorting.deviceType == 'ascending' ? (<i className="bi bi-sort-down"></i>) : <i className="bi bi-sort-up"></i>}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%', height: '100%' }}>
                        DEVICE TYPE
                    </div>
                </div>

                <div className='sortable-table-header' id='ownerName' onClick={(event) => { handleClickOnSort(event) }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%' }}>
                    <div className='sortIcon' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%' }}>
                        {sorting.ownerName == 'ascending' ? (<i className="bi bi-sort-down"></i>) : <i className="bi bi-sort-up"></i>}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%', height: '100%' }}>
                        OWNER NAME
                    </div>
                </div>

                <div className='sortable-table-header' id='batteryStatus' onClick={(event) => { handleClickOnSort(event) }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%' }}>
                    <div className='sortIcon' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%' }}>
                        {sorting.batteryStatus == 'ascending' ? (<i className="bi bi-sort-numeric-down"></i>) : < i className="bi bi-sort-numeric-up"></i>}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%', height: '100%' }}>
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
        </div>
    );
}