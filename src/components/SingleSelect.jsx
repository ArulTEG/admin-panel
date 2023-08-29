import { Select } from "antd";
import React from "react";

const SingleSelect = ({ options, setoptionValue, setObj }) => (
  <Select

    key="client"
    showSearch
    placeholder="Select an Option"
    optionFilterProp="children"
    virtual={false}
    onSelect={(e, c) => {
      setoptionValue(c);
      // console.log("arul",c)
      setObj(c);
    }}
    filterOption={(input, option) =>
      (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
    }
    options={options}
    style={{
      width: "100%",
    }}
  />
);
export default SingleSelect;
