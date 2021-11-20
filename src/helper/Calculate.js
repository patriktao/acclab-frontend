import { API } from "../api";

/* Calculate total amount from Raw Material Logistics */
export const calculateTotalRawMaterial = async (id) => {
  let total = 0;
  await API.rawMaterial.fetchTotalAmount(id).then((res) => {
    total = res[0].total_amount;
  });
  console.log(total)
  return total;
};
