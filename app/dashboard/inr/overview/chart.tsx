"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import { useState, useEffect } from "react";
import Spinner from "@/components/ui/spinner";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

type TInrChart = {
  data: {
    id: number;
    inr: number | null;
    date: string | null;
    note: string | null;
  }[];
};

export default function InrChart({ data }: TInrChart) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after a delay
    }, 2000); // Delay in milliseconds
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  console.log("chart loaded");

  const limitedData = data.slice(-8);

  const formData = {
    labels: limitedData.map((item) => item.date).reverse(),
    datasets: [
      {
        label: "INR Value",
        data: limitedData.map((item) => item.inr).reverse(),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        pointRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        suggestedMin: 0.5,
        suggestedMax: 4,
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
      annotation: {
        annotations: {
          box1: {
            type: "box",
            xMin: 0,
            xMax: 8,
            yMin: 1.5,
            yMax: 2.5,
            backgroundColor: "rgba(187, 247, 208, 0.4)",
            borderColor: "rgba(187, 247, 208, 0.5)",
          },
        },
      },
    },
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Trends</h2>
      <div className="flex justify-center items-center mb-10 border border-slate-200 rounded-md p-10  bg-white h-96">
        {loading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <Line options={options} data={formData} />
        )}
      </div>
    </div>
  );
}
