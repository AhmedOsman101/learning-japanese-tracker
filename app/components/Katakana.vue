<template>
  <div v-if="!pending">
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
  </div>

  <Loading v-else />
</template>

<script setup lang="ts">
import { GITHUB_RAW_URL } from "~/shared/constants";

const { data, pending } = useFetch(`${GITHUB_RAW_URL}/data/kani.json`, {
  transform: JSON.parse,
  lazy: true,
});

const katakana = ref({ memorized: 0, total: 0 });
const remaining = ref(0);

watch(
  data,
  (val) => {
    if (val && val.katakana) {
      katakana.value = val.katakana;
      remaining.value = val.katakana.total - val.katakana.memorized;
    }
  },
  { immediate: true }
);
</script>
