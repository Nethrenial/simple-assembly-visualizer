<script setup lang="ts">
//Import the vue functions
import { ref, Ref, computed } from "vue";
//Import vue components
import AssemblyFileInput from "./components/AssemblyFileInput.vue";
import ResetVm from "./components/ResetVm.vue";
import RegistersContainer from "./components/RegistersContainer.vue";
import MemoryContainer from "./components/MemoryContainer.vue";
import ExecuteAll from "./components/ExecuteAll.vue";
import BackToStart from "./components/BackToStart.vue";
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
import { states } from "./store/prev-states";

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

const isAllButtonDisabled = computed(() => {
  if (isFinished.value || !isFileUploaded.value) {
    return true;
  }
  return false;
});

const isBackToStartButtonDisabled = computed(() => {
  if (isAtStart.value || !isFileUploaded.value) {
    return true;
  }
  return false;
});

document.addEventListener("keydown", (e) => {
  const key = e.key;
  switch (key) {
    case "ArrowRight":
      executeNext();
      break;
    case "ArrowLeft":
      goBack();
      break;
    case "Enter":
      executeAll();
      break;

    default:
      break;
  }
});

const resetRegisterStyles = () => {
  for (const key of Object.keys(reg.value)) {
    const register = document.querySelector(`.register-${key}`) as HTMLElement;
    register.classList.remove("highlighted");
  }
};

const resetMemBlockStyles = () => {
  for (let index = 0; index < memory.value.length; index++) {
    const element = memory.value[index];
    if (typeof element === "number") {
      const memblock = document.querySelector(
        `.memblock-${index}`
      ) as HTMLElement;
      memblock.classList.remove("highlighted");
    }
  }
};

//Function to execute the next instruction
const executeNext = () => {
  if (instructionLines.length === 0 || !reader) {
    console.log("Not any instructions");
  } else {
    if (!reg.value["halt"] && !isFinished.value) {
      isAtStart.value = false;

      const hsg: string[] = [];
      const hsm: number[] = [];
      for (const key of Object.keys(reg.value)) {
        const register = document.querySelector(
          `.register-${key}`
        ) as HTMLElement;
        if (register.classList.contains("highlighted")) {
          hsg.push(key);
        }
      }
      for (let index = 0; index < memory.value.length; index++) {
        const element = memory.value[index];
        if (typeof element === "number") {
          const memblock = document.querySelector(
            `.memblock-${index}`
          ) as HTMLElement;
          if (memblock.classList.contains("highlighted")) {
            hsm.push(index);
          }
        }
      }

      resetRegisterStyles();
      resetMemBlockStyles();

      states.value.push({
        memoryState: Object.assign({}, memory.value),
        registersState: Object.assign({}, reg.value),
        nextInstruction: `${(
          memory.value[reg.value["pc"] as number] as string[]
        ).join(" ")}`,
        prevInstruction: `${prevInstruction.value}`,
        highLightedRegisters: hsg,
        highLightedMemBlocks: hsm,
      });

      prevInstruction.value = nextInstruction.value;

      let i = reg.value["pc"] as number;

      let instruction =
        instructions[(memory.value[i] as string[])[0] as string];

      if (((memory.value[i] as string[])[0] as string) === "halt") {
        isFinished.value = true;
        states.value[states.value.length - 1].nextInstruction = "halt";
      }
      instruction((memory.value[i] as string[]).slice(1));
      reg.value["timer"] = (reg.value["timer"] as number) - 1;
      if (reg.value["int"] === 1 && reg.value["timer"] === 0) {
        reg.value["sp"] = (reg.value["sp"] as number) + 1;
        memory.value[reg.value["sp"] as number] = reg.value["pc"] as number;
        reg.value["pc"] = reg.value["ivec"];
        reg.value["int"] = 0;
      }
      const stringArr = memory.value[reg.value["pc"] as number] as string[];
      if (stringArr) {
        nextInstruction.value = stringArr.join(" ");
      }
    }
  }
};

const executeAll = () => {
  while (true) {
    executeNext();
    if (isFinished.value) {
      break;
    }
  }
};

const toStart = () => {
  while (true) {
    goBack();
    if (isAtStart.value) {
      break;
    }
  }
};

const goBack = () => {
  if (states.value.length > 0) {
    isFinished.value = false;
    const previousState = states.value.pop() as State;

    resetRegisterStyles();

    reg.value = new Proxy(
      {
        a: previousState.registersState.a,
        b: previousState.registersState.b,
        c: previousState.registersState.c,
        d: previousState.registersState.d,
        e: previousState.registersState.e,
        f: previousState.registersState.f,
        sp: previousState.registersState.sp,
        acc: previousState.registersState.acc,
        pc: previousState.registersState.pc,
        ivec: previousState.registersState.ivec,
        int: previousState.registersState.int,
        timer: previousState.registersState.timer,
        halt: previousState.registersState.halt,
      } as {
        [key: string]: number | boolean;
      } & Reg,
      {
        set: (target, key: string, value) => {
          const register = document.querySelector(
            `.register-${key}`
          ) as HTMLElement;
          register.classList.add("highlighted");
          target[key] = value;
          return true;
        },
      }
    );

    previousState.highLightedRegisters.forEach((reg) => {
      const register = document.querySelector(
        `.register-${reg}`
      ) as HTMLElement;
      register.classList.add("highlighted");
    });
    memory.value = previousState.memoryState;
    nextInstruction.value = previousState.nextInstruction;
    prevInstruction.value = previousState.prevInstruction;
    if (previousState.nextInstruction.startsWith("out")) {
      outputs.value.pop();
    }
    if (states.value.length === 0) {
      isAtStart.value = true;
    }
  }
};

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
          memory.value[Number.parseInt(instruction[0])] = instruction.slice(1);
        }
      }
      nextInstruction.value = (
        memory.value[reg.value["pc"] as number] as string[]
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
    } as {
      [key: string]: number | boolean;
    } & Reg,
    {
      set: (target, key: string, value) => {
        // console.log(`${key} was changed`);
        const register = document.querySelector(
          `.register-${key}`
        ) as HTMLElement;
        register.classList.add("highlighted");
        target[key] = value;
        return true;
      },
    }
  );
  memory.value = new Array(MEM_SIZE).fill(0);
  isFileUploaded.value = false;
  isFinished.value = false;
  isAtStart.value = true;
  states.value = [];
  outputs.value = [];
  nextInstruction.value = "";
  prevInstruction.value = "";
  resetRegisterStyles();
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
      <BackToStart
        @click="toStart"
        :is-disabled="isBackToStartButtonDisabled"
      />
      <PrevExecution @click="goBack" :is-disabled="isPrevButtonDisabled" />
      <NextExecution @click="executeNext" :is-disabled="isNextButtonDisabled" />
      <ExecuteAll @click="executeAll" :is-disabled="isAllButtonDisabled" />
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
      <MemoryContainer :memory="memory" />
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
  max-height: calc(100vh-50px);
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
  height: calc(100vh - 50px);
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
