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
  const [cookies, setCookie, removeCookie] = useCookies(["id"]);
  if (!cookies.id) {
    return;
    alert("로그인이 필요합니다.");
    window.location.href = "/login";
  } else {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <MenuTap />
      </div>
    );
  }
}
export default Menu;
