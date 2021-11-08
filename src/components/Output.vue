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
  <div class="output">{{ index + 1 }} : {{ outputValue }}</div>
</template>

<style scoped>
.output {
  padding: 2rem;
  background-color: #333;
  color: #fff;
  font-size: 2rem;
  margin-top: 1rem;
  width: 90%;
}
</style>
