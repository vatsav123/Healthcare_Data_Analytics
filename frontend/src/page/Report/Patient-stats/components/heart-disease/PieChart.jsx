import { useEffect, useRef } from "react";

const PieChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: [
          "Chest Pain Type",
          "Resting BP",
          "Serum Cholesterol",
          "Fasting Blood Sugar",
          "Max Heart Rate",
        ],
        datasets: [
          {
            label: "Visit 1",
            data: [2, 120, 200, 100, 130], // Example data
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(255, 159, 64, 0.5)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
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
            text: "Patient Metrics Breakdown for Visit 1",
            font: {
              size: 16,
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

export default PieChart;
