import { toLowerFirstLetter } from "./utils/string";

export const formatCharsToTypeScript = (
  jsonContent: object,
  objectName = "RootObject",
  optionalKeys: string[] = [],
  type?: "mock" | "interface" | "enum"
) => {
  let result = JSON.stringify(jsonContent, null, "\t");
  if (type !== "mock") {
    result = result.replace(new RegExp('"', "g"), "").replace(new RegExp(",", "g"), "");
  } else {
    result = result.replace(/"((?:(?:[^"])|(?:(?<=\\)"))*)": (.*)/g, "$1: $2");
  }
  let allKeys = Object.keys(jsonContent);
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
