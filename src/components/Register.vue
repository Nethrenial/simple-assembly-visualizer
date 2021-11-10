<script lang="ts" setup>
import { toRefs, watch, ref, PropType } from "vue";
import { SingleRegister } from "../types/reg";
const props = defineProps({
  regName: {
    type: String,
    required: true,
  },
  regValue: {
    type: Object as PropType<SingleRegister>,
    required: true,
  },
});

const { regName, regValue } = toRefs(props);
</script>

<template>
  <div
    class="register"
    :style="{
      backgroundColor: regValue.justChanged ? 'red' : '#333',
    }"
  >
    <div class="name">{{ regName }}</div>

    <div class="value">
      {{ regValue.val }}
    </div>
  </div>
</template>

<style scoped>
.register {
  background-color: #333;
  color: #fff;
  font-size: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.name {
  width: 50%;
  background-color: rgb(11, 131, 131);
  padding: 1rem;
}
.value {
  text-align: center;
  width: 50%;
}

span {
  font-weight: bold;
}
</style>
