import { ref, Ref, computed } from "vue";
import { Reg } from "../types/reg";
import { State } from "../types/state";
import { memory, MEM_SIZE } from "./memory-store";
import { reg } from "./register-store";
import { outputs } from "./outputs-store";
import { instructions } from "./instructions-store";

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

export const loadFile = (e: Event) => {
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
  previousStates.value = [];
  outputs.value = {
    outputs: [],
  };
  nextInstruction.value = "";
  prevInstruction.value = "";
};
