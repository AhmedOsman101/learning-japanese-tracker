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

const { data, title } = defineProps<{
  data: { name: string; value: number }[];
  title: string;
}>();

const option = ref<ECBasicOption>({
  backgroundColor: "transparent",
  title: {
    text: title,
    left: "center",
  },
  tooltip: {
    trigger: "item",
    // formatter: "{a} <br/>{b} : {c} ({d}%)",
    formatter: "{b}: {c} ({d}%)",
  },
  legend: {
    orient: "horizontal",
    left: "center",
    top: "bottom",
    data: data.map((item) => item.name),
  },
  series: [
    {
      name: title,
      type: "pie",
      radius: "55%",
      center: ["50%", "50%"],
      data,
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
