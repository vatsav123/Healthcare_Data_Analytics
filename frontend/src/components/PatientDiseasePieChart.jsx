import { useEffect, useRef } from "react";

const PatientDiseasePieChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Heart Disease", "Kidney Disease", "Diabetes"],
        datasets: [
          {
            label: "Patient Distribution",
            data: [7, 5, 3], // Number of patients for each category
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)", // Pink
              "rgba(54, 162, 235, 0.6)", // Blue
              "rgba(75, 192, 192, 0.6)", // Teal
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)", // Pink border
              "rgba(54, 162, 235, 1)", // Blue border
              "rgba(75, 192, 192, 1)", // Teal border
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
            text: "Patient Distribution by Disease",
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
    <div className="w-full h-80 p-4 rounded-lg shadow-lg">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default PatientDiseasePieChart;
