<template>
  <h1 class="text-2xl text-center font-bold">JLPT Levels</h1>
  <div v-for="(level, index) in levels">
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
</template>

<script setup lang="ts">
import levels from "~/public/data/jlpt.json";
</script>
