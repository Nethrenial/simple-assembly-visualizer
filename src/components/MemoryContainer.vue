<script setup lang="ts">
import { PropType, toRefs } from "vue";
import MemBlock from "./MemBlock.vue";

const props = defineProps({
  memory: {
    type: Object as PropType<Array<number | string[]>>,
    required: true,
  },
});

const { memory } = toRefs(props);
// console.log(memory);
</script>

<template>
  <h2>Memory</h2>
  <div class="memory">
    <MemBlock
      v-for="(val, index) in memory"
      :class="typeof val === 'number' ? '' : 'hidden'"
      :index="index"
      :value="typeof val === 'number' ? val.toString() : '0'"
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
.memory {
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 1rem;
  margin: 2rem;
}
</style>
