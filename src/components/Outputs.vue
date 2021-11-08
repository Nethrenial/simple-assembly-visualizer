<script setup lang="ts">
import { PropType, toRefs } from "vue";
import { OutputList } from "../types/output";
import Output from "./Output.vue";

const props = defineProps({
  outputs: {
    type: Object as PropType<OutputList>,
    required: true,
  },
});

const { outputs } = toRefs(props);
</script>

<template>
  <h2>Outputs</h2>
  <div class="outputs">
    <!-- <div v-for="(output, index) in outputs" :key="index">
      {{ index + 1 }} : {{ output }}
    </div> -->
    <Output
      v-for="(output, index) in outputs.outputs"
      :key="index"
      :index="index"
      :output-value="output"
    />
  </div>
</template>

<style scoped>
h2 {
  text-align: center;
  margin: 2rem;
  font-size: 4rem;
  font-weight: 200;
  color: #fff;
  background-color: teal;
  height: 10%;
  width: 90%;
}
.outputs {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background-color: #fff;
  min-height: 80%;
  width: 90%;
}
</style>
