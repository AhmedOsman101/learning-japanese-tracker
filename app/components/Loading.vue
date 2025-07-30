<template>
  <div class="flex items-center justify-center h-56 w-fit mx-auto">
    <span class="loader"></span>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

span {
  border: 8px solid;
  animation: rotation 1s linear infinite;
  @apply border-b-emerald-400 size-20 border-gray-300 box-border inline-block rounded-full;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
