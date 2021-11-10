import { Reg } from "./reg";
import { Memory } from "./memory";

export interface State {
  memoryState: Memory;
  registersState: Reg & { [key: string]: number | boolean };
  nextInstruction: string;
  prevInstruction: string;
}

export interface PrevoiusStates {
  states: Array<State>;
}
