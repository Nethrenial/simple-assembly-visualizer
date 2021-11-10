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
  margin: 1rem;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 3rem;
  font-weight: 200;
  color: #fff;
  background-color: rgb(10, 153, 134);
  width: 90%;
}
.outputs {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background-color: #fff;
  min-height: 80%;
  max-height: 100%;
  width: 90%;
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
}
</style>
