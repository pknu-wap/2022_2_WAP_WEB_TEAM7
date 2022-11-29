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
                <span>주문시간</span>
                <span>주문내역</span>
                <span id="price">가격</span>
            </div>
            {list.map((orderList) => (
                <React.Fragment>
                    <div className="all_list">
                        <span>{orderList.order_num}</span>
                        <span>{orderList.create_date}</span>
                        <span>
                            {JSON.parse(`${orderList.menu_list}`).map((menuList) => (
                                <div>{menuList.menu_name}({menuList.order_count})</div>
                                ))}
                        </span>
                        <span>{orderList.all_price}</span>
                    </div>
                </React.Fragment>
            ))}
        </div>
    )
}


export default PastOrder;