<script setup lang="ts">
import { defineEmits, toRefs } from "vue";
import { AsmFile } from "../types/file";

const props = defineProps({
  isFileUploaded: {
    type: Boolean,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
});

const { isFileUploaded, fileName } = toRefs(props);

const emit = defineEmits(["asmFileSelected"]);

const handleFileUpload = (e: Event) => {
  emit("asmFileSelected", e);
};
</script>

<template>
  <label for="asm-file-input">
    {{ isFileUploaded ? "Uploaded" : "Upload" }}
  </label>
  <input
    type="file"
    id="asm-file-input"
    name="asm-file-input"
    :value="fileName.length === 0 ? fileName : void 0"
    @change="handleFileUpload"
  />
</template>

<style scoped>
label {
  background-color: rgb(44, 163, 107);
  color: #fff;
  padding: 5px 10px;
  font-size: 2rem;
  cursor: pointer;
  margin-left: 2rem;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  border-radius: 5px;
}

label:hover {
  box-shadow: 5px 5px 12.5px rgba(0, 0, 0, 0.4);
  color: rgb(67, 151, 99);
  background-color: rgb(255, 255, 255);
}

label::active {
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
}

input {
  display: none;
}
</style>
