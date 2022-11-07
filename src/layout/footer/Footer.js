import React from "react";
import "./Footer.css";
import Ordertable from "./OrderTable";

function Footer({order,showorder}) {

    //최종 가격과 최종 메뉴 갯수 계산
    let total_price = 0;
    Object.keys(order["order"]).map((key) => {
        total_price += order["order"][key].total_price;
    });
    const total_menu = Object.keys(order["order"]).length;
    //
    // 주문 목록에 담을 State 배열을 Order변수에 저장
    const Order=order["order"];
    //
    return (
        <div className="footer_container">
            <div className="order_list">
                <Ordertable order={Order} set_order_list={showorder}></Ordertable>
            </div>
            <div className="order">
                <div className="grid">
                    <span>주문 수량</span>
                    <span>{total_menu}</span>
                    <span>주문 금액</span>
                    <span>{total_price}</span>
                </div>
                <button id="cancel_button">전체 취소</button>
                <button id="order_button">주문</button>
            </div>
        </div>
    )
}

export default Footer