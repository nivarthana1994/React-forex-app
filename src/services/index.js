import axios from "axios";
//calling API to send input and get exchange rates
const getRateData = async (start_date,end_date,base,symbols) => {
    return await axios({
        method: `get`,
        url: `https://api.apilayer.com/fixer/timeseries?start_date=${start_date}&end_date=${end_date}&base=${base}&symbols=${symbols}`,
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'apikey':'iYxGt7JcpYJ9xG4DNNcaJdOf8XsXN7uq'
        }

    })
}
//calling API to get currency abbreviations
const getCurrencyAbbrev = async () => {
    return await axios({
        method: `get`,
        url: `https://api.apilayer.com/fixer/symbols`,
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'apikey':'iYxGt7JcpYJ9xG4DNNcaJdOf8XsXN7uq'
        }

    })
}

export {getRateData, getCurrencyAbbrev};
