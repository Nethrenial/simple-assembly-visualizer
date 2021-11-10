<script lang="ts" setup>
import { toRefs } from "vue";
const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  outputValue: {
    type: Number,
    required: true,
  },
});

const { outputValue } = toRefs(props);
</script>

<template>
  <div class="output">{{ outputValue }}</div>
</template>

<style scoped>
.output {
  padding: 1rem 2rem;
  text-align: center;
  background-color: #333;
  color: #fff;
  font-size: 2rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  width: 90%;
}
</style>
