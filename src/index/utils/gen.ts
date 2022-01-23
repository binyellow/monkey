/*
 * 最后调整生成console输出相关方法
 * @version: 0.0.1
 * @date: 2022-01-22
 * @copyright Copyright (c) 2020, Tencent
 */
import { formatCharsToTypeScript } from "../utils";
import { trans } from "./request";
import { transData } from "./gen.d";
import { DOMElement, TableHTMLAttributes } from "react";
import { transformInterface2Front } from "./interface";
import { transformTs2MockValue } from "./mock";

// 生成mock
export const genMock = (target: string) => {
  const syntheticRes = "mock res " + " " + target;
  return syntheticRes.replace(/"((?:(?:[^"])|(?:(?<=\\)"))*)": (.*)/g, "$1: $2");
};

export const getInterface = (jsonContent: object, objectName = "RootObject", optionalKeys = []) => {
  return "export interface " + objectName + " " + formatCharsToTypeScript(jsonContent, objectName, optionalKeys);
};

// 生成enum和options
export const genEnumAndOptions = (str: string, secret: string) => {
  console.clear();
  const splitElementArr = ["，", ",", "、", " "];
  const curSplitEle = splitElementArr?.find((r) => str.indexOf(r) >= 0) || splitElementArr[0];
  const splitEnums = str.split(curSplitEle);
  console.log(JSON.stringify(splitEnums));
  let queue: Promise<any>[] = [];
  let syntheticEnum: transData[] = [];
  splitEnums.forEach((row) => {
    const enums = row.split("-");
    const youDaoRes = trans(enums?.[1], secret);
    queue.push(youDaoRes);
    youDaoRes.then((data) => {
      const { translation = [] } = data as any;
      let obj: transData = {};
      obj.en = translation[0];
      obj.value = enums?.[0];
      obj.ch = enums?.[1];
      syntheticEnum.push(obj);
    });
  });
  Promise.all(queue).then(() => {
    console.log(syntheticEnum);
    const enumParams = syntheticEnum.reduce((pre, cur) => {
      const { en, value } = cur;
      return {
        ...pre,
        [en]: value,
      };
    }, {});
    const enumMap = "export enum Enum =" + " " + formatCharsToTypeScript(enumParams, "Enum", [], "enum");
    const options =
      "export const Options =" +
      " " +
      JSON.stringify(
        syntheticEnum.map((r) => ({
          label: r.value,
          value: `Enum.${r.en}`,
        })),
        null,
        "\t"
      ).replaceAll('"', "");
    console.log(enumMap);
    console.log(options);
  });
};

const getMock = (jsonContent, objectName = "RootObject", optionalKeys = []) => {
  return "mock res " + " " + formatCharsToTypeScript(jsonContent, objectName, optionalKeys, "mock");
};

// 解析table，生成ts类型
export const genResultFromTable = (table: DOMElement<TableHTMLAttributes<any>, HTMLTableElement>) => {
  const bodyTrs = table.querySelector("tbody").querySelectorAll("tr");

  let interfaces = {};
  let mock = {};

  bodyTrs.forEach((tr) => {
    const tds = tr.querySelectorAll("td");

    const key = tds[0].textContent;
    const value = tds[1].textContent;

    if (key || value) {
      interfaces[key] = transformInterface2Front(value);

      mock[key] = transformTs2MockValue(value);
    }
  });

  return { interfaces: getInterface(interfaces), mock: getMock(mock) };
};
