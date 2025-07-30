<template>
  <PieChart
    :data="[
      { name: 'Memorized', value: hiragana.memorized },
      {
        name: 'Remaining',
        value: remaining,
      },
    ]"
    title="Hiragana" />
  <Edit
    class="w-full"
    file="kani"
    field="hiragana"
    :remaining />
</template>

<script setup lang="ts">
import { hiragana } from "~/public/data/kani.json";
const remaining = ref(hiragana.total - hiragana.memorized);
</script>
