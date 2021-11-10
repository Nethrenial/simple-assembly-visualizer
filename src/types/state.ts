import { Reg } from "./reg";

export interface State {
  memoryState: Array<number | string[]>;
  registersState: Reg & { [key: string]: number | boolean };
  nextInstruction: string;
  prevInstruction: string;
  highLightedRegisters: string[];
}

export type States = State[];
