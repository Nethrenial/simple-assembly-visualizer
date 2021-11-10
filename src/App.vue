<script setup lang="ts">
//Import the vue functions
import { ref, Ref, computed } from "vue";
//Import vue components
import AssemblyFileInput from "./components/AssemblyFileInput.vue";
import ResetVm from "./components/ResetVm.vue";
import RegistersContainer from "./components/RegistersContainer.vue";
import MemoryContainer from "./components/MemoryContainer.vue";
import NextExecution from "./components/NextExecution.vue";
import PrevExecution from "./components/PrevExecution.vue";
import Outputs from "./components/Outputs.vue";
//Import typescript types
import { Reg } from "./types/reg";
import { State } from "./types/state";
//Import memory, reg, output, previous state stores
import { memory, MEM_SIZE } from "./store/memory-store";
import { reg } from "./store/register-store";
import { instructions } from "./store/instructions-store";
import { outputs } from "./store/outputs-store";
import { previousStates } from "./store/prev-states";

//Ref to see if a file is uploaded
const isFileUploaded = ref(false);
//Ref to hold the file name
const file = ref("");
//Ref to a file reader
let reader: FileReader | null = null;
//Ref to hold the instruction list
let instructionLines: string[] = [];
//Ref to the next instruction
let nextInstruction = ref("");
//Ref to the previous instruction
let prevInstruction = ref("");
//Ref to see if program is finished
const isFinished = ref(false);
//Ref to see of program is at start
const isAtStart = ref(true);
//Computed property to disable the next button if needed
const isNextButtonDisabled = computed(() => {
  if (isFinished.value || !isFileUploaded.value) {
    return true;
  }
  return false;
});
//Computed property to disable the prev button if needed
const isPrevButtonDisabled = computed(() => {
  if (isAtStart.value || !isFileUploaded.value) {
    return true;
  }
  return false;
});

//Function to execute the next instruction
const executeNext = () => {
  if (instructionLines.length === 0 || !reader) {
    console.log("Not any instructions");
  } else {
    if (!reg.value["halt"] && !isFinished.value) {
      isAtStart.value = false;
      console.log(nextInstruction.value);

      previousStates.value.states.push({
        memoryState: Object.assign({}, memory.value),
        registersState: Object.assign({}, reg.value),
        nextInstruction: `${(
          memory.value.store[reg.value["pc"]] as string[]
        ).join(" ")}`,
        prevInstruction: `${prevInstruction.value}`,
      });

      prevInstruction.value = nextInstruction.value;

      let i = reg.value["pc"] as number;
      let instruction =
        instructions[(memory.value.store[i] as string[])[0] as string];
      if (((memory.value.store[i] as string[])[0] as string) === "halt") {
        isFinished.value = true;
        previousStates.value.states[
          previousStates.value.states.length - 1
        ].nextInstruction = "halt";
        console.log(previousStates.value);
      }
      instruction((memory.value.store[i] as string[]).slice(1));
      reg.value["timer"] = (reg.value["timer"] as number) - 1;
      if (reg.value["int"] === 1 && reg.value["timer"] === 0) {
        reg.value["sp"] = (reg.value["sp"] as number) + 1;
        memory.value.store[reg.value["sp"]] = reg.value["pc"] as number;
        reg.value["pc"] = reg.value["ivec"];
        reg.value["int"] = 0;
      }
      const stringArr = memory.value.store[reg.value["pc"]];
      if (stringArr) {
        nextInstruction.value = (stringArr as string[]).join(" ");
      }
    }
  }
};

//Function to go back to the previous state
const goBack = () => {
  if (previousStates.value.states.length > 0) {
    isFinished.value = false;
    const previousState = previousStates.value.states.pop() as State;
    reg.value = previousState.registersState;
    memory.value = previousState.memoryState;
    nextInstruction.value = previousState.nextInstruction;
    prevInstruction.value = previousState.prevInstruction;
    if (previousState.nextInstruction.startsWith("out")) {
      outputs.value.outputs.pop();
    }
    if (previousStates.value.states.length === 0) {
      isAtStart.value = true;
    }
  }
};

