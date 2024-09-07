import { useEffect, useRef } from "react";

const HeartChart = ({ heartRateData, bloodPressureData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], // Month labels
        datasets: [
          {
            label: "Heart Rate (bpm)",
            data: heartRateData,
            borderColor: "#FFC5C5", // Soft red
            backgroundColor: "rgba(255, 197, 197, 0.2)", // Soft red
            tension: 0.4,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointBackgroundColor: "#FFC5C5", // Soft red
          },
          {
            label: "Blood Sugar(mm/DL)",
            data: bloodPressureData,
            borderColor: "#87CEEB", // Soft blue
            backgroundColor: "rgba(135, 206, 235, 0.2)", // Soft blue
            tension: 0.4,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointBackgroundColor: "#87CEEB", // Soft blue
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
            text: "Heart Rate and Blood Pressure Over Months",
            font: {
              size: 16,
            },
          },
        },
        scales: {
          y: {
            min: 80,
            max: 200,
            grid: {
              display: false,
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        elements: {
          line: {
            borderWidth: 2,
          },
          point: {
            radius: 0,
            hoverRadius: 5,
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [heartRateData, bloodPressureData]);

  return (
    <div className="w-full h-80 p-4 bg-white rounded-lg">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default HeartChart;
