import { ref, Ref, computed } from "vue";

export const MEM_SIZE = 100;
export const memory: Ref<Array<number | string[]>> = ref(
  new Array(MEM_SIZE).fill(0)
);
