import { message } from "antd";
import axios from "axios";

export const fetchLocations = async () => {
  try {
    const res = await axios.get("/stored_locations/all");
    const locationArray = [];
    res.data.forEach((item) => {
      locationArray.push({
        value: item.location,
        name: item.location,
      });
    });
    return locationArray.sort((a, b) => a.name.localeCompare(b.name));
  } catch (err) {
    if (err.response) {
      console.log(`Error: ${err.message}`);
      return [];
    }
  }
};

export const addLocation = async (location) => {
  await axios
    .post("/stored_locations/add", { location: location })
    .catch((err) => {
      if (err.response) {
        console.log(`Error: ${err.message}`);
        message.warning(location + " could not be added.");
      }
    });
  message.success(location + " has been added.");
};

export const updateLocation = async (location, new_location) => {
  await axios
    .put("/stored_locations/put", {
      location: location,
      new_location: new_location,
    })
    .catch((err) => {
      if (err.response) {
        console.log(`Error: ${err.message}`);
      }
      message.warning(location + " could not be updated.");
    });
  message.success(location + " has been changed to " + new_location);
};

export const deleteLocation = async (location) => {
  await axios
    .delete("/stored_locations/delete", { data: { location: location } })
    .catch((err) => {
      if (err.response) {
        console.log(`Error: ${err.message}`);
        message.warning(location + " could not be removed.");
      }
    });
  message.success(location + " has been succesfully removed.");
};
