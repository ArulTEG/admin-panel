import { type } from "@testing-library/user-event/dist/type";
import { Button, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";

const FinalPopUp = ({ isFinalOpen, setIsFinalOpen, payloadData }) => {
  const excludedKeys = ["label", "value"];

  const [finalPayload, changeFinalPayload] = useState(
    JSON.stringify(excludeKeys(payloadData, excludedKeys)) || ""
  );

  function excludeKeys(obj, excludedKeys) {
    return Object.keys(obj)
      .filter((key) => !excludedKeys.includes(key))
      .reduce((result, key) => {
        result[key] = obj[key];
        return result;
      }, {});
  }

  const handleOk = () => {
    console.log(finalPayload);
    // setIsFinalOpen(false);
  };
  const handleCancel = () => {
    setIsFinalOpen(false);
  };

  return (
    <>
      <Modal
        key={payloadData._id}
        title="Edit JSON"
        open={isFinalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        width={"80vw"}
        style={{
          height: "70%",
        }}
        okText="PATCH"
        okButtonProps={{ danger: true }}
      >
        <div className="flex flex-col w-full h-max">
          <div>{finalPayload}</div>
          <TextArea
            value={finalPayload}
            onChange={(e) => {
              changeFinalPayload(e.target.value);
            }}
            style={{
              height: "50vh",
            }}
          />
        </div>
      </Modal>
    </>
  );
};
export default FinalPopUp;
