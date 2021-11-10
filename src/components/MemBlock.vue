<script lang="ts" setup>
import { toRefs, watch, ref } from "vue";
const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const { index, value } = toRefs(props);
</script>

<template>
  <div class="mem-block">
    <div class="index">{{ index }}</div>
    <div class="value">
      {{ value }}
    </div>
  </div>
</template>

<style scoped>
.mem-block {
  background-color: #333;
  color: #fff;
  font-size: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

.hidden {
  display: none;
}

.index {
  font-weight: bold;
  background-color: rgb(3, 177, 125);
  display: block;
  width: 100%;
}

.value {
  min-width: 5rem;
  padding: 0.7rem 0;
  width: auto;
}
</style>
