import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarGraph({ data }) {
  const chartData = {
    labels: data.map(d => d.item),
    datasets: [
      {
        label: 'Calories per 100g',
        data: data.map(d => d.calories),
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',   // Blue
          'rgba(255, 99, 132, 0.6)',   // Pink
          'rgba(75, 192, 192, 0.6)',   // Teal
          'rgba(255, 205, 86, 0.6)',   // Yellow
          'rgba(153, 102, 255, 0.6)',  // Purple
          'rgba(255, 159, 64, 0.6)',   // Orange
          'rgba(0, 128, 0, 0.6)',      // Green
          'rgba(128, 0, 128, 0.6)',    // Magenta
          'rgba(0, 191, 255, 0.6)',    // Sky Blue
          'rgba(220, 20, 60, 0.6)',    // Crimson
        ].slice(0, data.length),
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(0, 128, 0, 1)',
          'rgba(128, 0, 128, 1)',
          'rgba(0, 191, 255, 1)',
          'rgba(220, 20, 60, 1)',
        ].slice(0, data.length),
        borderWidth: 2,
        barThickness: 40,
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#333',
        },
      },
      title: {
        display: true,
        text: 'Calories per 100g of Food Items',
        font: {
          size: 18,
          weight: 'bold',
        },
        color: '#333',
        padding: 20,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        cornerRadius: 4,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Calories (kcal)',
          font: { size: 14 },
          color: '#666',
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.3)',
        },
        ticks: {
          color: '#666',
          font: { size: 12 },
        },
      },
      x: {
        title: {
          display: true,
          text: 'Food Items',
          font: { size: 14 },
          color: '#666',
        },
        grid: {
          display: false,
        },
        ticks: {
          color: '#666',
          font: { size: 12 },
        },
      },
    },
  };

  return (
    <div style={{ height: '400px', width: '600px', margin: '0 auto' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default BarGraph;