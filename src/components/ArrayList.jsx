import React, { useState } from "react";
import { Input, Button } from "antd";
import TextArea from "antd/es/input/TextArea";

const ArrayList = ({ array, setoptionValue, label }) => {
  const [tempArr, setTempArr] = useState([...array]);

  const handleInputChange = (index, value) => {
    // console.log(index, value);
    var updatedArray = [...tempArr];
    updatedArray[index] = value;
    setTempArr(updatedArray);
  };

  const handleAddElement = (index) => {
    const updatedArray = [...tempArr];
    updatedArray.splice(index + 1, 0, "");
    setTempArr(updatedArray);
  };

  const handleDeleteElement = (index) => {
    const updatedArray = [...tempArr];
    updatedArray.splice(index, 1);
    setTempArr(updatedArray);
  };

  const handleSave = () => {
    setoptionValue((y) => ({
      ...y,
      [label]: tempArr,
    }));
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex flex-row gap-2 w-full">
        <div className="flex-grow">
          <TextArea
            rows={3}
            value={JSON.stringify(tempArr)}
            onChange={(e) => {
              setTempArr(JSON.parse(e.target.value));
            }}
          />
        </div>

        <Button
          onClick={() => {
            handleSave();
          }}
        >
          Save
        </Button>
      </div>
      {tempArr.map((item, index) => (
        <div key={index} className="flex flex-row gap-2 w-full">
          <div className="flex-grow">
            <Input
              value={item}
              onChange={(e) => {
                handleInputChange(index, e.target.value);
              }}
            />
          </div>

          <Button
            onClick={() => {
              handleAddElement(index);
            }}
          >
            Add
          </Button>
          <Button
            onClick={() => {
              handleDeleteElement(index);
            }}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ArrayList;
