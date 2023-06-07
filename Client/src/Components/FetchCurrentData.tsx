import axios from "axios";

type FetchCurrentDataProp = {
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

export const FetchCurrentData = async ({ setDataFromServer }: FetchCurrentDataProp) => {
    try {
        // setStatus("loading");
        const response = await axios.get('http://localhost:5000/readAll');
        setDataFromServer(response.data);
        // setStatus("success");
        // console.log('FETCH CALLED')
        console.log('called')
    } catch (error) {
        console.log(error);
        // setStatus("error");
    }
};