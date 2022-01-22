/*
 * dom操作相关
 * @version: 0.0.1
 * @date: 2022-01-22
 * @copyright Copyright (c) 2020, Tencent
 */

import { alignPoint } from "dom-align";

// align dom to {x, y}, 对齐方式是target位于{x, y} [top, left]
export const align2Selection = (e: MouseEvent, dom = document) => {
  const { clientX, clientY } = e;

  alignPoint(dom, { clientX, clientY }, { points: ["tl"] });
};

// getClosestTable 获取最近的tableParent
export const getClosestTable = (element: Node | null) => {
  let parent: Node | null | undefined = element;
  do {
    // 元素节点 && table
    if (parent?.nodeType === 1 && parent?.nodeName === "TABLE") {
      return parent;
    } else {
      parent = parent?.parentNode;
    }
    // 元素节点 && !document
  } while (parent && parent.nodeType === 1 && parent.nodeType !== 9);
  return parent;
};
