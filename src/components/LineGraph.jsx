import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Necessary for Chart.js v3+

const LineGraph = ({ data }) => {
  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [
      {
        label: 'Profit',
        data: data,
        fill: true,
        backgroundColor: 'rgba(22, 91, 170, 0.3)', // Light blue area under the line
        borderColor: '#BCE8B1', // Line color
        pointBackgroundColor: '#fff',
        pointBorderColor: '#BCE8B1',
        pointHoverBackgroundColor: '#BCE8B1',
        pointHoverBorderColor: '#fff',
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: $${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value;
          }
        }
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

export default LineGraph;
