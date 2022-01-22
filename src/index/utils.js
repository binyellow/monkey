import { TypeMap } from "./utils/constants";
import { toLowerFirstLetter } from "./utils/string";
import { getInterface } from "./utils/gen";

export const formatCharsToTypeScript = (jsonContent, objectName = "RootObject", optionalKeys = [], type) => {
  let result = JSON.stringify(jsonContent, null, "\t");
  if (type !== "mock") {
    result = result.replace(new RegExp('"', "g"), "").replace(new RegExp(",", "g"), "");
  } else {
    result = result.replace(/"((?:(?:[^"])|(?:(?<=\\)"))*)": (.*)/g, "$1: $2");
  }
  let allKeys = _.allKeys(jsonContent);
  for (var index = 0, length_3 = allKeys.length; index < length_3; index++) {
    var key = allKeys[index];
    if (optionalKeys.includes(key)) {
      result = result.replace(new RegExp(key + ":", "g"), toLowerFirstLetter(key) + "?:");
    } else {
      result = result.replace(new RegExp(key + ":", "g"), toLowerFirstLetter(key) + ":");
    }
  }
  return result;
};

const getMock = (jsonContent, objectName = "RootObject", optionalKeys = []) => {
  return "mock res " + " " + formatCharsToTypeScript(jsonContent, objectName, optionalKeys, "mock");
};

// 解析table，生成ts类型
export const genResultFromTable = (table) => {
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

// 将文档的类型转成前端类型
export const transformInterface2Front = (type) => {
  const syntheticType = TypeMap[`${type}`.toLowerCase()];
  if (syntheticType) return syntheticType;
  return type;
};
