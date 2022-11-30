import React, {useState, useEffect} from "react";
import "./PastOrder.css"
import axios from "axios";

function PastOrder() {

    // 주문 목록
    const [list, setList] = useState([])

    // 주문 목록 불러오기
    async function GetAllList() {
        const url="http://127.0.0.1:8000/webKiosk/client/order/read/all/"
        try {
        const response=await axios.post(url, {
            market_name: "S"
        });
        setList(response.data)
        return response.data
    } catch(e) {
        console.error(e)
    }
}

useEffect(()=>{GetAllList()},[])


    return (
        <div className="all_list_container">
            <div className="all_list_header">
                <span>주문번호</span>
                <span>주문상태</span>
                <span>주문시간</span>
                <span>주문내역</span>
                <span id="price">가격</span>
            </div>
            {list.map((orderList) => (
                <React.Fragment>
                    <div className="all_list">
                        <div>{orderList.order_num}</div>
                        <div>{orderList.is_new && !orderList.is_accepted ? "접수대기" : orderList.is_accepted && ! orderList.is_new ? "완료" : orderList.is_accepted ? "조리중" : "주문취소"}</div>
                        <div>{orderList.create_date}</div>
                        <div>
                            {JSON.parse(`${orderList.menu_list}`).map((menuList) => (
                                <span>{menuList.menu_name}({menuList.order_count})</span>
                                ))}
                        </div>
                        <div>{orderList.all_price}원</div>
                    </div>
                </React.Fragment>
            ))}
        </div>
    )
}


export default PastOrder;