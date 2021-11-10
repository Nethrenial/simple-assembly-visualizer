import { Ref, ref } from "vue";
import { PrevoiusStates } from "../types/state";

export const previousStates: Ref<PrevoiusStates> = ref({ states: [] });
