import React, {useEffect, useState} from "react";
import "./Order.css";
import Ordertable from "../layout/footer/OrderTable";
import Footer from "../layout/footer/Footer";
import Modal from 'react-modal';
import Check from './Check';


function Order({setorder}){
    
    // 확인창창 추가 모달 창 열고 닫기 관연 변수 State
    const [check_moderIsOpen, checkModalIsOpen] = useState(false);

    
     function check(e) {
         checkModalIsOpen(true);
     }

    return (
        <div className="finish_order_list">
            <hi>주문 목록</hi>
            
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
