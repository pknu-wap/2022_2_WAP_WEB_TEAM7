import React from "react";
import "./Footer.css";


function Footer() {
    const total_menu = 0;
    const total_price = 0;
    const orderlist = null;
    
    return (
        <div className="footer_container">
            <div className="order_list">
                {orderlist}
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