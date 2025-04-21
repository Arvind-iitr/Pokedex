import React, { useState } from "react";
import { Radar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export const RadarChart = (props) => {
   const pokeData= props.data;
//    const[statsLabels , setStatsLabels] = useState([])
 
 const statsData =  pokeData.stats.map((cur) =>{
      return cur.base_stat;
   })

const statsLabels =  pokeData.stats.map((cur) =>{
     const lable = cur.stat.name;
     return lable;
    //  setStatsLabels((prev) => [...prev , lable])
 })

   

//  console.log(statsData)  ;
//  console.log(statsLabels);
//  consoel.log(statsLabels);
    const data = {
        labels: statsLabels,
        datasets: [
          {
            label: pokeData.name,
            data: statsData,
            backgroundColor: "rgba(10, 70, 103, 0.33)",
            borderColor: "rgb(99, 247, 255)",
            borderWidth: 1.5,
            pointBackgroundColor: "rgb(99, 245, 255)", // Point color
            pointBorderColor: "#fff", // Point border color
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(99, 255, 255)",
          },
          
        ],
      };
    
      // Options for the Radar Chart
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
            position: "top",
          },
          tooltip: {
            enabled: true,
          },
        },
        scales: {
            r: {
              min: 0, // Set minimum value
              max: 100, // Set maximum value
              pointLabels: {
                color: "#fff", // Labels for axes
              },
              ticks: {
                color: "#fff", // Tick text color
                backdropColor: "rgba(0, 0, 0, 0)", // Transparent backdrop
                stepSize: 10, // Control the interval between tick marks
                showLabelBackdrop: false, // Optional: Remove the backdrop behind the tick labels
              },
              angleLines: {
                color: "rgba(124, 246, 238, 0.64)", // Angle lines color
              },
              grid: {
                color: "rgba(124, 246, 238, 0.64)", // Optional: Customize grid line color
              },
            },
          },
        
      
      };


  return (
    <>
    
      <div className="radar-chart">
      <Radar data={data} options={options} />
    </div> 



      
    </>
  )
}

