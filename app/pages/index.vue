<script setup lang="ts">
import Hiragana from "@/components/Hiragana.vue";
import Katakana from "@/components/Katakana.vue";
import Jlpt from "@/components/Jlpt.vue";
import Tabs from "@/components/Tabs.vue";
import { isActive } from "shared/utils";

const currentHash = useHash();
</script>

<template>
  <div class="space-y-10 pb-32">
    <h1 class="text-4xl text-center font-bold pt-8">🇯🇵 Learning Tracker 🇯🇵</h1>
    <Tabs />
    <ClientOnly>
      <Hiragana
        v-if="
          isActive('#hiragana', currentHash) || isActive('', currentHash)
        " />
      <Katakana v-if="isActive('#katakana', currentHash)" />
      <Jlpt v-if="isActive('#jlpt', currentHash)" />
    </ClientOnly>
  </div>
</template>
