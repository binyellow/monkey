import React, { useState, useEffect, useRef } from "react";
import json2ts from "json2ts";
import ConfigPopover from "./components/ConfigPopover/index";
import { align2Selection, getClosestTable } from "./utils/dom";
import { genEnumAndOptions, genMock, genResultFromTable } from "./utils/gen";

const app = () => {
  const [genEnum, setGenEnum] = useState(true);
  const ref = useRef(null);

  const [selectedText, setSelectedText] = useState("");
  const [secret, setSecret] = useState("");

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
      align2Selection(e, ref.current);
      setSelectedText(text);
    }
  };

  const handleSure = () => {
    try {
      const res = json2ts.convert(selectedText);
      console.log([res, genMock(selectedText)].join("\n\n"));
    } catch (error) {
      console.log("error");

      if (genEnum) {
        console.log(genEnumAndOptions(selectedText, secret));
        return;
      }

      const table = getClosestTable(window.getSelection().anchorNode);

      const { interfaces, mock } = genResultFromTable(table);
      console.log([interfaces, mock].join("\n\n"));
    }
  };

  return (
    <>
      <div className="popover">
        <ConfigPopover
          ref={ref}
          onSure={handleSure}
          genEnum={genEnum}
          setGenEnum={setGenEnum}
          secret={secret}
          setSecret={setSecret}
        />
      </div>
    </>
  );
};

export default app;
