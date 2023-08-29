import SingleSelect from "./SingleSelect";
import { clientAPI, clientDataAPI, productAPI } from "../services/api";
import { Button } from "antd";
import PopupForm from "./PopupForm";
import { useEffect, useState } from "react";
import PopupForm2 from "./PopupForm2";

function DropDown1({
  level,
  setObj,
  clientId,
  productId,
  dashboardCategoryId,
}) {
  const [state, uState] = useState("const");

  const [options, updateOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOthersOpen, setIsOthersOpen] = useState(false);
  const [optionValue, setoptionValue] = useState({});

  function findObjectById(array, searchId) {
    return array.find((item) => item._id === searchId);
  }

  const convertObjectToOptions = (obj) => {
    return obj.map((i) => ({
      ...i,
      value: i._id,
      label: i[level + "name"],
    }));
  };

  const convertObjectToOptions2 = (obj) => {
    return obj.map((i) => ({
      ...i,
      value: i._id,
      label: i[level + "name"],
      productcategoryIds: i.productcategoryIds.map((item) => item._id),
    }));
  };

  const convertObjectToOptions3 = (obj) => {
    return obj.map((i) => ({
      ...i,
      value: i._id,
      label: i["category" + "name"],
      dashboardIds: i.dashboardIds.map((item) => item._id),
    }));
  };

  const convertObjectToOptions4 = (obj) => {
    return obj.map((i) => ({
      ...i,
      value: i._id,
      label: i[level + "name"],
    }));
  };

  async function populateOptions() {
    if (level === "client") {
      const response = await clientAPI("GET");
      // console.log(response[level + "s"]);
      const opt = await convertObjectToOptions(response["clients"]);
      updateOptions(opt);
    } else if (level === "product") {
      const response = await clientDataAPI("GET", clientId);
      const opt = await convertObjectToOptions2(response["subscriptions"]);
      updateOptions(opt);
    } else if (level === "dashboardCategory") {
      const response = await clientDataAPI("GET", clientId);
      const foundObject = findObjectById(response.subscriptions, productId);
      const opt = await convertObjectToOptions3(
        foundObject["productcategoryIds"]
      );
      updateOptions(opt);
    } else if (level === "dashboard") {
      const response = await clientDataAPI("GET", clientId);
      const foundObject = findObjectById(response.subscriptions, productId);
      const foundObject2 = findObjectById(
        foundObject.productcategoryIds,
        dashboardCategoryId
      );
      const opt = await convertObjectToOptions4(
        foundObject2["dashboardIds"]
      );
      updateOptions(opt);
      console.log(foundObject2["dashboardIds"]);
    }
  }

  useEffect(() => {
    populateOptions();
  }, [state]);

  return (
    <div className="w-full h-max flex flex-col" key={level}>
      <div className="flex flex-col gap-2 w-full h-max">
        <div className="flex flex-row gap-4 w-full">
          <div className="flex-grow">
            <SingleSelect
              options={options}
              setoptionValue={setoptionValue}
              setObj={setObj}
            />
          </div>
          <div>
            <Button
              onClick={() => {
                level === "client" ? setIsOpen(true) : setIsOthersOpen(true);
                // console.log(optionValue);
              }}
              disabled={Object.keys(optionValue).length ? false : true}
            >
              Edit
            </Button>
          </div>
        </div>
      </div>
      <PopupForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        options={optionValue}
        setoptionValue={setoptionValue}
      />
      <PopupForm2
        isOpen={isOthersOpen}
        setIsOpen={setIsOthersOpen}
        options={optionValue}
        setoptionValue={setoptionValue}
      />
    </div>
  );
}

export default DropDown1;
