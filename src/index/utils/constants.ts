import { getRandomIntBetween } from "./math";
import { randomString } from "./string";

// wiki 类型映射
export const TypeMap = {
  integer: "number",
  long: "number",
  float: "number",
  string: "string",
};

export interface MockMapProps {
  integer: () => number;
  long: () => number;
  float: () => number;
  string: () => string;
}

export const MockMap: MockMapProps = {
  integer: () => getRandomIntBetween(1, 100),
  long: () => getRandomIntBetween(1, 100),
  float: () => getRandomIntBetween(1, 100),
  string: () => randomString(),
};
