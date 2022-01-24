import React, { forwardRef, useState, useEffect } from "react";
import { align2Selection } from "../../utils/dom";
import "./index.less";
import { Radio } from 'antd';

const cls = "popover-wrapper";
export enum genTypeEnum {
  interface = 0,
  enums = 1,
}

const ConfigPopover = (props, ref) => {
  const { onSure, genEnum, setGenEnum } = props;

  useEffect(() => {
    ref.current.addEventListener(
      "mouseUp",
      (e) => {
        e.stopPropagation();
      },
      true
    );
  }, []);


  const options = [
    {
      label: 'interface & mock',
      value: genTypeEnum.interface,
    },
    {
      label: 'enum & options',
      value: genTypeEnum.enums,
    }
  ]

  return (
    <div ref={ref} className={cls}>
      <Radio.Group options={options} onChange={e=>setGenEnum(e.target.value)} value={genEnum} />

      <div>
        <button onClick={() => align2Selection({ clientX: -1000, clientY: -1000 }, ref.current)}>取消</button>
        <button style={{ marginLeft: 12 }} onClick={onSure}>
          确定
        </button>
      </div>
    </div>
  );
};

export default forwardRef(ConfigPopover);
