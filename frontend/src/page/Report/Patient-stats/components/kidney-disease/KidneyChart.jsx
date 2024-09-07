import { useEffect, useRef } from "react";

const KidneyChart = () => {
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
            label: "Serum Creatinine (mg/dL)",
            data: [0.8, 1.2, 0.9, 1.5, 1.1, 1.8, 1.4],
            borderColor: "#FFC5C5", // Soft red
            backgroundColor: "rgba(255, 197, 197, 0.2)", // Soft red
            tension: 0.4,
            fill: true,
            pointRadius: 1, // Adjusted point radius
            pointHoverRadius: 5, // Adjusted hover radius
            pointBackgroundColor: "#FFC5C5", // Soft red
          },
          {
            label: "Albumin (g/dL)",
            data: [3.5, 4.2, 3.8, 4.5, 4.1, 4.8, 4.6],
            borderColor: "#87CEEB", // Soft blue
            backgroundColor: "rgba(135, 206, 235, 0.2)", // Soft blue
            tension: 0.4,
            fill: true,
            pointRadius: 1, // Adjusted point radius
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
            text: "Serum Creatinine and Albumin Over Months",
            font: {
              size: 16,
            },
          },
        },
        scales: {
          y: {
            min: 0,
            max: 8,
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

export default KidneyChart;
