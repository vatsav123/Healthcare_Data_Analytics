import { useEffect, useRef } from "react";

const BarChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Visit 1", "Visit 2", "Visit 3", "Visit 4", "Visit 5"],
        datasets: [
          {
            label: "Serum Cholesterol",
            data: [200, 210, 190, 220, 205],
            backgroundColor: "rgba(255, 159, 64, 0.5)",
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1,
          },
          {
            label: "Fasting Blood Sugar",
            data: [100, 120, 110, 130, 115],
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
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
            text: "Serum Cholesterol and Fasting Blood Sugar",
            font: {
              size: 16,
            },
          },
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            grid: {
              display: false,
            },
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

export default BarChart;
