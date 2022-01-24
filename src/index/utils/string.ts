/*
 * 字符操作相关
 * @version: 0.0.1
 * @date: 2022-01-22
 * @copyright Copyright (c) 2020, Tencent
 */

// 首字母小写
export const toLowerFirstLetter = (text: string) => {
  return text.charAt(0)?.toLowerCase() + text.slice(1);
};

export function randomString(e = 32) {
  var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n;
}
