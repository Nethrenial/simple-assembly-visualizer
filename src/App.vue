<script setup lang="ts">
import { ref, Ref, computed } from "vue";
import AssemblyFileInput from "./components/AssemblyFileInput.vue";
import ResetVm from "./components/ResetVm.vue";
import RegistersContainer from "./components/RegistersContainer.vue";
import MemoryContainer from "./components/MemoryContainer.vue";
import NextExecution from "./components/NextExecution.vue";
import PrevExecution from "./components/PrevExecution.vue";

import { Reg } from "./types/reg";
import { OutputList } from "./types/output";
import { Memory } from "./types/memory";
import Outputs from "./components/Outputs.vue";
import { State } from "./types/state";

const MEM_SIZE = 100;

let reg = ref(
  new Proxy(
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
    } as { [key: string]: number | boolean } & Reg,
    {
      set: (obj, prop, value) => {
        obj[prop as string] = value;
        return true;
      },
    }
  )
);

// let memory: Array<string[] | number> = new Array(MEM_SIZE).fill(0);
let memory: Ref<Memory> = ref({ store: new Array(MEM_SIZE).fill(0) });

const instructions: { [key: string]: Function } = {
  mov: (opr: [string, string]) => {
    reg.value[opr[0]] = reg.value[opr[1]];
    reg.value["pc"] = (reg.value["pc"] as number) + 1;
  },
  movv: (opr: [string, string]) => {
    reg.value[opr[0]] = Number.parseInt(opr[1]);
    reg.value["pc"] = (reg.value["pc"] as number) + 1;
  },
  load: (opr: [string, string]) => {
    reg.value[opr[0]] = memory.value.store[Number.parseInt(opr[1])] as number;
    reg.value["pc"] = (reg.value["pc"] as number) + 1;
  },
  loadr: (opr: [string, string]) => {
    reg.value[opr[0]] = memory.value.store[
      reg.value[opr[1]] as number
    ] as number;
    reg.value["pc"] = (reg.value["pc"] as number) + 1;
  },
  store: (opr: [string, string]) => {
    memory.value.store[Number.parseInt(opr[0])] = reg.value[opr[1]] as number;
    reg.value["pc"] = (reg.value["pc"] as number) + 1;
  },
  storer: (opr: [string, string]) => {
    memory.value.store[reg.value[opr[0]] as number] = reg.value[
      opr[1]
    ] as number;
    reg.value["pc"] = (reg.value["pc"] as number) + 1;
  },
  add: (opr: [string, string]) => {
    reg.value["acc"] =
      (reg.value[opr[0]] as number) + (reg.value[opr[1]] as number);
    reg.value["pc"] = (reg.value["pc"] as number) + 1;
  },
  sub: (opr: [string, string]) => {
    reg.value["acc"] =
      (reg.value[opr[0]] as number) - (reg.value[opr[1]] as number);
    reg.value["pc"] = (reg.value["pc"] as number) + 1;
  },
  mod: (opr: [string, string]) => {
    reg.value["acc"] =
      (reg.value[opr[0]] as number) % (reg.value[opr[1]] as number);
    reg.value["pc"] = (reg.value["pc"] as number) + 1;
  },
  call: (opr: [string, string]) => {
    reg.value["sp"] = (reg.value["sp"] as number) + 1;
    memory.value.store[reg.value["sp"]] = (reg.value["pc"] as number) + 1;
    reg.value["pc"] = Number.parseInt(opr[0]);
  },
  ret: () => {
    reg.value["pc"] = memory.value.store[reg.value["sp"] as number] as number;
    reg.value["sp"] = (reg.value["sp"] as number) - 1;
  },
  out: (opr: [string, string]) => {
    console.log(reg.value[opr[0]]);
    outputs.value.outputs.push(reg.value[opr[0]] as number);
    reg.value["pc"] = (reg.value["pc"] as number) + 1;
  },
  push: (opr: [string, string]) => {
    reg.value["sp"] = (reg.value["sp"] as number) + 1;
    memory.value.store[reg.value["sp"]] = reg.value[opr[0]] as number;
    reg.value["pc"] = (reg.value["pc"] as number) + 1;
  },
  pop: (opr: [string, string]) => {
    reg.value[opr[0]] = memory.value.store[reg.value["sp"] as number] as number;
    reg.value["sp"] = (reg.value["sp"] as number) - 1;
    reg.value["pc"] = (reg.value["pc"] as number) + 1;
  },
  jmp: (opr: [string]) => {
    reg.value["pc"] = Number.parseInt(opr[0]);
  },
  jnz: (opr: [string, string]) => {
    if (reg.value[opr[1]] !== 0) {
      reg.value["pc"] = Number.parseInt(opr[0]);
    } else {
      reg.value["pc"] = (reg.value["pc"] as number) + 1;
    }
  },
  halt: () => {
    reg.value["halt"] = true;
    reg.value["pc"] = (reg.value["pc"] as number) + 1;
  },
};

const isFileUploaded = ref(false);

const file = ref("");
let reader: FileReader | null = null;
let instructionLines: string[] = [];
let nextInstruction = ref("");
let prevInstruction = ref("");

const previousStates: Ref<Array<State>> = ref([]);

const isFinished = ref(false);
const isAtStart = ref(true);
const isNextButtonDisabled = computed(() => {
  if (isFinished.value || !isFileUploaded.value) {
    return true;
  }
  return false;
});
const isPrevButtonDisabled = computed(() => {
  if (isAtStart.value || !isFileUploaded.value) {
    return true;
  }
  return false;
});

const executeNext = () => {
  if (instructionLines.length === 0 || !reader) {
    console.log("Not any instructions");
  } else {
    if (!reg.value["halt"] && !isFinished.value) {
      isAtStart.value = false;
      console.log(nextInstruction.value);

      previousStates.value.push({
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
        previousStates.value[previousStates.value.length - 1].nextInstruction =
          "halt";
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

const goBack = () => {
  if (previousStates.value.length > 0) {
    isFinished.value = false;
    const previousState = previousStates.value.pop() as State;
    reg.value = previousState.registersState;
    memory.value = previousState.memoryState;
    nextInstruction.value = previousState.nextInstruction;
    prevInstruction.value = previousState.prevInstruction;
    if (previousState.nextInstruction.startsWith("out")) {
      outputs.value.outputs.pop();
    }
    if (previousStates.value.length === 0) {
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

const outputs = ref({ outputs: [] } as OutputList);

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
  previousStates.value = [];
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
