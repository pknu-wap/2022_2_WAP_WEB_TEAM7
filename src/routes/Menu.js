import React, {useEffect, useState} from "react";
import "./Menu.css";
import gimbap_list from "../food/gimbap_list.json"
import ramyeon_list from "../food/ramyeon_list.json"
import tteokbokki_list from "../food/tteokbokki_list.json"
import side_list from "../food/side_list.json"
import Footer from "../layout/footer/Footer";
import Modal from 'react-modal';
import Detail from "./Detail";
import Order from "./Order";
import {customStyles} from "../Modal_design";
import axios from 'axios'
import Items from "./Items";


function Menu({foodname, onCreate}) {
  // 카테고리 목록을 담을 state 변수
  const [category, set_category] = useState([]);
  // 디테일 추가 모달 창 열고 닫기 관련 변수 State
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // 주문목록창 추가 모달 창 열고 닫기 관연 변수 State
  const [order_moderIsOpen, orderModalIsOpen] = useState(false);
  //
  // 선택한 카테고리를 담을 변수
  const [mode, setMode] = useState("3");
  //
  // 선택된 메뉴 정보를 담을 State 변수
  const [selected_menu,set_selected_menu]=useState("");
  // 주문 목록에 담을 State 배열
  const [ordered_list, set_ordered_list] = useState([]);
  // 주문 목록에 확인용 코드 콘솔에 주문목록이 출력됨
  // 메뉴 목록을 담을 state 변수
  const [TotalMenu, set_menu] = useState({});
  // 연결 상태 확인용 state변수
  const [loading, setLoading] = useState(false);


  // 메뉴 클릭시 선택한 메뉴 값 설정, 모달 창 열기
  function Clicked(menu){
    set_selected_menu(menu)
    setModalIsOpen(true);
      };

  //주문 버튼 클릭 시 모달창 열기
  function orderClick(e) {        
      orderModalIsOpen(true);
      }
  
  

// Order_list를 console로 보여주는 함수, 주문 목록은 ordered_list에 저장되어 있음
function showorder(order_list){ 
  set_ordered_list([...ordered_list,order_list])
}

// 

//
// 카테고리 목록 불러오기
async function Category() {
  const url="http://127.0.0.1:8000/webKiosk/client/category/read/"
  try {
  // POST 요청은 body에 실어 보냄
    const response=await axios.post(url, {
      market_name: 'S'
    });
    set_category(response.data)
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

//카테고리 목록에 따른 메뉴를 불러오는 함수
async function MenuList() {
  const url="http://127.0.0.1:8000/webKiosk/client/meca/read/"
  Object.keys(category).map(async (key)=>{
    try {
    // POST 요청은 body에 실어 보냄
        const response=await axios.post(url, {
        market_name: 'S', category_name : category[key].category_name
        });
        const obj={}
        response.data['category_name']=category[key].category_name
        obj[category[key].id]=response.data
        set_menu(TotalMenu=>({...TotalMenu,...obj}))
    } catch (e) {
        console.error(e);
    }
  })        

}

//함수 랜더링 시 1번째 useEffect 실행-> category state 변수 변경 시 두번째 useEffect 실행
// 순차적으로   DB에서 카테고리 목록을 불러오고, 카테고리 목록에 따른 메뉴를 불러옴
useEffect(()=>{
  setLoading(true)
  Category();
},[])
useEffect(() => {
    MenuList();
    setLoading(false)
    setMode(`3`) 
}, [category]);
useEffect(() => {
  console.log("주문목록",ordered_list)
}, [ordered_list]);

    // back에서 값을 불러오는 것을 대기하는 것
    if (loading || category[0] === undefined){
      return <div>로딩중...</div>;
    }
    return (
        <div>
          <div className="order">
            <button id="order_button" onClick={orderClick}>주문</button>
          </div>
          <div className="categories">
            {category.map((category)=>
              <button onClick={()=>setMode(category.id)}>{`${category.category_name}`}</button>            
            )}
          </div>
          <div>
            <Items TotalMenu={TotalMenu} selectedCategory={mode} Clicked={Clicked}></Items>
            <Modal isOpen={modalIsOpen} onRequestClose={()=>setModalIsOpen(true)}>
            <Detail selectedMenu={selected_menu} setwindow={setModalIsOpen} showlist={showorder}></Detail>
            </Modal>
            <Modal isOpen={order_moderIsOpen} onRequestClose={()=>orderModalIsOpen(true)}>
            <Order setorder={orderModalIsOpen} final_order={ordered_list} ></Order>
            </Modal>
          </div>
            <Footer order={ordered_list} showorder={set_ordered_list}/>
        </div>
    )
  }  

 export default Menu;