//Function to load the file and initialize the virtual machine
const loadFile = (e: Event) => {
  if ((e.target as HTMLInputElement).files?.length != 0) {
    isFileUploaded.value = true;
    reader = new FileReader();
    reader.onload = (e) => {
      const asm = (e.target as FileReader).result as string;
      instructionLines = asm.split("\n");

      for (const line of instructionLines) {
        if (line.startsWith("#") || line === "") {
          continue;
        }
        const instruction = line.split(" ");
        if (instruction.length > 0) {
          memory.value.store[Number.parseInt(instruction[0])] =
            instruction.slice(1);
        }
      }
      nextInstruction.value = (
        memory.value.store[reg.value["pc"] as number] as string[]
      ).join(" ");
    };
    file.value = ((e.target as HTMLInputElement).files as FileList)[0].name;
    reader.readAsText(((e.target as HTMLInputElement).files as FileList)[0]);
  }
};

const reset = () => {
  reg.value = new Proxy(
    {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0,
      f: 0,
      sp: 0,
      acc: 0,
      pc: 0,
      ivec: 0,
      int: 0,
      timer: 0,
      halt: false,
    } as { [key: string]: number | boolean },
    {
      set: (obj, prop, value) => {
        obj[prop as string] = value;
        return true;
      },
    }
  ) as { [key: string]: number | boolean } & Reg;
  memory.value.store = new Array(MEM_SIZE).fill(0);
  isFileUploaded.value = false;
  isFinished.value = false;
  isAtStart.value = true;
  previousStates.value.states = [];
  outputs.value = {
    outputs: [],
  };
  nextInstruction.value = "";
  prevInstruction.value = "";
};
</script>

<template>
  <div class="input-and-reset">
    <div class="buttons">
      <AssemblyFileInput
        @asm-file-selected="loadFile"
        :is-file-uploaded="isFileUploaded"
        :file-name="file"
      />
      <ResetVm @click="reset" />
      <PrevExecution @click="goBack" :is-disabled="isPrevButtonDisabled" />
      <NextExecution @click="executeNext" :is-disabled="isNextButtonDisabled" />
    </div>

    <div class="instructions">
      <div class="prev">
        <span v-if="!isAtStart">
          {{ isFileUploaded ? "PREV :  " : "FILE NOT SELECTED" }}
        </span>
        <span class="instruction" v-if="!isAtStart">
          {{ isFileUploaded ? prevInstruction : "" }}
        </span>
      </div>
      <div class="next">
        {{
          isFileUploaded
            ? isFinished
              ? "ENDED"
              : `NEXT :  `
            : "FILE NOT SELECTED"
        }}
        <span class="instruction" v-if="!isFinished">
          {{ isFileUploaded ? (isFinished ? "" : nextInstruction) : "" }}
        </span>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="registers-container">
      <RegistersContainer :reg="reg" />
    </div>
    <div class="memory-container">
      <MemoryContainer :store="memory.store" />
    </div>
    <div class="outputs-container">
      <Outputs :outputs="outputs" />
    </div>
  </div>
</template>

<style>
/* reset */

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 62.5%;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #eee;
}

.input-and-reset {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  z-index: 10;
  border-bottom: 2px solid #333;
  background-color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.instructions {
  background-color: #333;
  font-size: 2rem;
  flex: 1;
  font-weight: bold;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 2rem;
  height: 90%;
}

.instruction {
  background-color: #fff;
  padding: 0.5rem;
  color: #333;
  margin-left: 1rem;
  width: 150px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
}

.prev {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 200;
}
.next {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 200;
}

.container {
  background-color: #eee;
  margin-top: 50px;
  display: grid;
  min-height: calc(100vh - 50px);
  grid-template-areas:
    "reg reg reg reg outputs"
    "reg reg reg reg outputs"
    "reg reg reg reg outputs"
    "reg reg reg reg outputs"
    "mem mem mem mem outputs"
    "mem mem mem mem outputs"
    "mem mem mem mem outputs"
    "mem mem mem mem outputs";
}

.registers-container {
  grid-area: reg;
}

.memory-container {
  grid-area: mem;
}

.outputs-container {
  grid-area: outputs;
  background-color: #333;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
  border: 3px solid #333;
  border-top: none;
  border-right: none;
  border-bottom: none;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}

ul {
  list-style: none;
}

footer {
  width: 100%;
  height: 70px;
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
}
</style>
