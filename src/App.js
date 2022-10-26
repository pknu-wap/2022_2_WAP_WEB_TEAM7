import './App.css';
import React from 'react';
import Modal from 'react-modal';
import { useState } from 'react';
import Detail from './Detail.js'

// make dictionary for menu
// menu has a list of options
const menu1 = {
  name: "김밥",
  description: "맛있는 김밥",
  price: 3000,
  options: [
    {
      name: "맵기",
      description: "맵기",
      choices: {"덜 맵게": 0, "보통": 0, "매우맵게": 500}
    },
    {
      name: "양",
      description: "양",
      choices : {"많이": 1000, "보통": 0}
    },
  ],
};

const menu2 = {
  name: "라면",
  description: "맛있는 라면",
  price: 3000,
  options: [
    {
      name: "추가재료",
      description: "원하시는 쟤료를 선택해주세요",
      choices : {"김치": 500, "단무지": 0, "계란": 500}
    },
    {
      name: "맵기",
      description: "매운 정도를 선택해주세요",
      choices : {"매우맵게": 500, "보통": 0, "안맵게": 0}
    },
  ],
};

const menu3 = {
  name: "떡볶이",
  description: "맛있는 떡볶이",
  price: 6000,
  options: [
    {
      name: "추가재료",
      description: "원하시는 쟤료를 선택해주세요",
      choices : {"떡 추가": 500, "계란 추가": 500, "치즈 추가": 500}
    },
    {
      name: "맵기",
      description: "매운 정도를 선택해주세요",
      choices : {"매우맵게": 500, "보통": 0, "안맵게": 0}
    },
  ],
};

const menu4 = {
  name: "돈가스",
  description: "맛있는 돈가스",
  price: 6000,
  options: [
    {
      name: "추가재료",
      description: "원하시는 쟤료를 선택해주세요",
      choices : {"밥 추가": 500, "특제소스": 500, "치즈 추가": 1000}
    },
    {
    name: "양",
      description: "양",
      choices : {"곱빼기": 2000, "보통": 0, "작게": -500}
    }
  ]
};




function App() {
    // 메뉴 선택시 선택한 메뉴 세부 창 띄우기
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // 메뉴 클릭시 클릭한 메뉴의 이름을 저장하는 변수
  const [selected_menu,set_selected_menu]=useState(menu1)
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
  }
  // 옵션 별 가격을 의미하는 변수
  let [detail_price1,set_detail_price1]=useState(0);
  let [detail_price2,set_detail_price2]=useState(0);

  // 세부메뉴에서 메뉴의 수 늘어날 때마다 화면에 표시
  let [order_count,set_order_count]=useState(1);
  
  // 주문 버튼 클릭시 주문한 내용 저장  
  let [order_list, setorder_list] = useState([]);


  function save_order (){
    // get option name and price
    let menu_name=selected_menu.name
    let option3 = document.querySelector('input[name=option1]:checked');
    let option4 = document.querySelector('input[name=option2]:checked');
    if(option3===null | option4==null){
      alert("옵션을 선택해주세요")
    }
    let option1 = document.querySelector('input[name=option1]:checked').value;
    let option2 = document.querySelector('input[name=option2]:checked').value;
    
    
    let total_price = selected_menu.price*order_count+detail_price1+detail_price2
    let info= {"menu_name" : menu_name, "option1" : option1, "option2" : option2, "total_price" : total_price, "order_count" : order_count}
    // make order list plus new order
    let new_order_list = order_list
    new_order_list.push(info)
    setorder_list(new_order_list)




    set_detail_price1(0);
    set_detail_price2(0)
    set_order_count(1)
    
    setModalIsOpen(false);
    console.log(order_list)
    return order_list;

    //return order_list
  }


  
return (
  // get id of clicked button and pass it to modal
  
  <div className="App">
{/* // 임시 메뉴판 생성 */}
    <div className="menu">
      <button id="menu1" onClick={onclickmenu}>gimbab</button>
      <button id="menu2" onClick={onclickmenu}>ramyun</button>
      <button id="menu3" onClick={onclickmenu}>topoki</button>
      <button id="menu4" onClick={onclickmenu}>dongas</button>
    </div>

    {/* 세부메뉴 창 바깥 선택 안 되도록 설정 */}
    <Modal isOpen={modalIsOpen} onRequestClose={()=>setModalIsOpen(true)}>
    <Detail menu={selected_menu} setwindow={setModalIsOpen} />
    </Modal>
  </div>
  );
};

export default App;
