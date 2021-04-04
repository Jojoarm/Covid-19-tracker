import axios from 'axios'

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
    //If there is a country the url will be changed so instead it gives data for a selected country
    let changeableUrl = url;

    if(country) {
        changeableUrl = `${url}/countries/${country}`
    }

    try {
        const { data: {confirmed, recovered, deaths, lastUpdate}}  = await axios.get(changeableUrl)   //Destructure the response data from the api
        return { confirmed, recovered, deaths, lastUpdate }
    } catch (error) {
        console.log(error)
    }
}

export const fetchDailyData = async () => {
    try {
        const {data} = await axios.get(`${url}/daily`)
        
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }))

        return modifiedData;
    }
    catch(error) {

    }
}

export const fetchCountries = async () => {
    try {
        // const response = await axios(`${url}/countries`);
        const { data:{ countries }} = await axios(`${url}/countries`);
        return countries.map((country) => country.name)
    }
    catch(error){
        console.log(error)
    }
}