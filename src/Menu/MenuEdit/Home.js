import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"; // useCookies import

const Login = (props) => {
  const formRef = useRef();
  const [cookies, setCookie] = useCookies(["id"]); // 쿠키 훅
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    axios
      .post("/users/login", {
        // 로그인 요청
        id: formRef.current.id.value,
        password: formRef.current.passWord.value,
      })
      .then((res) => {
        setCookie("id", res.data.token); // 쿠키에 토큰 저장
      });
  };

  return (
    <form ref={formRef} onSubmit={login}>
      <input type="text" name="id" placeholder="id" required />
      <input type="password" name="passWord" placeholder="passWord" required />
      <input type="submit"></input>
    </form>
  );
};

export default Login;
