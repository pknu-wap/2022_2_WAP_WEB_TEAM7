import "./Categories.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function Categories() {
  const [isSelected, select] = useState("Current");

  console.log({ isSelected });
  return (
    <div className="category_container">
      <ol>
        {/* <Link to="/login">
          <li
            className={isSelected === "Current" ? "selected" : ""}
            onClick={() => select("login")}
          >
            login
          </li>
        </Link> */}
        <Link to="/current_order">
          <li
            className={isSelected === "Current" ? "selected" : "categories"}
            onClick={() => {
              select("Current");
            }}
          >
            현재 주문
          </li>
        </Link>
        <Link to="/past_order">
          <li
            className={isSelected === "Past" ? "selected" : "categories"}
            onClick={() => {
              select("Past");
            }}
          >
            지난 주문
          </li>
        </Link>
        <Link to="/menu_modify">
          <li
            className={isSelected === "Modify" ? "selected" : "categories"}
            onClick={() => {
              select("Modify");
            }}
          >
            메뉴 수정
          </li>
        </Link>
      </ol>
    </div>
  );
}

export default Categories;
