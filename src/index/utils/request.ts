/*
 * 网络请求相关
 * @version: 0.0.1
 * @date: 2022-01-22
 * @copyright Copyright (c) 2020, Tencent
 */

import CryptoJS from "crypto-js";
import jquery from "jquery";

export const trans = (query = 'hello, world!') => {
  var appKey = "3d29f9da7fb013f8";
  var key = import.meta.env.VITE_SECRET; //注意：暴露appSecret，有被盗用造成损失的风险
  var salt = new Date().getTime();
  var curtime = Math.round(new Date().getTime() / 1000);
  // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
  var from = "zh-CHS";
  var to = "en";
  var str1 = appKey + truncate(query) + salt + curtime + key;
  var vocabId = "您的用户词表ID";

  var sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);
  // unsafeWindow.GM_xmlhttpRequest
  return new Promise((resolve, reject)=> {
    jquery.ajax({
      url: "https://openapi.youdao.com/api",
      type: "post",
      dataType: "jsonp",
      data: {
        q: query,
        appKey: appKey,
        salt: salt,
        from: from,
        to: to,
        sign: sign,
        signType: "v3",
        curtime: curtime,
        vocabId: vocabId,
      },
      success: function (data: any) {
        resolve(data)
      },
    });
  })

  function truncate(q: string) {
    var len = q.length;
    if (len <= 20) return q;
    return q.substring(0, 10) + len + q.substring(len - 10, len);
  }
};
