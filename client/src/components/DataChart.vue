<template>
  <canvas id="myChart" width="400" height="400"></canvas>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Chart from "chart.js/auto";

@Options({
  props: {
    data: {
      required: true,
    },
  },
  data: () => ({
    labels: null,
    dataset: null,
  }),

  mounted() {
    console.log(this.data, "data i chart");
    const colors = [
      "rgb(31, 233, 182)",
      "rgb(125, 79, 255)",
      "rgb(255, 178, 2)",
      "rgb(3, 175, 254)",
      "rgb(255, 65, 129)",
      "rgb(161, 161, 161)",
      "rgb(183, 24, 255)",
    ];
    const ctx = document.getElementById("myChart");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: this.data.names,
        datasets: [
          {
            label: "Value",
            data: this.data.values,
            backgroundColor: [
              "rgba(255, 99, 132 )",
              "rgba(54, 162, 235)",
              "rgba(255, 206, 86)",
              "rgba(75, 192, 192)",
              "rgba(153, 102, 255)",
              "rgba(255, 159, 64)",
              "rgba(200, 109, 64)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  },
})
export default class DataChart extends Vue {}
</script>
