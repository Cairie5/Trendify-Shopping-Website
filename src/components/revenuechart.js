import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register components
ChartJS.register(
  LinearScale,
  CategoryScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

function RevenueChart() {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 3000, 5000, 20000],
        borderColor: '#ef476f',
        backgroundColor: 'rgba(239, 71, 111, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  };

  // Cleanup if needed (optional)
  useEffect(() => {
    return () => {
      // Clean up logic if you need to destroy charts or similar
    };
  }, []);

  return <Line data={data} options={options} />;
}

export default RevenueChart;