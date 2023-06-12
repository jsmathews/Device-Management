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
        <div className="tableRows" key={item.id}>
            <div className="tableDataContainer">
                {item.deviceName || 'N/A'}
            </div>
            <div className="tableDataContainer">
                {item.deviceType || 'N/A'}
            </div>
            <div className="tableDataContainer">
                {item.ownerName || 'N/A'}
            </div>
            <div className="tableDataContainer">
                <div className="batterIconContainer">
                    <div style={{ width: item.batteryStatus + '%' }}></div>
                </div>
                <div className="batteryPercentageContainer" style={{ height: '50%' }}>
                    <b>{item.batteryStatus + "%"}</b>
                </div>
            </div>
            <div className="tableDataContainer">
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
        <div className="tableContainer">
            <div id='headerContainer'>

                <div className='sortable-table-header selected' id='deviceName' onClick={(event) => { handleClickOnSort(event) }}>
                    <div className='sortIcon'>
                        {sorting.deviceName === 'ascending' ? (<i className="bi bi-sort-down"></i>) : <i className="bi bi-sort-up"></i>}
                    </div>
                    <div className="tableName">
                        Device Name
                    </div>
                </div>

                <div className='sortable-table-header' id='deviceType' onClick={(event) => { handleClickOnSort(event) }}>
                    <div className='sortIcon'>
                        {sorting.deviceType === 'ascending' ? (<i className="bi bi-sort-down"></i>) : <i className="bi bi-sort-up"></i>}
                    </div>
                    <div className="tableName">
                        Device Type
                    </div>
                </div>

                <div className='sortable-table-header' id='ownerName' onClick={(event) => { handleClickOnSort(event) }} >
                    <div className='sortIcon'>
                        {sorting.ownerName === 'ascending' ? (<i className="bi bi-sort-down"></i>) : <i className="bi bi-sort-up"></i>}
                    </div>
                    <div className="tableName">
                        Owner Name
                    </div>
                </div>

                <div className='sortable-table-header' id='batteryStatus' onClick={(event) => { handleClickOnSort(event) }} >
                    <div className='sortIcon'>
                        {sorting.batteryStatus === 'ascending' ? (<i className="bi bi-sort-numeric-down"></i>) : < i className="bi bi-sort-numeric-up"></i>}
                    </div>
                    <div className="tableName">
                        Battery Status
                    </div>
                </div>

                <div>
                    <div className="tableName">
                        Action
                    </div>
                </div>
            </div>

            <div id='dataContainer'>
                {content}
            </div>
        </div >
    );
}