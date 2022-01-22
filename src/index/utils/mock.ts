/*
 * mock相关
 * @version: 0.0.1
 * @date: 2022-01-22
 * @copyright Copyright (c) 2020, Tencent
 */

import { MockMap, MockMapProps } from "./constants";

type mockType = keyof MockMapProps;

// 将type转成随机的类型
export const transformTs2MockValue = (type: mockType) => {
  const syntheticType = MockMap[type.toLowerCase() as mockType];
  if (typeof syntheticType === "function") return syntheticType();
  return null;
};
