<template>
  <PieChart
    :data="[
      { name: 'Memorized', value: katakana.memorized },
      {
        name: 'Remaining',
        value: katakana.total - katakana.memorized,
      },
    ]"
    title="Katakana" />
</template>

<script setup lang="ts">
import PieChart from "./PieChart.vue";
import { katakana } from "~/data/kani.json";
</script>
