import * as bcrypt from "bcrypt";

const saltOrRounds = 10;

export const hash = async (password: string) =>
  await bcrypt.hash(password, saltOrRounds);

export const compare = async (password: string, hash: string) =>
  await bcrypt.compare(password, hash);
