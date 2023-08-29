import { type } from "@testing-library/user-event/dist/type";
import { Button, Card, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import FinalPopUp from "./FinalPopUp";
import TextArea from "antd/es/input/TextArea";
import ArrayList from "./ArrayList";
const PopupForm = ({ isOpen, setIsOpen, options, setoptionValue }) => {
  const [isFinalOpen, setIsFinalOpen] = useState(false);
  const [selected, setSelected] = useState("null");
  const [pay, setPay] = useState({});
  const handleOk = () => {
    setPay(options);
    setIsFinalOpen(true);
    // setIsOpen(false);
    // setSelected(null);
  };
  const handleCancel = () => {
    setSelected(null);
    setIsOpen(false);
  };

  function convertObjectToArray(obj) {
    return Object.entries(obj)
      .filter(([key]) => key !== "label" && key !== "value")
      .map(([key, value]) =>
        typeof value === "string"
          ? {
              label: key,
              value: value,
              obj: value,
            }
          : {
              label: key,
              value: JSON.stringify(value),
              obj: value,
            }
      );
  }

  function convertArrayToObject(array) {
    const obj = {};
    for (const item of array) {
      obj[item.label] = item.obj;
    }
    return obj;
  }

  const [addKey, setAddKey] = useState(false);
  const [addK, handleAddKey] = useState("");
  const [addV, handleAddValue] = useState("");
  const handleKeySave = () => {
    setoptionValue((y) => ({
      ...y,
      [addK]: addV,
    }));
    setPay((z) => ({
      ...z,
      [addK]: addV,
    }));
    setAddKey(false);
    handleAddKey("");
    handleAddValue("");
  };

  return (
    <>
      <Modal
        key={options._id}
        title="Edit Parameters"
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        okText="Continue"
        width={"60vw"}
      >
        <div className="flex flex-col gap-4 h-max">
          <div>{JSON.stringify(options)}</div>

          <Select
            virtual={false}
            key={"parameters" + options._id}
            showSearch
            placeholder="Select a Parameter"
            optionFilterProp="children"
            value={selected?.["value"]}
            onChange={(e, c) => {
              setSelected(c);
              // console.log(c);
            }}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={convertObjectToArray(options)}
            style={{
              width: "100%",
            }}
          />
          {selected ? (
            typeof selected.obj === "string" ||
            typeof selected.obj === "number" ? (
              <div className="w-full flex flex-col gap-4">
                <Input
                  disabled={selected.label === "_id" ? true : false}
                  value={selected.value}
                  typeof={typeof selected.value}
                  key={"field" + options._id}
                  onChange={(e) => {
                    setSelected((x) => ({ ...x, value: e.target.value }));
                    setoptionValue((y) => ({
                      ...y,
                      [selected.label]: e.target.value,
                    }));
                    setPay((z) => ({
                      ...z,
                      [selected.label]: e.target.value,
                    }));
                  }}
                />
                {/* <Button>Save</Button> */}
              </div>
            ) : selected.label === "config" ? (
              <div className="w-full flex flex-col gap-4">
                <Input
                  disabled={selected.label === "_id" ? true : false}
                  value={selected.value}
                  key={"field" + options._id}
                  onChange={(e) => {
                    setSelected((x) => ({ ...x, value: e.target.value }));
                    setoptionValue((y) => ({
                      ...y,
                      [selected.label]: e.target.value,
                    }));
                  }}
                />
                {/* <Button>Save</Button> */}
              </div>
            ) : typeof selected.obj === "object" ? (
              <ArrayList
                array={selected.obj}
                setoptionValue={setoptionValue}
                label={selected.label}
              />
            ) : null
          ) : null}

          {addKey ? (
            <div className="w-full flex flex-col h-max gap-2">
              <div className="w-full flex flex-row gap-2">
                <div className="w-[20%]">
                  <Input
                    placeholder="Key"
                    value={addK}
                    onChange={(e) => {
                      handleAddKey(e.target.value);
                    }}
                  />
                </div>
                <div className="w-[80%]">
                  <Input
                    placeholder="Value"
                    value={addV}
                    onChange={(e) => {
                      handleAddValue(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="w-full flex justify-start">
                <Button
                  onClick={() => {
                    handleKeySave();
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div className="w-full justify-start">
              <Button
                onClick={() => {
                  setAddKey(true);
                }}
              >
                Add
              </Button>
            </div>
          )}
        </div>
        {isFinalOpen && (
          <FinalPopUp
            isFinalOpen={isFinalOpen}
            setIsFinalOpen={setIsFinalOpen}
            payloadData={options}
          />
        )}
      </Modal>
    </>
  );
};
export default PopupForm;
