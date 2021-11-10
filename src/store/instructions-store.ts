import { SingleRegister } from "./../types/reg";
import { memory } from "./memory-store";
import { reg } from "./register-store";
import { outputs } from "./outputs-store";

export const instructions: { [key: string]: Function } = {
  mov: (opr: [string, string]) => {
    reg.value[opr[0]] = {
      val: reg.value[opr[1]].val,
      justChanged: reg.value[opr[1]].justChanged,
    };
    reg.value["pc"] = {
      val: (reg.value["pc"].val as number) + 1,
      justChanged: true,
    };
  },
  movv: (opr: [string, string]) => {
    //   reg.value[opr[0]] = Number.parseInt(opr[1]);
    reg.value[opr[0]] = { val: Number.parseInt(opr[1]), justChanged: true };
    reg.value["pc"] = {
      val: (reg.value["pc"].val as number) + 1,
      justChanged: true,
    };
  },
  load: (opr: [string, string]) => {
    reg.value[opr[0]] = {
      val: memory.value.store[Number.parseInt(opr[1])] as number,
      justChanged: true,
    };
    reg.value["pc"] = {
      val: (reg.value["pc"].val as number) + 1,
      justChanged: true,
    };
  },
  loadr: (opr: [string, string]) => {
    reg.value[opr[0]] = {
      val: memory.value.store[reg.value[opr[1]].val as number] as number,
      justChanged: true,
    };
    reg.value["pc"] = {
      val: (reg.value["pc"].val as number) + 1,
      justChanged: true,
    };
  },
  store: (opr: [string, string]) => {
    memory.value.store[Number.parseInt(opr[0])] = reg.value[opr[1]]
      .val as number;
    reg.value["pc"] = {
      val: (reg.value["pc"].val as number) + 1,
      justChanged: true,
    };
  },
  storer: (opr: [string, string]) => {
    memory.value.store[reg.value[opr[0]].val as number] = reg.value[opr[1]]
      .val as number;
    reg.value["pc"] = {
      val: (reg.value["pc"].val as number) + 1,
      justChanged: true,
    };
  },
  add: (opr: [string, string]) => {
    reg.value["acc"] = {
      val:
        (reg.value[opr[0]].val as number) + (reg.value[opr[1]].val as number),
      justChanged: true,
    };
    reg.value["pc"] = {
      val: (reg.value["pc"].val as number) + 1,
      justChanged: true,
    };
  },
  sub: (opr: [string, string]) => {
    reg.value["acc"] = {
      val:
        (reg.value[opr[0]].val as number) - (reg.value[opr[1]].val as number),
      justChanged: true,
    };
    reg.value["pc"] = {
      val: (reg.value["pc"].val as number) + 1,
      justChanged: true,
    };
  },
  mod: (opr: [string, string]) => {
    reg.value["acc"] = {
      val:
        (reg.value[opr[0]].val as number) % (reg.value[opr[1]].val as number),
      justChanged: true,
    };
    reg.value["pc"] = {
      val: (reg.value["pc"].val as number) + 1,
      justChanged: true,
    };
  },
  call: (opr: [string, string]) => {
    reg.value["sp"] = {
      val: (reg.value["sp"].val as number) + 1,
      justChanged: true,
    };

    memory.value.store[reg.value["sp"].val as number] =
      (reg.value["pc"].val as number) + 1;
    reg.value["pc"] = { val: Number.parseInt(opr[0]), justChanged: true };
  },
  ret: () => {
    reg.value["pc"] = {
      val: memory.value.store[reg.value["sp"].val as number] as number,
      justChanged: true,
    };
    reg.value["sp"] = {
      val: (reg.value["sp"].val as number) - 1,
      justChanged: true,
    };
  },
  out: (opr: [string, string]) => {
    console.log(reg.value[opr[0]]);
    outputs.value.outputs.push(reg.value[opr[0]].val as number);
    reg.value["pc"] = {
      val: (reg.value["pc"].val as number) + 1,
      justChanged: true,
    };
  },
  push: (opr: [string, string]) => {
    reg.value["sp"] = {
      val: (reg.value["sp"].val as number) + 1,
      justChanged: true,
    };

    memory.value.store[reg.value["sp"].val as number] = reg.value[opr[0]]
      .val as number;
    reg.value["pc"] = {
      val: (reg.value["pc"].val as number) + 1,
      justChanged: true,
    };
  },
  pop: (opr: [string, string]) => {
    reg.value[opr[0]] = {
      val: memory.value.store[reg.value["sp"].val as number] as number,
      justChanged: true,
    };
    reg.value["sp"] = {
      val: (reg.value["sp"].val as number) - 1,
      justChanged: true,
    };

    reg.value["pc"] = {
      val: (reg.value["pc"].val as number) + 1,
      justChanged: true,
    };
  },
  jmp: (opr: [string]) => {
    reg.value["pc"] = { val: Number.parseInt(opr[0]), justChanged: true };
  },
  jnz: (opr: [string, string]) => {
    if (reg.value[opr[1]].val !== 0) {
      reg.value["pc"] = { val: Number.parseInt(opr[0]), justChanged: true };
    } else {
      reg.value["pc"] = {
        val: (reg.value["pc"].val as number) + 1,
        justChanged: true,
      };
    }
  },
  halt: () => {
    reg.value["halt"] = { val: true, justChanged: true };
    reg.value["pc"] = {
      val: (reg.value["pc"].val as number) + 1,
      justChanged: true,
    };
  },
};
