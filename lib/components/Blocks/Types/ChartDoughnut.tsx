import { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { PropsChart } from "./props";

ChartJS.register(Tooltip, Legend, ArcElement);

function ChartDoughnut({ data, title = "", options }: PropsChart) {
  const [hover, setHover] = useState(false);

  const colors = options?.colors || [
    "#3b82f6",
    "#22c55e",
    "#a855f7",
    "#78716c",
    "#ea5d0c",
    "#1e78d1",
    "#50c677",
    "#c92b94",
    "#4f46e5",
    "#c026d3",
  ];

  const dataLine = {
    labels: data.labels,
    datasets: data.datasets.map((row: any, index: number) => ({
      pointBorderColor: colors[index],
      label: row.label,
      data: row.vals,
      backgroundColor: colors,
      borderColor: colors,
    })),
  };

  const optionsChart: any = {
    hoverBorderWidth: "10",
    pointRadius: [0],
    pointHoverRadius: [5],
    elements: {
      line: {
        tension: 0.4,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const optionsHover: any = {
    ...optionsChart,
    pointRadius: [3],
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Doughnut options={hover ? optionsHover : optionsChart} data={dataLine} />
    </div>
  );
}

export default ChartDoughnut;
