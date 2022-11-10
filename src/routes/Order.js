import React from "react";
import Ordertable from "../layout/footer/OrderTable";
import "./Order.css";

function backClick(e){
    window.location.href="/menu"
}

function Order(){
    return(
        <div className = "finish_order_list">
            <h1>주문목록</h1>
            <div id="back">
            <button onClick={backClick}>뒤로가기</button>
            </div>
            
        </div>

    );
}

export default Order;