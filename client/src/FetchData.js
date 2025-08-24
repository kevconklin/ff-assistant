import { useEffect } from "react";
import axios from "axios";
import { useDataContext } from "./DataContext";
import { GET_DATA_ENDPOINT } from "./apiEndpoints" 

const FetchData = () => {
    const { setData } = useDataContext();
    console.log("hello")
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("here again....")
                const response = await axios.get(GET_DATA_ENDPOINT);
                setData(response.data); // Save the data in the global context
                console.log("Data fetched successfully:", response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [setData]);

    return null; // This component only performs data fetching
};

export default FetchData;
