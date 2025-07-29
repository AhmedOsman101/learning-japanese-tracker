<template>
  <ClientOnly>
    <v-chart class="chart" :option="option" />
  </ClientOnly>
</template>

<script setup lang="ts">
import { use } from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide } from "vue";
import type { ECBasicOption } from "echarts/types/dist/shared";

use([SVGRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent]);

provide(THEME_KEY, "dark");

const { data1, data2, title1, title2 } = defineProps<{
  data1: { name: string; value: number }[];
  data2: { name: string; value: number }[];
  title1: string;
  title2: string;
}>();

const option = ref<ECBasicOption>({
  backgroundColor: "transparent",
  title: [
    {
      text: title1,
      left: "25%",
      top: "10%",
      textAlign: "center",
    },
    {
      text: title2,
      left: "75%",
      top: "10%",
      textAlign: "center",
    },
  ],
  tooltip: {
    trigger: "item",
    formatter: "{b}: {c} ({d}%)",
  },

  legend: {
    orient: "vertical",
    left: "center",
    top: "bottom",
    data: data1.map((item) => item.name),
  },
  series: [
    {
      name: title1,
      type: "pie",
      radius: "40%",
      center: ["25%", "50%"],
      data: data1,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
    {
      name: title2,
      type: "pie",
      radius: "40%",
      center: ["75%", "50%"],
      data: data2,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
});
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
