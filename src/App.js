import './App.css';
import React from 'react';
import Modal from 'react-modal';
import { useState } from 'react';

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
    set_detail_price1(0);
    set_detail_price2(0)
    set_order_count(1)
    setorder_list((order_list) => [...order_list, info]);

    setModalIsOpen(false);
    return order_list
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
    <div>
      {/* 선택한 메뉴 정보*/}
      <div className="select_menu">
        <div id='menu_detail_img'>
          <img src={'#'} alt="메뉴이미지입니다."></img>
        </div>
        <div id="menu_info">
          <div>
          <h2>{selected_menu.name}</h2>
          <h2>{selected_menu.price}</h2>
          </div>
          <div id="menu_price">
            <p>수량</p>
            <span id='clickerbutton'> 
              <button onClick={()=>order_count>=1?(set_order_count(order_count=order_count+1)):null}>+</button>
              <span>{order_count}</span>
              <button onClick={()=>order_count>1?(set_order_count(order_count=order_count-1)):null}>-</button>
            </span>
            <div id='select_price'>
              <h2>{selected_menu.price*order_count+detail_price1+detail_price2}원</h2>
            </div>
          </div>
        </div>
      </div>
      {/* 메뉴 옵션 */}
      <div className="select_menu_detail">
        <div className="menu_detail">
          <h2>{selected_menu.options[0].name}</h2>
          {/* <ul className="Options">
            <label><input name='option1'                value= {Object.keys(selected_menu.options[0].choices)[0]} onChange={()=>console.log(selected_menu.options[0].choices[document.querySelector('input[name=option1]:checked').value])}  type="radio"/>{Object.keys(selected_menu.options[0].choices)[0]} : {Object.values(selected_menu.options[0].choices)[0]} </label>
            <label><input name='option1' defaltChecked  value= {Object.keys(selected_menu.options[0].choices)[1]} onChange={()=>set_detail_price1(selected_menu.options[0].choices[document.querySelector('input[name=option1]:checked').value])}  type="radio"/>{Object.keys(selected_menu.options[0].choices)[1]} : {Object.values(selected_menu.options[0].choices)[1]}</label>
            <label><input name='option1'                value= {Object.keys(selected_menu.options[0].choices)[2]}   onChange={()=>console.log(selected_menu.options[0].choices[document.querySelector('input[name=option1]:checked').value])}type="radio"/>{Object.keys(selected_menu.options[0].choices)[2]} : {Object.values(selected_menu.options[0].choices)[2]} </label>
          </ul> */}
          {/* {make radio button group to select detail menu } */}
          <ul className="Options">
          {Object.keys(selected_menu.options[0].choices).map((key,index)=>{
              return(
                <label key={index}>
                  <input name='option1' value={key} onChange={()=>set_detail_price1(selected_menu.options[0].choices[document.querySelector('input[name=option1]:checked').value])} type="radio"/>{key} : {selected_menu.options[0].choices[key]}
                </label>
              )
            })}
          </ul>
        </div>
        <div className="menu_detail">
          <h2>{selected_menu.options[1].name}</h2>
          <ul className="Options">
          {Object.keys(selected_menu.options[1].choices).map((key,index)=>{
              return(
                <label key={index}>
                  <input name='option2' value={key} onChange={()=>set_detail_price2(selected_menu.options[1].choices[document.querySelector('input[name=option2]:checked').value])} type="radio"/>{key} : {selected_menu.options[1].choices[key]}
                </label>
              )
            })} 
          </ul>
        </div>
      </div>
      {/* 메뉴 주문/취소 버튼 */}
      <footer>
        <button onClick={()=>(setModalIsOpen(false),set_detail_price1(0),set_detail_price2(0),set_order_count(1))}>취소</button>
        <button onClick={(()=>(setModalIsOpen(false),set_detail_price1(0),set_detail_price2(0),set_order_count(1)),()=>{console.log(save_order())})}>주문담기</button>
      </footer>
    </div>
    </Modal>
  </div>
  );
};

export default App;
