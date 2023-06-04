import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export const Grafica = ({ code }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    let binaryArray,
      symbolArray,
      dataSource,
      arreglo = false;

    if (Array.isArray(code)) {
      symbolArray = code.map((digit) => digit);
      dataSource = symbolArray;
      arreglo = true;
    } else {
      binaryArray = code.split("").map(Number);
      symbolArray = binaryArray.map((digit) => (digit === 0 ? "+1" : "-1"));
      dataSource = binaryArray.map((digit) => (digit === 0 ? 1 : -1));
      arreglo = false;
    }

    const ctx = chartRef.current.getContext("2d");

    // Destruye el gráfico anterior si existe
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    chartRef.current.chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: symbolArray,
        datasets: [
          {
            label: "Algo",
            data: dataSource,
            backgroundColor:
              arreglo === true
                ? symbolArray.map((digit) =>
                    digit > 0 ? "#2ecc71" : "#e74c3c"
                  )
                : binaryArray.map((digit) =>
                    digit === 0 ? "#2ecc71" : "#e74c3c"
                  ),
          },
        ],
      },
      options: {
        responsive: true, // Habilita la capacidad de respuesta del gráfico
        maintainAspectRatio: false, // Permite mantener el tamaño definido en el contenedor
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: code.toString(),
          },
        },
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    });
  }, [code]);

  return (
    <div className="grafica">
      <canvas ref={chartRef} />
    </div>
  );
};
