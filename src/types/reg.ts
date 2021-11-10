export interface Reg {
  a: SingleRegister;
  b: SingleRegister;
  c: SingleRegister;
  d: SingleRegister;
  e: SingleRegister;
  f: SingleRegister;
  sp: SingleRegister;
  acc: SingleRegister;
  pc: SingleRegister;
  ivec: SingleRegister;
  int: SingleRegister;
  timer: SingleRegister;
  halt: SingleRegister;
}

export interface SingleRegister {
  val: number | boolean;
  justChanged: boolean;
}
