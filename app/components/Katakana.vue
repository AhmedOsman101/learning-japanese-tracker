<template>
  <PieChart
    :data="[
      { name: 'Memorized', value: katakana.memorized },
      {
        name: 'Remaining',
        value: remaining,
      },
    ]"
    title="Katakana" />
  <Edit
    class="w-full"
    file="kani"
    field="katakana"
    :remaining />
</template>

<script setup lang="ts">
import { katakana } from "~/public/data/kani.json";

const remaining = ref(katakana.total - katakana.memorized);
</script>
