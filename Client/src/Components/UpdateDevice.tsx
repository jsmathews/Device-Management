import React from 'react'

type UpdateDeviceProps = {
    deviceName: string;
    deviceType: string;
    ownerName: string;
    batteryStatus: string;
}

export function UpdateDevice(props: UpdateDeviceProps) {
    return (
        <div>
            {props.deviceName}
            {props.deviceType}
            {props.ownerName}
            {props.batteryStatus}
        </div>
    )
}