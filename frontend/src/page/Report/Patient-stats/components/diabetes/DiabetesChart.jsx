import { useEffect, useRef } from "react";

const DiabetesChart = () => {
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
            label: "Glucose (mg/dL)",
            data: [100, 120, 110, 130, 125, 140, 135],
            borderColor: "#FFC5C5", // Soft red
            backgroundColor: "rgba(255, 197, 197, 0.2)", // Soft red
            tension: 0.4,
            fill: true,
            pointRadius: 1.5, // Adjusted point radius
            pointHoverRadius: 5, // Adjusted hover radius
            pointBackgroundColor: "#FFC5C5", // Soft red
          },
          {
            label: "Serum Cholesterol (mg/dL)",
            data: [180, 200, 190, 220, 210, 230, 225],
            borderColor: "#87CEEB", // Soft blue
            backgroundColor: "rgba(135, 206, 235, 0.2)", // Soft blue
            tension: 0.4,
            fill: true,
            pointRadius: 1.5, // Adjusted point radius
            pointHoverRadius: 5, // Adjusted hover radius
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
            text: "Glucose and Serum Cholesterol Over Months",
            font: {
              size: 16,
            },
          },
        },
        scales: {
          y: {
            min: 0,
            max: 250,
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
            radius: 5, // Adjusted point radius
            hoverRadius: 10, // Adjusted hover radius
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
    <div className="w-full h-80 p-4 bg-white rounded-lg">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default DiabetesChart;
