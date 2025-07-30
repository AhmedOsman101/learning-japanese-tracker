<template>
  <div v-if="!pending">
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
  </div>

  <Loading v-else />
</template>

<script setup lang="ts">
import { GITHUB_RAW_URL } from "~/shared/constants";
const { data, pending } = useFetch(`${GITHUB_RAW_URL}/data/kani.json`, {
  transform: JSON.parse,
  lazy: true,
});

const hiragana = ref({ memorized: 0, total: 0 });
const remaining = ref(0);

watch(
  data,
  (val) => {
    console.log(val)
    if (val && val.hiragana) {
      hiragana.value = val.hiragana;
      remaining.value = val.hiragana.total - val.hiragana.memorized;
    }
  },
  { immediate: true }
);
</script>
