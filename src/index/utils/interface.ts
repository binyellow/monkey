/*
 * interface相关
 * @version: 0.0.1
 * @date: 2022-01-23
 * @copyright Copyright (c) 2020, Tencent
 */

import { MockMapProps, TypeMap } from "./constants";

// 将文档的类型转成前端类型
export const transformInterface2Front = (type: keyof MockMapProps) => {
  const syntheticType = TypeMap[`${type}`.toLowerCase() as keyof MockMapProps];
  if (syntheticType) return syntheticType;
  return type;
};
