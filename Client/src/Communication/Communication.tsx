import axios from "axios";

var hostIp = '192.168.178.22';
// var hostIp = '3.125.42.40'; // AWS EC2 pubic ip
var port = '5000' // port of API server

var baseUrl = `http://${hostIp}:${port}/`

type readAllReturnType = {
    id: string;
    deviceName: string;
    deviceType: string;
    ownerName: string;
    batteryStatus: string;
}[]
export function readAll(): Promise<readAllReturnType> {
    return new Promise(async (resolve, reject) => {
        axios.get(`${baseUrl}readAll`).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}

type createProp = {
    deviceName: string;
    deviceType: string;
    ownerName: string;
    batteryStatus: string;
}
export function createDevice(deviceProp: createProp): Promise<createProp> {
    return new Promise(async (resolve, reject) => {
        axios.post(`${baseUrl}createDevice`, deviceProp).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}

type deleteProp = {
    id: string;
    deviceName: string;
    deviceType: string;
    ownerName: string;
    batteryStatus: string;
}
export function deleteDevice(item: deleteProp) {
    return new Promise(async (resolve, reject) => {
        axios.post(`${baseUrl}deleteDevice`, item).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}

type updateProp = {
    id: string;
    deviceName: string;
    deviceType: string;
    ownerName: string;
    batteryStatus: string;
}
export function updateDevice(deviceProp: updateProp): Promise<updateProp> {
    return new Promise(async (resolve, reject) => {
        axios.post(`${baseUrl}updateDevice`, deviceProp).then((response) => {
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })
    })
}