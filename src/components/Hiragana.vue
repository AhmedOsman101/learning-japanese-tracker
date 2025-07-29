<template>
  <PieChart
    :data="[
      { name: 'Memorized', value: hiragana.memorized },
      {
        name: 'Remaining',
        value: hiragana.total - hiragana.memorized,
      },
    ]"
    title="Hiragana" />
</template>

<script setup lang="ts">
import PieChart from "./PieChart.vue";
import { hiragana } from "../data/kani.json";
</script>
