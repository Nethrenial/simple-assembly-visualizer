// export type Memory = number[] | Array<string[]>;

export interface Memory {
  store: Array<number | string[]>;
}

export interface MemBlock {
  value: number | string[];
}
