import MenuTap from "./MenuTap";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
// const cookies = new Cookies();
// export const setCookie = () => {
//   return cookies.set(name, value, { ...options });
// };
// export const getCookie = () => {
//   return cookies.get(name);
// };
axios.defaults.withCredentials = true;
function Menu() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["default"]);

  //make a request for a user with a given IDnpm
  const test = async () =>
    await axios
      .post(
        "http://127.0.0.1:8000/webKiosk/account/login/",
        {
          userid: "S",
          password: "S",
          market_name: "S",
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

  useEffect(() => {
    test();
  }, []);

  return (
    <>
      <MenuTap />
    </>
  );
}
export default Menu;
