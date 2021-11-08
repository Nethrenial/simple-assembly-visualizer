<script setup lang="ts">
defineProps({
  isDisabled: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <button :disabled="isDisabled">Prev</button>
</template>

<style scoped>
button {
  background-color: rgb(19, 134, 241);
  color: #fff;
  padding: 10px;
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
  background-color: rgb(3, 71, 160);
  color: rgb(255, 255, 255);
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
