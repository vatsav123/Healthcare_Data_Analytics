import { useEffect, useRef } from "react";

const GroupedBarChart = () => {
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
            label: "Chest Pain Type",
            data: [2, 1, 3, 2, 1],
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            barThickness: 10,
          },
          {
            label: "Resting BP",
            data: [120, 125, 130, 135, 140],
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            barThickness: 10,
          },
          {
            label: "Serum Cholesterol",
            data: [200, 190, 210, 220, 230],
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            barThickness: 10,
          },
          {
            label: "Fasting Blood Sugar",
            data: [100, 105, 110, 115, 120],
            backgroundColor: "rgba(153, 102, 255, 0.5)",
            barThickness: 10,
          },
          // Add more datasets as needed
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
            text: "Patient Metrics Across Multiple Visits",
            font: {
              size: 16,
            },
          },
        },
        scales: {
          x: {
            stacked: true,
            title: {
              display: true,
              text: "Visit",
            },
          },
          y: {
            stacked: true,
            title: {
              display: true,
              text: "Value",
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

export default GroupedBarChart;
