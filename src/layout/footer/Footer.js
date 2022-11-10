import React from "react";
import "./Footer.css";
import Ordertable from "./OrderTable";

function Footer(order) {
    const Order=order["order"];
    //전체 취소 버튼 클릭시 주문 목록 초기화
    function clearAll(){
        order.showorder([])
    }
    
    //주문 버튼 클릭 시 다음 페이지로 이동
    function orderClick(e) {
        
        window.location.href = "/order"
    }

    //빼기 버튼 클릭시 주문 목록에서 해당 메뉴 삭제
    function editOrder(id){
        const ID=Number(id)
        Order.splice(ID,1)
        order.showorder([...Order])
    }
    //최종 가격과 최종 메뉴 갯수 계산
    let total_price = 0;

    const total_menu = Object.keys(order["order"]).length;
    Object.keys(order["order"]).map((key) => {
        total_price += order["order"][key].total_price;
    });

    // 주문 목록에 담을 State 배열을 Order변수에 저장
    //
    return (
        <div className="footer_container">
            <div className="order_list">
                <Ordertable order={Order} editOrder={editOrder}></Ordertable>
            </div>
            <div className="order">
                <div className="grid">
                    <span>주문 수량</span>
                    <span>{total_menu}</span>
                    <span>주문 금액</span>
                    <span>{total_price}</span>
                </div>
                <button id="cancel_button" onClick={clearAll}>전체 취소</button>
                <button id="order_button" onClick={orderClick}>주문</button>
            </div>
        </div>
    )
    
}

export default Footer