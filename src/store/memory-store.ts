import { ref, Ref, computed } from "vue";
import { Memory } from "../types/memory";

export const MEM_SIZE = 100;
export const memory: Ref<Memory> = ref({ store: new Array(MEM_SIZE).fill(0) });
