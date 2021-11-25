import { API } from "../api";
import { useState, useEffect } from "react";

/* Calculate total amount from Raw Material Logistics */
export const CalculateTotalRawMaterial = (id) => {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    API.rawMaterial.fetchTotalAmount(id).then((res) => {
      setTotal(res[0].total_amount);
    });
  });
  return <div>{total}</div>;
};
