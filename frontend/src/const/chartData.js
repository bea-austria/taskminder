const options = {
    colors: ["#1A56DB", "#FDBA8C"],
    series: [
      {
        name: "Hours",
        color: "#0D47A1",
        data: [
          { x: "Mon", y: 0 },
          { x: "Tue", y: 0 },
          { x: "Wed", y: 0 },
          { x: "Thu", y: 0 },
          { x: "Fri", y: 0 },
          { x: "Sat", y: 0 },
          { x: "Sun", y: 0 },
        ],
      },
      {
        name: "Activity",
        color: "#FDBA8C",
        data: [
          { x: "Mon", y: 0 },
          { x: "Tue", y: 0 },
          { x: "Wed", y: 0 },
          { x: "Thu", y: 0 },
          { x: "Fri", y: 0 },
          { x: "Sat", y: 0 },
          { x: "Sun", y: 0 },
        ],
      },
    ],
    chart: {
      type: "bar",
      height: "320px",
      fontFamily: "Inter, sans-serif",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
        borderRadiusApplication: "end",
        borderRadius: 8,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    states: {
      hover: {
        filter: {
          type: "darken",
          value: 1,
        },
      },
    },
    stroke: {
      show: true,
      width: 0,
      colors: ["transparent"],
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -14
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      floating: false,
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
        }
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: [
      {
        show: false,
      },
      {
        labels: {
          formatter: function (value) {
            return value + '%'; // Add '%' sign to y-axis labels
          }
        },
        show: false,
      },
    ],
    fill: {
      opacity: 1,
    },
  }

export default options;