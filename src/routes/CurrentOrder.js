import React, { useState, useEffect } from "react";
import "./CurrentOrder.css";
import axios from "axios";

function CurrentOrder() {
  // 주문 목록
  const [list, setList] = useState([]);

  // 주문 목록 불러오기
  async function GetList() {
    const url = "http://127.0.0.1:8000/webKiosk/client/order/read/new/";
    try {
      const response = await axios.post(url, {
        market_name: "S",
      });
      setList(response.data);
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    GetList();
  }, []);

  console.log("list", list);

  return (
    <div className="order_list_container">
      {list.map((orderList) => (
        <React.Fragment>
          <div className="menu_list_container">
            <div className="table_num">테이블 번호 {orderList.table_num}</div>
            <div className="order_num">주문 번호 {orderList.order_num}</div>
            <div className="menu_list">
              {JSON.parse(`${orderList.menu_list}`).map((menuList) => (
                <div>{menuList.menu_name}</div>
              ))}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default CurrentOrder;
