import { alignPoint } from "dom-align";
import { TypeMap, MockMap } from "./utils/constants";

// 生成mock
export const genMock = (target) => {
  const syntheticRes = "mock res " + " " + target;
  return syntheticRes.replace(/"((?:(?:[^"])|(?:(?<=\\)"))*)": (.*)/g, "$1: $2");
};

// popover align to selector
export const align2Selection = (e, dom = document) => {
  const { clientX, clientY } = e;

  alignPoint(dom, { clientX, clientY }, { points: ["tl"] });
};

// getClosestTable 获取最近的tableParent
export const getClosestTable = (element) => {
  let parent = element;
  do {
    // 元素节点 && table
    if (parent.nodeType === 1 && parent.nodeName === "TABLE") {
      return parent;
    } else {
      parent = parent.parentNode;
    }
    // 元素节点 && !document
  } while (parent && parent.nodeType === 1 && parent.nodeType !== 9);
  return parent;
};
const toLowerFirstLetter = (text) => {
  return text.charAt(0).toLowerCase() + text.slice(1);
};

const formatCharsToTypeScript = (jsonContent, objectName = "RootObject", optionalKeys = [], type) => {
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

const getInterface = (jsonContent, objectName = "RootObject", optionalKeys = []) => {
  return (
    "export interface " +
    objectName +
    " " +
    formatCharsToTypeScript(jsonContent, (objectName = "RootObject"), (optionalKeys = []))
  );
};

const getMock = (jsonContent, objectName = "RootObject", optionalKeys = []) => {
  return (
    "mock res " + " " + formatCharsToTypeScript(jsonContent, (objectName = "RootObject"), (optionalKeys = []), "mock")
  );
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

// 将type转成随机的类型
export const transformTs2MockValue = (type) => {
  const syntheticType = MockMap[`${type}`.toLowerCase()];
  if (typeof syntheticType === "function") return syntheticType();
  return null;
};

export function getRandomIntBetween(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomString(e) {
  e = e || 32;
  var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n;
}

// 生成enum和options
export const genEnumAndOptions = (str) => {
  const  splitElementArr = ['，', ',', '、', ' '];
  const curSplitEle = splitElementArr?.find(r=> str.indexOf(r) >= 0);
};
