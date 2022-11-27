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
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <MenuTap />
    </div>
  );
}
export default Menu;
