import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"; // useCookies import
import Modal from "react-bootstrap/Modal";
import bcrypt from "bcryptjs";
import { Check } from "../CheckValue";

const bcryptjs = require("bcryptjs");
const handleSubmit = (e) => {
  e.preventDefault();
  axios
    .post("http://127.0.0.1:8000/webKiosk/account/signup/", {
      userid: e.target.id.value,
      password: e.target.passWord.value,
      market_name: e.target.market_name.value,
    })
    .then((res) => {
      if (res.data.includes("already exists")) {
        alert("이미 존재하는 값을 입력하셨습니다.");
      } else if (res.includes("*")) {
        alert("비밀번호에 !@#$%^&*은 하나 이상 입력되어야 합니다.");
      }
    });
};
const Login = (props) => {
  const formRef = useRef();
  const [cookies, setCookie, removeCookie] = useCookies(["id"]); // 쿠키 훅
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    let test = await bcryptjs.hash(formRef.current.passWord.value, 10);

    await axios
      .post("http://127.0.0.1:8000/webKiosk/account/login/", {
        // 로그인 요청
        userid: formRef.current.id.value,
        password: formRef.current.passWord.value,
        market_name: formRef.current.market_name.value,
      })
      .then((res) => {
        setCookie("id", res.data.session_id); // 쿠키에 토큰 저장
        console.log("res", res.data);
      });
  };

  if (cookies.id) {
    const logout = () => {
      removeCookie("id");
    };
    return (
      <div>
        <h2>마이페이지</h2>
        <button onClick={() => logout()}> 로그아웃</button>
      </div>
    );
  } else {
    return (
      <>
        <form ref={formRef} onSubmit={login}>
          <input
            type="text"
            name="id"
            placeholder="id"
            required
            onChange={(e) => {
              Check(e);
            }}
          />
          <input
            type="password"
            name="passWord"
            placeholder="passWord"
            required
          />
          <input
            type="text"
            name="market_name"
            placeholder="market_name"
            required
          />
          <input type="submit"></input>
        </form>
        <button onClick={() => setShow(true)}>회원가입</button>
        <Modal show={show}>
          <div>
            <h1>회원가입</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
              <input type="text" name="id" placeholder="id" required />
              <input
                type="password"
                name="passWord"
                placeholder="passWord"
                required
              />
              <input
                type="text"
                name="market_name"
                placeholder="market_name"
                required
              />

              <input type="submit"></input>
            </form>
            <button onClick={() => setShow(false)}>닫기</button>
          </div>
        </Modal>
      </>
    );
  }
};

export default Login;
