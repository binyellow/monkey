/*
 * 最后调整生成console输出相关方法
 * @version: 0.0.1
 * @date: 2022-01-22
 * @copyright Copyright (c) 2020, Tencent
 */
import { formatCharsToTypeScript } from "../utils";
import { trans } from "./request";

// 生成mock
export const genMock = (target: string) => {
  const syntheticRes = "mock res " + " " + target;
  return syntheticRes.replace(/"((?:(?:[^"])|(?:(?<=\\)"))*)": (.*)/g, "$1: $2");
};

export const getInterface = (jsonContent: object, objectName = "RootObject", optionalKeys = []) => {
  return "export interface " + objectName + " " + formatCharsToTypeScript(jsonContent, objectName, optionalKeys);
};

// 生成enum和options
export const genEnumAndOptions = (str: string) => {
  console.clear();
  const splitElementArr = ["，", ",", "、", " "];
  const curSplitEle = splitElementArr?.find((r) => str.indexOf(r) >= 0) || splitElementArr[0];
  const splitEnums = str.split(curSplitEle);
  console.log(JSON.stringify(splitEnums));
  splitEnums.forEach((row) => {
    const enums = row.split("-");
    trans(enums?.[1]);
  });
  trans();
};
