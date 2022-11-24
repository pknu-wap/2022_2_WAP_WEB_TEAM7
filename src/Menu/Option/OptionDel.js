import axios from "axios";

export const OptionDel = async (optionName, optionList) => {
  await axios
    .post("http://127.0.0.1:8000/webKiosk/client/option/delete/", {
      market_name: "S",
      option_name: `${optionName}`,
      option_list: `${optionList}`,
    })
    .then((response) => {
      console.log(response);
    });
  window.location.reload();
};
