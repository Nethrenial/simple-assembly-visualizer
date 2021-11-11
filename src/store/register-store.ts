import { ref, Ref, computed } from "vue";
import { Reg } from "../types/reg";

export const reg = ref(
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
  )
);
