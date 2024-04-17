"use client";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartType,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
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

declare module "chart.js" {
  interface PluginOptionsByType<TType extends ChartType> {
    annotation?: {
      annotations?: Record<string, AnnotationItem>;
    };
  }

  interface AnnotationItem {
    type?: string;
    xMin?: number;
    xMax?: number;
    yMin?: number;
    yMax?: number;
    backgroundColor?: string;
    borderColor?: string;
    drawTime?: string;
  }
}

export default function InrChart({ data }: TInrChart) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after a delay
    }, 1000); // Delay in milliseconds
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  ChartJS.defaults.borderColor = "rgb(226, 232, 240)";
  ChartJS.defaults.color = "rgb(100, 116, 139)";

  const limitedData = data.slice(0, 8);

  const formData = {
    type: "line",
    labels: limitedData.map((item) => item.date).reverse(),
    datasets: [
      {
        label: "INR Value",
        data: limitedData.map((item) => item.inr).reverse(),
        fill: false,
        tension: 0.1,
        pointRadius: 10,
        pointBorderColor: "rgba(3, 98, 164, 1)",
        backgroundColor: "rgba(3, 98, 164, 1)",
        borderColor: "rgba(3, 98, 164, 1)",
        pointBackgroundColor: "rgba(3, 98, 164, 1)",
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
            drawTime: "beforeDraw",
          },
        },
      },
    },
  };

  return (
    <div className="flex justify-center items-center mb-10 border border-slate-200 rounded-md p-10  bg-white h-96 w-full">
      {loading ? <Spinner /> : <Line data={formData} options={options} />}
    </div>
  );
}
