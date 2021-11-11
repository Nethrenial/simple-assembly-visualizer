import { ref, Ref, computed } from "vue";

export const MEM_SIZE = 100;

const m: number[] = new Array(MEM_SIZE).fill(0);

export const memory: Ref<Array<number | string[]>> = ref(
  new Proxy(m, {
    // set: (target, prop, value) => {
    //   // console.log(`${key} was changed`);
    //   const register = document.querySelector(
    //     `.memblock-${prop as string}`
    //   ) as HTMLElement;
    //   register.classList.add("highlighted");
    //   target[prop] = value;
    //   return true;
    // },
  })
);
