import { SingleRegister } from "./../types/reg";
import { ref, Ref, computed } from "vue";
import { Reg } from "../types/reg";

export const reg = ref(
  new Proxy(
    {
      a: { val: 0, justChanged: false },
      b: { val: 0, justChanged: false },
      c: { val: 0, justChanged: false },
      d: { val: 0, justChanged: false },
      e: { val: 0, justChanged: false },
      f: { val: 0, justChanged: false },
      sp: { val: 0, justChanged: false },
      acc: { val: 0, justChanged: false },
      pc: { val: 0, justChanged: false },
      ivec: { val: 0, justChanged: false },
      int: { val: 0, justChanged: false },
      timer: { val: 0, justChanged: false },
      halt: { val: false, justChanged: false },
    } as {
      [key: string]: SingleRegister;
    } & Reg,
    {
      set: (obj, prop: string, value: SingleRegister) => {
        obj[prop] = value;
        return true;
      },
    }
  )
);
