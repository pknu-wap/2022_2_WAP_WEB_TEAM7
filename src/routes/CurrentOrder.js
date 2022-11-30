import React, { useState, useEffect } from "react";
import "./CurrentOrder.css"
import axios from 'axios';
import Modal from 'react-modal'
import MoreInformation from "../component/MoreInformation";
import Accept from "../component/Accept";

function CurrentOrder() {

    // 주문 목록
    const [list, setList] = useState([])

    // 상세 보기 모달 전달 목록
    const [mList, setMList] = useState([])
    
    // 상세 보기 모달 열고 닫기 변수
    const [isOpen, setIsOpen] = useState(false);
    
    // 주문 접수 / 수령 완료 모달 전달 목록
    const [mList2, setMList2] = useState([])
    
    // 주문 접수 / 수령 완료 모달 열고 닫기 변수
    const [isOpen2, setIsOpen2] = useState(false);

    // 주문 목록 불러오기
    async function GetList() {
        const url="http://127.0.0.1:8000/webKiosk/client/order/read/new/"
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

useEffect(()=>{GetList()},[])

// console.log(list)

    return (
        <div className="order_list_container">
            {list.map((orderList) => (
                <React.Fragment>
                    <div className="menu_list_container">
                        <div className={orderList.is_accepted ? "accept" : "waiting"}>
                            <span className="reception_state">{orderList.is_accepted ? "접수 완료" : "접수 대기"}</span>
                        </div>
                        <div className="information">
                            <div className="order_num">
                                {orderList.order_num}
                            </div>
                            <div className="detail">
                                <div className="is_take_out">
                                    {orderList.take_out ? "테이크아웃" : "매장내식사"}
                                </div>
                                <div className="table_num">
                                    테이블 번호 {orderList.table_num}
                                </div>
                            </div>
                            <button className="more_information" onClick={()=>{setIsOpen(true); setMList(orderList);}}>상세<br/>보기</button>
                        </div>
                        <div className="menu_list">
                            {JSON.parse(`${orderList.menu_list}`).map((menuList) => (
                                <div>{menuList.menu_name}({menuList.order_count})</div>
                            ))}
                        </div>
                        <div className={orderList.is_accepted ? "done_button" : "accept_button"}>
                            <button onClick={()=>{setIsOpen2(true); setMList2(orderList);}}>{orderList.is_accepted ? "수령완료" : "주문접수하기"}</button>
                        </div>
                    </div>
                </React.Fragment>
            ))}
            <Modal isOpen={isOpen} onRequestClose={()=>setIsOpen(true)}>
                <MoreInformation menuLists={mList} setwindow={setIsOpen}/>
            </Modal>
            <Modal isOpen={isOpen2} onRequestClose={()=>setIsOpen2(true)}>
                <Accept menuLists={mList2}/>
            </Modal>
        </div>
    )
}

export default CurrentOrder;