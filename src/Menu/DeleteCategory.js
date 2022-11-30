import axios from "axios";

export const DelCategory = async (event) => {
  console.log("event.target.name", event.target.value);
  await axios
    .post("http://127.0.0.1:8000/webKiosk/client/category/delete/", {
      market_name: "S",
      category_name: `${event.target.value}`,
    })
    .then((response) => {
      console.log(response);
    });
  window.location.reload();
};
