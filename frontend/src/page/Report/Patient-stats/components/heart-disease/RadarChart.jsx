import { useEffect, useRef } from "react";

const RadarChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "radar",
      data: {
        labels: [
          "Chest Pain Type",
          "Resting BP",
          "Serum Cholesterol",
          "Fasting Blood Sugar",
          "Resting ECG Results",
          "Max Heart Rate",
          "Exercise Induced Angina",
          "Oldpeak",
          "ST Segment",
          "Major Vessels",
          "Thal",
        ],
        datasets: [
          {
            label: "Visit 1",
            data: [2, 120, 200, 100, 1, 130, 0, 2.0, 1, 0, 3],
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            pointBackgroundColor: "rgba(255, 99, 132, 1)",
          },
          {
            label: "Visit 2",
            data: [1, 125, 190, 105, 0, 140, 1, 1.5, 0, 1, 2],
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            pointBackgroundColor: "rgba(54, 162, 235, 1)",
          },
          {
            label: "Visit 3",
            data: [3, 130, 210, 110, 1, 120, 0, 2.5, 1, 1, 4],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            pointBackgroundColor: "rgba(75, 192, 192, 1)",
          },
          {
            label: "Visit 4",
            data: [2, 135, 220, 115, 0, 125, 1, 3.0, 1, 0, 3],
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153, 102, 255, 1)",
            pointBackgroundColor: "rgba(153, 102, 255, 1)",
          },
          {
            label: "Visit 5",
            data: [1, 140, 230, 120, 1, 130, 0, 1.0, 0, 2, 2],
            backgroundColor: "rgba(255, 159, 64, 0.2)",
            borderColor: "rgba(255, 159, 64, 1)",
            pointBackgroundColor: "rgba(255, 159, 64, 1)",
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
            text: "Patient Metrics Radar Chart Across Visits",
            font: {
              size: 16,
            },
          },
        },
        scales: {
          r: {
            beginAtZero: true,
            suggestedMax: 5,
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

export default RadarChart;
