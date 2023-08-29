import { useEffect, useState } from "react";
import DropDown1 from "./components/DropDown1";
import "./app.css"

function App() {
  const [client, setClient] = useState(null);
  const [product, setProduct] = useState(null)
  const [dashboardCategory, setDashboardCategory] = useState(null)

  return (
    <div className="w-screen h-screen flex p-16 flex-col gap-6">
      <div className="h-max w-full flex flex-col gap-2">
        <div>Clients</div>
        <DropDown1 level="client" setObj={setClient} />
      </div>
      {client?._id && (
        <div className="h-max w-full flex flex-col gap-2">
          <div>{client["clientname"] + " > Product Category"}</div>
          <DropDown1 level="product" setObj={setProduct} clientId={client._id}/>
        </div>
      )}
      {product?._id && (
        <div className="h-max w-full flex flex-col gap-2">
          <div>{product["productname"] + " > Dashboard Category"}</div>
          <DropDown1 level="dashboardCategory" setObj={setDashboardCategory} clientId={client._id} productId={product?._id}/>
        </div>
      )}
      {dashboardCategory?._id && (
        <div className="h-max w-full flex flex-col gap-2">
          <div>{dashboardCategory["categoryname"] + " > Dashboard"}</div>
          <DropDown1 level="dashboard" setObj={(c)=>{}} clientId={client._id} productId={product?._id} dashboardCategoryId={dashboardCategory?._id}/>
        </div>
      )}
    </div>
  );
}

export default App;
