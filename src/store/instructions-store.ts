import { memory } from "./memory-store";
import { reg } from "./register-store";
import { outputs } from "./outputs-store";

export const instructions: { [key: string]: Function } = {
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
