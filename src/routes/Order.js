import React from "react";
import "./Order.css";

function backClick(e) {
    window.location.href = "/menu"
  }
  

function check(e) {
    window.location.href = "/check"
}

function Order(){
    return (
        <div className="finish_order_list">
            <hi>주문 목록</hi>
            <div id="back">
            <button style={{color:"white"}} onClick={backClick}>취소</button>
            </div>
            <div id="finalCheck">
                <button style={{color:"white"}} onClick={check}>확인</button>
            </div>
        </div>
    );
}

export default Order;