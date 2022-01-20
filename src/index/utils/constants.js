import { randomString, getRandomIntBetween } from "../utils";

// wiki 类型映射
export const TypeMap = {
  integer: "number",
  long: "number",
  float: "number",
  string: "string",
};

export const MockMap = {
  integer: () => getRandomIntBetween(1, 100),
  long: () => getRandomIntBetween(1, 100),
  float: () => getRandomIntBetween(1, 100),
  string: () => randomString(),
};
