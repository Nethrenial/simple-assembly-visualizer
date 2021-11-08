import { Reg } from "./reg";
import { Memory } from "./memory";

export interface State {
  memoryState: Memory;
  registersState: Reg & { [key: string]: number | boolean };
}
