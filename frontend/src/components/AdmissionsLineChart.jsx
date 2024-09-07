import { useEffect, useRef } from "react";

const AdmissionsLineChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    // Mock data
    const data = [2, 1, 3, 4, 2, 2, 1];
    const maxValue = Math.max(...data);

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
          {
            label: "Number of Admissions",
            data: data,
            borderColor: "#36A2EB", // Blue color for the line
            backgroundColor: "rgba(54, 162, 235, 0.2)", // Light blue for the area under the line
            fill: true,
            tension: 0.1, // Smooth line
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: "#36A2EB",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          title: {
            display: true,
            text: "Patient Admissions Over the Last 7 Days",
            font: {
              size: 14,
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            title: {
              display: true,
              text: "Days of the Week",
              color: "#333",
            },
            ticks: {
              color: "#333",
            },
          },
          y: {
            grid: {
              color: "#e0e0e0",
            },
            title: {
              display: true,
              text: "Number of Admissions",
              color: "#333",
            },
            ticks: {
              color: "#333",
              beginAtZero: true, // Ensure y-axis starts from 0
              stepSize: 1, // Set step size to 1 to avoid decimal values
            },
            min: 0,
            max: Math.ceil(maxValue * 1.1), // Set max value slightly above the highest data point
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="w-full h-80 p-4 rounded-lg shadow-lg">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default AdmissionsLineChart;
