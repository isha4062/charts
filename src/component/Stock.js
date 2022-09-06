import React, { useCallback, useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

export const Stock = () => {
    const [xValue, setXValue] = useState([]);
    const [xValue2, setXValue2] = useState([]);
    const [yValue, setYValue] = useState([]);
    const [yValue2, setYValue2] = useState([]);
    const fetchStock = useCallback(() => {
        const pointerToThis = this;
        console.log(pointerToThis);
        const API_KEY = 'ZHJL6YB2VNALN2PB';
        let StockSymbol = 'IBM';
        let StockSymbol2 = 'RELIANCE.BSE';
        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&apikey=${API_KEY}`;
        let API_Call2 = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol2}&apikey=${API_KEY}`;
        let stockChartXValuesFunction = [];
        let stockChartXValuesFunction2 = [];
        let stockChartYValuesFunction = [];
        let stockChartYValuesFunction2 = [];

        fetch(API_Call)
            .then(
                function (response) {
                    return response.json();
                }
            )
            .then(
                function (data) {

                    for (var key in data['Time Series (Daily)']) {
                        stockChartXValuesFunction.push(key);
                        stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
                    }

                    setXValue(stockChartXValuesFunction);
                    setYValue(stockChartYValuesFunction);
                }
            )
        fetch(API_Call2)
            .then(
                function (response) {
                    return response.json();
                }
            )
            .then(
                function (data) {

                    for (var key in data['Time Series (Daily)']) {
                        stockChartXValuesFunction2.push(key);
                        stockChartYValuesFunction2.push(data['Time Series (Daily)'][key]['1. open']);
                    }
                    setXValue2(stockChartXValuesFunction2)
                    setYValue2(stockChartYValuesFunction2);
                }
            )
    }, [setXValue, setYValue]);
    useEffect(() => {
        fetchStock();
    }, [fetchStock]);

    return (
        <div>
            <h1 style={{'textAlign': 'center'}}>Stock Market</h1>
            <div style={{'display': 'flex' , 'flexDirection': 'row', 'marginTop': '40px'}}>
            <Plot
                data={[
                    {
                        x: xValue,
                        y: yValue,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'red' },
                    }
                ]}
                layout={{ width: 620, height: 440, title: 'IBM' }}
            />
            <Plot
                data={[
                    {
                        x: xValue2,
                        y: yValue2,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'red' },
                    }
                ]}
                layout={{ width: 620, height: 440, title: 'RELIANCE.BSE' }}
            />
            </div>
        </div>
    )
}
