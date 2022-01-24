import React, { useState, useEffect, useRef } from "react";
import json2ts from "json2ts";
import ConfigPopover, { genTypeEnum } from "./components/ConfigPopover/index";
import { align2Selection, getClosestTable } from "./utils/dom";
import { genEnumAndOptions, genMock, genResultFromTable } from "./utils/gen";

const app = () => {
  const [genEnum, setGenEnum] = useState(genTypeEnum.interface);
  const ref = useRef(null);

  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    document.addEventListener("mouseup", mouseUp, true);
  }, []);

  const mouseUp = (e) => {
    var text = "";
    if (window.getSelection) {
      text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
      text = document.selection.createRange().text;
    }
    if ("" != text) {
      console.clear();
      if (!["checkbox", "submit", "radio"].includes(e.target.type)) align2Selection(e, ref.current);
      setSelectedText(text);
    }
  };

  const handleSure = () => {
    if (genEnum === genTypeEnum.enums) {
      console.log(genEnumAndOptions(selectedText));
    } else {
      try {
        const res = json2ts.convert(selectedText);
        console.log([res, genMock(selectedText)].join("\n\n"));
      } catch (error) {
        console.log("not JSON object, judge table===>");

        const table = getClosestTable(window.getSelection().anchorNode);

        const { interfaces, mock } = genResultFromTable(table);
        console.log([interfaces, mock].join("\n\n"));
      }
    }
  };

  return (
    <>
      <div className="popover">
        <ConfigPopover ref={ref} onSure={handleSure} genEnum={genEnum} setGenEnum={setGenEnum} />
      </div>
    </>
  );
};

export default app;
