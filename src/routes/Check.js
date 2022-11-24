import React from "react";
import "./Check.css";

function Check(prop){

    function close(e) {
        window.location.href = "/"
      }

    return (
        < div className="goCounter">
            <h1>카운터에서 결제시</h1>
            <h1>주문이 완료됩니다.</h1>
            <div className="orderNumber">
            <h1>주문번호</h1>
            <p>{prop.order_num}</p>
            </div>
            <div id="close_button">
                <button style={{color:"white"}} onClick={close}>닫기</button>
            </div>
        </div>
        
    )
   
}

export default Check;
