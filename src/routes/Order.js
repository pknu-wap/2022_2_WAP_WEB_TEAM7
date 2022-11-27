import React, {useEffect, useState} from "react";
import "./Order.css";
import Ordertable from "../components/OrderTable";
import Menu from "./Menu";
import Modal from 'react-modal';
import Check from './Check';
import axios from 'axios'


function Order({setorder, final_order}){
    
    
    // 확인창 추가 모달 창 열고 닫기 관연 변수 State
    const [check_moderIsOpen, checkModalIsOpen] = useState(false);
    const [result , setResult] = useState({})

    async function call_api(){
        console.log(final_order);
        console.log(total_price);
        console.log(date);
       
        try{
            const data= await axios.post("http://127.0.0.1:8000/webKiosk/client/order/create/",
            {
                menu_list: JSON.stringify(final_order),
                market_name: "S",
                all_price : total_price,
                create_date : date,
                take_out : false
            })

            setResult(data.data)
            console.log(data.data.menu_list)
        }catch(e){
            console.log(e)
        }
    }
    // 현재 연도/월/일T시간/분/초 구하기
    let today = new Date()

    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜
    let hours = today.getHours(); // 시
    let minutes = today.getMinutes();  // 분
    let seconds = today.getSeconds();  // 초

    date = year + '-' + month + '-' + date + 'T' + hours + ':' + minutes + ':' + seconds
    
    // 주문 총액 구하기
    let total_price = 0;
    const total_menu = Object.keys(final_order).length;
    Object.keys(final_order).map((key) => {
        total_price += final_order[key].total_price;
    });

            
     function check(e) {
        call_api();
        checkModalIsOpen(true);     
     }

    return (
        <div className="finish_order_list">
            <hi>주문 목록</hi>
            <div className="orderTableContainer">
            <table className="orderTable">
                <thead>
                    <tr id="tri">
                        <th className="col">#</th>
                        <th className="col">이름</th>
                        <th className="col">수량</th>
                        <th className="col">가격</th>
                    </tr>
                </thead>
                <tbody>
                {Object.keys(final_order).map((key)=>{
                             return (<tr id={key}>
                                <th>{key}</th>
                                  <td>{final_order[key].menu_name}</td>
                                  <td>{final_order[key].order_count}</td>
                                  <td>{final_order[key].total_price}</td>
                             </tr>
                             ) 
                         })}
                </tbody>
            </table>
            </div> 
            <div className="finalOrder_grid">
              <span>주문 건수</span>
              <span>{total_menu}</span>
              <span>주문 금액</span>
              <span>{total_price}</span>
            </div>     
            <div id="back">
            <button style={{color:"white"}} onClick={()=> setorder(false)}>취소</button>
            </div>
            <div id="finalCheck">
                <button style={{color:"white"}} onClick={check}>확인</button>
            </div>
            <Modal isOpen={check_moderIsOpen} onRequestClose={()=>checkModalIsOpen(true)}>
            <Check setcheck={checkModalIsOpen} order_num={result.order_num}></Check>
            </Modal>
        </div>
    );
}

export default Order; 
