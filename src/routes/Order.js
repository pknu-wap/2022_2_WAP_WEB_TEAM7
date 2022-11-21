import React, {useEffect, useState} from "react";
import "./Order.css";
import Ordertable from "../layout/footer/OrderTable";
import Footer from "../layout/footer/Footer";
import Modal from 'react-modal';
import Check from './Check';


function Order({setorder, final_order}){
    
    
    // 확인창 추가 모달 창 열고 닫기 관연 변수 State
    const [check_moderIsOpen, checkModalIsOpen] = useState(false);

    const url="http://127.0.0.1:8000/webKiosk/client/order/read/all/"
    const response= axios.post(url, {
        menu_list: 'final_order',
        all_price: '100',
        create_date: '2022-01-11'
      });
    

            
     function check(e) {
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
            <div id="back">
            <button style={{color:"white"}} onClick={()=> setorder(false)}>취소</button>
            </div>
            <div id="finalCheck">
                <button style={{color:"white"}} onClick={check}>확인</button>
            </div>
            <Modal isOpen={check_moderIsOpen} onRequestClose={()=>checkModalIsOpen(true)}>
            <Check setcheck={checkModalIsOpen}></Check>
            </Modal>
        </div>
    );
}

export default Order; 
