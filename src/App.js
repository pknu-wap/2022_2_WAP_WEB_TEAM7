import './App.css';
import React from 'react';
import Modal from 'react-modal';
import { useState } from 'react';

// make dictionary for menu
const menu1 = {name:"gimbab", price:3000, description:"description"}
const menu2 = {name:"ramyun", price:3000, description:"description"}
const menu3 = {name:"topoki", price:8000, description:"description"}
const menu4 = {name:"rapoki", price:5000, description:"description"}
const menu5 = {name:"dongas", price:9000, description:"description"}


function App() {

  const [modalIsOpen, setModalIsOpen] = useState(false);
    // 임시 초기값으로 menu1로 둠
  const [selected_menu,set_selected_menu]=useState(menu1)
  let [order_count,set_order_count]=useState(1);
  const onclickmenu = event=>{
    const menu_id= String(event.currentTarget.id)
    setModalIsOpen(true);
    if(menu_id==="menu1"){
      set_selected_menu(menu1)
    }
    else if (menu_id==="menu2"){
      set_selected_menu(menu2)
  
    }
    else if (menu_id==="menu3"){
      set_selected_menu(menu3)
  
    }
    else if (menu_id==="menu4"){
      set_selected_menu(menu4)
  
    }
    else if (menu_id==="menu5"){
      set_selected_menu(menu5)
  
    
  }
  }

  
    
return (
  // get id of clicked button and pass it to modal
  
  <div className="App">
    <div className="menu">
      <button id="menu1" onClick={onclickmenu}>gimbab</button>
      <button id="menu2" onClick={onclickmenu}>ramyun</button>
      <button id="menu3" onClick={onclickmenu}>topoki</button>
      <button id="menu4" onClick={onclickmenu}>rapoki</button>
      <button id="menu5" onClick={onclickmenu}>dongas</button>
    </div>
    {/* 세부메뉴 창 이외의 곳을 눌러도 선택 안 되게끔 설정 */}
    <Modal isOpen={modalIsOpen} onRequestClose={()=>setModalIsOpen(true)}>
      
      <div className="select_menu">
        <div id='menu_detail_img'>
          <img src={'#'} alt="메뉴이미지입니다."></img>
        </div>
        <div id="menu_info">
          <div>
          <h2>{selected_menu.name}</h2>
          <h2>{selected_menu.description}</h2>
          </div>
          <div id="menu_price">
            
            <span id='clickerbutton'> 
              <button onClick={()=>order_count>=1?set_order_count(order_count=order_count+1):null}>+</button>
              <span>{order_count}</span>
              <button onClick={()=>order_count>1?set_order_count(order_count=order_count-1):null}>-</button>
            </span>
            <div id='select_price'>
              <h2>{selected_menu.price*order_count}원</h2>
            </div>
            
          </div>
        </div>
      </div>
      <footer>
      <button onClick={()=>setModalIsOpen(false)}>취소</button>
      <button onClick={()=>setModalIsOpen(false)}>주문담기</button>
      </footer>
    </Modal>
  </div>
  );
};

export default App;
