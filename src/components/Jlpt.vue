<template>
  <h1 class="text-2xl text-center font-bold">JLPT Levels</h1>
  <WidePieChart
    v-for="(level, index) in levels"
    :key="index"
    :title1="`${index} Vocab`"
    :data1="[
      { name: 'Memorized', value: level.vocab.memorized },
      {
        name: 'Remaining',
        value: level.vocab.total - level.vocab.memorized,
      },
    ]"
    :title2="`${index} Kanji`"
    :data2="[
      { name: 'Memorized', value: level.kanji.memorized },
      {
        name: 'Remaining',
        value: level.kanji.total - level.kanji.memorized,
      },
    ]" />
</template>

<script setup lang="ts">
import WidePieChart from "./WidePieChart.vue";
import { levels } from "../data/jlpt.json";
</script>
