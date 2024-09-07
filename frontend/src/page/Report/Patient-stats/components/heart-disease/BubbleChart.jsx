import { useEffect, useRef } from "react";

const BubbleChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "bubble",
      data: {
        datasets: [
          {
            label: "Resting BP vs Max Heart Rate",
            data: [
              { x: 120, y: 130, r: 10 },
              { x: 125, y: 140, r: 15 },
              { x: 130, y: 135, r: 20 },
              { x: 128, y: 150, r: 25 },
              { x: 135, y: 145, r: 30 },
            ],
            backgroundColor: "rgba(255, 159, 64, 0.5)",
            borderColor: "rgba(255, 159, 64, 1)",
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
            text: "Bubble Chart of Blood Pressure vs Max Heart Rate",
            font: {
              size: 16,
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Resting Blood Pressure",
            },
          },
          y: {
            title: {
              display: true,
              text: "Max Heart Rate",
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

export default BubbleChart;
