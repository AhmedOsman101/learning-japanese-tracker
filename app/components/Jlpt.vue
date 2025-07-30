<template>
  <h1 class="text-2xl text-center font-bold">JLPT Levels</h1>
  <div
    v-if="!pending"
    v-for="(level, index) in levels">
    <WidePieChart
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

    <div class="w-screen grid grid-cols-2 gap-8 px-8 py-4 place-items-center">
      <Edit
        class="w-full"
        file="jlpt"
        :field="`${index}.vocab`"
        :remaining="level.vocab.total - level.vocab.memorized" />
      <Edit
        class="w-full"
        file="jlpt"
        :field="`${index}.kanji`"
        :remaining="level.kanji.total - level.kanji.memorized" />
    </div>
  </div>

  <Loading v-else />
</template>

<script setup lang="ts">
import { GITHUB_RAW_URL } from "~/shared/constants";
const { data, pending } = useFetch(`${GITHUB_RAW_URL}/data/jlpt.json`, {
  transform: JSON.parse,
  lazy: true,
});

type Level = {
  vocab: { memorized: number; total: number };
  kanji: { memorized: number; total: number };
};
type JLPT = {
  N1: Level;
  N2: Level;
  N3: Level;
  N4: Level;
  N5: Level;
};
const levels = ref<JLPT>();

watch(
  data,
  (val) => {
    if (val) levels.value = val;
  },
  { immediate: true }
);
</script>
