<script setup lang="ts">
import { toRefs } from "vue";
const props = defineProps({
  isDisabled: {
    type: Boolean,
    required: true,
  },
});

const { isDisabled } = toRefs(props);
</script>

<template>
  <button :disabled="isDisabled">To start</button>
</template>

<style scoped>
button {
  background-color: rgb(19, 134, 241);
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 2rem;
  cursor: pointer;
  margin-left: 2rem;
  margin-right: 2rem;

  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  border: none;
  outline: none;
}

button:hover {
  box-shadow: 5px 5px 12.5px rgba(0, 0, 0, 0.4);
  color: rgb(3, 71, 160);
  background-color: rgb(255, 255, 255);
  border: none;
  outline: none;
}

button::active {
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
  border: none;
  outline: none;
}

button:disabled,
button[disabled] {
  background-color: grey;
  cursor: not-allowed;
}
</style>
