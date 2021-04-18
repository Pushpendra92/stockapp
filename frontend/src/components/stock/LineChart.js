import React from "react";
import { Line } from "react-chartjs-2";
import './Linechart.css'

const LineChart = ({data}) => {
  const color = (i) => {
    if(i==0){
      return ['rgba(255, 150, 86, 0.4)']
    }
    if(i==1){
      return ['rgba(255, 56, 136, 0.4)']
    }
    if(i==2){
      return ['rgba(205, 50, 86, 0.8)']
    }
    if(i==3){
      return ['rgba(255, 186, 136, 0.8)']
    }
    if(i==4){
      return ['rgba(55, 186, 136, 0.8)']
    }
    if(i==5){
      return ['rgba(155, 86, 136, 0.8)']
    }
    if(i==6){
      return ['rgba(255, 86, 136, 0.8)']
    }
  }

  const graphData = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: data.map((item, index)=> {
      return {
        label: item.stock_name,
        data: item.stock_price_info.last_values,
        borderColor: color(index),
        pointBackgroundColor: color(index),
        pointBorderColor: color(index)
      }
    })}

   return <div className="chart">
   <Line data={graphData}></Line>
   </div>
  }

export default LineChart;
