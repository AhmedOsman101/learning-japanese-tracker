<template>
  <div
    class="flex flex-col items-center gap-4 p-6 max-w-sm mx-auto bg-zinc-800">
    <!-- Number Input with Plus/Minus Buttons -->
    <div
      class="flex items-center bg-zinc-700 rounded-lg overflow-hidden shadow-lg border border-zinc-600 w-full max-w-xs">
      <!-- Minus Button -->
      <button
        @click="decrement"
        class="flex items-center justify-center flex-1 h-12 bg-zinc-600 hover:bg-zinc-500 active:bg-zinc-400 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-inset text-zinc-200"
        :disabled="value <= MIN"
        :class="{ 'opacity-50 cursor-not-allowed': value <= MIN }">
        <svg
          class="w-5 h-5 text-zinc-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 12H4" />
        </svg>
      </button>

      <!-- Number Input -->
      <input
        v-model.number="value"
        type="number"
        :min="MIN"
        :max="remaining"
        class="flex-2 h-12 text-center text-lg font-medium bg-zinc-700 text-zinc-100 border-0 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-inset appearance-none min-w-0 placeholder-zinc-400"
        @input="validateInput" />

      <!-- Plus Button -->
      <button
        @click="increment"
        class="flex items-center justify-center flex-1 h-12 bg-zinc-600 hover:bg-zinc-500 active:bg-zinc-400 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-inset text-zinc-200"
        :disabled="value >= remaining"
        :class="{ 'opacity-50 cursor-not-allowed': value >= remaining }">
        <svg
          class="w-5 h-5 text-zinc-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>

    <!-- Submit Button -->
    <button
      @click="submit"
      class="w-full max-w-xs px-6 py-3 bg-zinc-600 hover:bg-zinc-500 active:bg-zinc-400 text-zinc-100 font-medium rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-800 shadow-lg border border-zinc-500">
      Submit
    </button>
  </div>
</template>

<script setup lang="ts">
// props
const { file, remaining, field } = defineProps<{
  file: "jlpt" | "kani";
  remaining: number;
  field: string;
}>();

// Reactive data
const value = ref(1);

// Constants
const MIN = 1;

// Methods
async function submit() {
  const password = prompt("Enter the password") ?? "";

  await $fetch("/api/update-file", {
    method: "POST",
    body: { increment: value.value, file, field, password },
  });
}

function increment() {
  if (value.value < remaining) value.value++;
}

function decrement() {
  if (value.value > MIN) value.value--;
}

function validateInput() {
  // Ensure value stays within bounds
  if (value.value < MIN) value.value = MIN;
  else if (value.value > remaining) value.value = remaining;
}

// Watch for changes to ensure value is always a number
watch(value, (newValue) => {
  if (isNaN(newValue)) value.value = MIN;
});
</script>

<style scoped>
/* Hide number input arrows */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}

.flex-2 {
  flex: 2;
}
</style>
