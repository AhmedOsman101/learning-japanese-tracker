<script setup lang="ts">
import { isActive } from "@/utils";
import { ref, onMounted, onBeforeUnmount } from "vue";

const currentHash = ref(window.location.hash);
function updateHash() {
  currentHash.value = window.location.hash;
}

const links = () => [
  {
    label: "Hiragana",
    href: "#hiragana",
    active:
      isActive("#hiragana", currentHash.value) ||
      isActive("", currentHash.value),
  },
  {
    label: "Katakana",
    href: "#katakana",
    active: isActive("#katakana", currentHash.value),
  },
  {
    label: "JLPT Levels",
    href: "#jlpt",
    active: isActive("#jlpt", currentHash.value),
  },
];

onMounted(() => {
  window.addEventListener("hashchange", updateHash);
});

onBeforeUnmount(() => {
  window.removeEventListener("hashchange", updateHash);
});
</script>

<template>
  <div class="flex justify-center items-center">
    <a
      v-for="link in links()"
      :key="link.label"
      rel="noopener noreferrer"
      :href="link.href"
      class="px-5 py-1 border-b-4"
      :class="link.active ? 'active' : 'border-gray-600'"
      v-text="link.label" />
  </div>
</template>

<style>
@reference "../assets/index.css";

.active {
  @apply border-emerald-400 text-emerald-400;
}
</style>
