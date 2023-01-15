import React, { useState ,useEffect} from 'react';
import { FormControl, Paper, TextField, Button } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import './fxrates.style.css' ;

import { getRateData,getCurrencyAbbrev } from '../services';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } 
  from 'chart.js';
import moment from 'moment/moment';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const FxRates = () => {
    const [baseRate, setBaseRate] = useState('');
    const [quoteRate, setQuoteRate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [rates, setRates] = useState(null);
    const [dates, setDates] = useState(null);
    const [abbrevs, setAbbrevs] = useState([]);



// Preparing response values for the line graph
    const prepRateValue = () =>{
        let xRate = [];
        let yDate = [];
        console.log("#####*********&&&&&&");
        let start_date = moment(startDate).format('YYYY-MM-DD');
        let end_date = moment(endDate).format('YYYY-MM-DD');
        getRateData(start_date,end_date,baseRate,quoteRate).then((response)=>{
            console.log(response.data);
            let res = response.data;
            for (let dateValues in res.rates) {
                yDate.push(dateValues);
                let ratePrep = res.rates[dateValues];
                xRate.push(ratePrep[quoteRate])
            }
        setRates(xRate);
        setDates(yDate);
        
        }).catch((error)=>{
            console.log(error);
        })
    }
// getting currency abbreviations

const prepCurrencyAbbrev = () =>{
    let sortedAbbrev =[];
    getCurrencyAbbrev().then((response)=>{
        
        console.log(response.data);
        let res = response.data;
        for (let abbrevValues in res.symbols) {
            sortedAbbrev.push(abbrevValues);
            
        }
    setAbbrevs(sortedAbbrev);
    
    }).catch((error)=>{
        console.log(error);
    })
}
useEffect(() => {
    prepCurrencyAbbrev();
}, []);
    return (<div>
        <Paper className='paper'>
        <div >

        <h1> Forex  Value Visualization</h1>

            <h3>From Currency</h3>
            <div>
                {/* <input  type ="text" /> */}
                <select onChange={(e)=>{
                    setBaseRate(e.target.value)
                }}
                value ={baseRate}>
                {abbrevs.map((value,index)=> {
                    return(
                        <option value= {value}>{value}</option>
                    )
                })}
                </select>
            </div>

            <h3>To Currency</h3>
            <div>
            <select onChange={(e)=>{
                    setQuoteRate(e.target.value)
                }}
                value ={quoteRate}>
                {abbrevs.map((value,index)=> {
                    return(
                        <option value= {value}>{value}</option>
                    )
                })}
                </select>
            

            </div>

            <h3> From Date</h3>
            <input onChange={(e)=>{
                    setStartDate(e.target.value)
                }}
                value ={startDate} 
                variant='outlined'
                id="fromdate"
                type="date"
                inputlabelprops={{
                shrink: true,
                }} />
               

            <h3> To Date</h3>

            <input onChange={(e)=>{
                    setEndDate(e.target.value)
                }}
                value ={endDate} 
                variant='outlined'
                id="fromdate"
                type="date"
                inputlabelprops={{
                shrink: true,
                }} />

            <button variant="contained" className='button' color="primary" onClick={() => prepRateValue()}>Generate Graph</button>
            </div>
            
            <Line
               data = {{
                labels: dates,
                datasets: [{
                  label: 'My First Dataset',
                  data: rates,
                  fill: false,
                  borderColor: 'rgb(75, 192, 192)',
                }]
              }} />
        </Paper>
        
        
    </div>)
}
export default FxRates;