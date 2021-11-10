<script setup lang="ts"></script>

<template>
  <button>Reset</button>
</template>

<style scoped>
button {
  background-color: rgb(197, 55, 55);
  color: #fff;
  padding: 5px 10px;
  font-size: 2rem;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 2rem;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  border: none;
  outline: none;
}

button:hover {
  box-shadow: 5px 5px 12.5px rgba(0, 0, 0, 0.4);
  background-color: #fff;
  color: rgb(197, 55, 55);
  border: none;
  outline: none;
}

button::active {
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
  border: none;
  outline: none;
}
</style>
