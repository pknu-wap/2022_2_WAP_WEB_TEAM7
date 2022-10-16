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

  const [modalIsOpen, setModalIsOpen] = useState(false);
    // 메뉴 선택시 선택한 메뉴 세부 창 띄우기
  const [selected_menu,set_selected_menu]=useState(menu1)
  // 세부메뉴에서 메뉴의 수 늘어날 때마다 화면에 표시
  let [order_count,set_order_count]=useState(1);
  // 메뉴 클릭시 
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
  // 세부 메뉴 선택 버튼 리스트 만들기
  const option_list = selected_menu.options.map((option)=>{
    return(
      <div>
        <h3>{option.name}</h3>
        <h4>{option.description}</h4>
        <ul>
          {Object.keys(option.choices).map((choice)=>{
            return(
              <li>
                <button>{choice}</button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  })
return (
  // get id of clicked button and pass it to modal
  
  <div className="App">
    <div className="menu">
      <button id="menu1" onClick={onclickmenu}>gimbab</button>
      <button id="menu2" onClick={onclickmenu}>ramyun</button>
      <button id="menu3" onClick={onclickmenu}>topoki</button>
      <button id="menu4" onClick={onclickmenu}>dongas</button>
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
      <div className="select_menu_detail">
        <div className="menu_detail">
          <h2>{selected_menu.options[0].name}</h2>
          <ul className="Options">
             <button>{Object.keys(selected_menu.options[0].choices)[0]}</button>
             <button>{Object.keys(selected_menu.options[0].choices)[1]}</button>
             <button>{Object.keys(selected_menu.options[0].choices)[2]}</button>
          </ul>
        </div>
        <div className="menu_detail">
          <h2>{selected_menu.options[1].name}</h2>
          <ul className="Options">
             <button>{Object.keys(selected_menu.options[1].choices)[0]+ Object.keys(selected_menu.options[1].choices)[0] }</button>
             <button>{Object.keys(selected_menu.options[1].choices)[1]}</button>
             <button>{Object.keys(selected_menu.options[1].choices)[2]}</button>
          </ul>
        </div>
        <div className="menu_detail">
          <h2>{selected_menu.options[1].name}</h2>
          <ul className="Options">
            {/* <li>{selected_menu.options[2].choices[0]}</li>
            <li>{selected_menu.options[2].choices[1]}</li>
            <li>{selected_menu.options[2].choices[2]}</li> */}
          </ul>
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
