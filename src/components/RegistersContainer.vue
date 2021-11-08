<script setup lang="ts">
import { PropType, toRefs } from "vue";
import { Reg } from "../types/reg";
import Register from "./Register.vue";

const props = defineProps({
  reg: {
    type: Object as PropType<{ [key: string]: number | boolean } & Reg>,
    required: true,
  },
});

const { reg } = toRefs(props);
</script>

<template>
  <h2>Registers</h2>
  <div class="registers">
    <Register
      v-for="(val, key) in reg"
      :key="key"
      :reg-name="key.toString()"
      :reg-value="val.toString()"
    />
  </div>
</template>

<style scoped>
h2 {
  margin: 2rem;
  font-size: 3rem;
  font-weight: 200;
  color: #444;
}
.registers {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 1rem;
  margin: 2rem;
}
</style>
