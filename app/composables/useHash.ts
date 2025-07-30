import { onBeforeUnmount, onMounted, ref } from "vue";

export function useHash() {
  const hash = ref("");

  const updateHash = () => {
    hash.value = window.location.hash;
  };

  onMounted(() => {
    updateHash();
    window.addEventListener("hashchange", updateHash);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("hashchange", updateHash);
  });

  return hash;
}
