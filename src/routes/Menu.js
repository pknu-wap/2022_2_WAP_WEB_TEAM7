import React, {useEffect, useState} from "react";
import "./Menu.css";
import gimbap_list from "../food/gimbap_list.json"
import ramyeon_list from "../food/ramyeon_list.json"
import tteokbokki_list from "../food/tteokbokki_list.json"
import side_list from "../food/side_list.json"
import Footer from "../layout/footer/Footer";
import Modal from 'react-modal';
import Detail from "./Detail";
import {customStyles} from "../Modal_design";
import axios from 'axios'
import Items from "./Items";





function Menu({foodname, onCreate}) {
  // 카테고리 목록을 담을 state 변수
  const [category, set_category] = useState([]);
  //추가 모달 창 열고 닫기 관련 변수 State
  const [modalIsOpen, setModalIsOpen] = useState(false);
  //
  // 선택한 카테고리를 담을 변수
  const [mode, setMode] = useState("3");
  //
  // 선택된 메뉴 정보를 담을 State 변수
  const [selected_menu,set_selected_menu]=useState("");
  // 주문 목록에 담을 State 배열
  const [ordered_list, set_ordered_list] = useState([]);
  // 주문 목록에 확인용 코드 콘솔에 주문목록이 출력됨
  console.log("주문목록",ordered_list);
  // 메뉴 목록을 담을 state 변수
  const [TotalMenu, set_menu] = useState({});
  // 연결 상태 확인용 state변수
  const [loading, setLoading] = useState(false);

  //서버와 연결 테스트용 리스트 추가
  const gimbapList = gimbap_list;
  const ramyeonList = ramyeon_list;
  const tteokbokkiList = tteokbokki_list;
  const sideList = side_list;

  // 메뉴 클릭시 선택한 메뉴 값 설정, 모달 창 열기
  function Clicked(menu){
    console.log("selected menu",menu);
    set_selected_menu(menu)
    setModalIsOpen(true);
      };

// Order_list를 console로 보여주는 함수, 주문 목록은 ordered_list에 저장되어 있음
function showorder(order_list){ 
  console.log(ordered_list)
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
    console.log("category",response.data)
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


function Gimbap() {
  return(
    <div className="order_container">
      {gimbapList.map((menu) => (
        <React.Fragment key={menu.id}>
        <div className="food_container" onClick={()=> Clicked(()=>console.log("ijj"))}>
          <img src={'#'} alt={'3'} title={"tset"} />
          <div className="name">
            <strong className="ko">{JSON.stringify("hi")}</strong>
          </div>
        </div>
        </React.Fragment>
      ))}
    {/* 모달 창 코드 */}
    <Modal style={customStyles} isOpen={modalIsOpen} onRequestClose={()=>setModalIsOpen(true)}>
      <Detail {...selected_menu} setwindow={setModalIsOpen} showlist={showorder}></Detail>
    </Modal>
    {/* 모달 창 코드 */}
    </div>
  )
}

function Ramyeon() {
  return(
    <div className="order_container">
      {ramyeonList.map((menu) => (
        <React.Fragment key={menu.id}>
        <div className="food_container" onClick={()=> Clicked(menu)}>
          <img src={menu.image} alt={menu.name} title={menu.name} />
          <div className="name">
            <strong className="ko">{menu.name}</strong>
          </div>
        </div>
        </React.Fragment>
    ))}
    {/* 모달 창 코드 */}
    <Modal isOpen={modalIsOpen} onRequestClose={()=>setModalIsOpen(true)}>
    <Detail {...selected_menu} setwindow={setModalIsOpen} showlist={showorder}></Detail>
    </Modal>
    {/* 모달 창 코드 */}
    </div>
  )
}

function Tteokbokki() {
  return(
    <div className="order_container">
      {tteokbokkiList.map((menu) => (
        <React.Fragment key={menu.id}>
        <div className="food_container" onClick={()=> Clicked(menu)}>
          <img src={menu.image} alt={menu.name} title={menu.name} />
          <div className="name">
            <strong className="ko">{menu.name}</strong>
          </div>
        </div>
        </React.Fragment>
    ))}
    {/* 모달 창 코드 */}
    <Modal isOpen={modalIsOpen} onRequestClose={()=>setModalIsOpen(true)}>
    <Detail {...selected_menu} setwindow={setModalIsOpen} showlist={showorder}></Detail>
    </Modal>
    {/* 모달 창 코드 */}

    </div>
  )
}

function Side() {
  return(
    <div className="order_container">
      {sideList.map((menu) => (
        <React.Fragment key={menu.id}>
        <div className="food_container" onClick={()=> Clicked(menu)}>
          <img src={menu.image} alt={menu.name} title={menu.name} />
          <div className="name">
            <strong className="ko">{menu.name}</strong>
          </div>
        </div>
        </React.Fragment>
    ))}
    {/* 모달 창 코드 */}
    <Modal isOpen={modalIsOpen} onRequestClose={()=>setModalIsOpen(true)}>
    <Detail {...selected_menu} setwindow={setModalIsOpen} showlist={showorder}></Detail>
    </Modal>
    {/* 모달 창 코드 */}
    </div>
  )
}


    // 선택한 
    // let content = null;
    // if(mode === 'cate3'){
    //   content =  <Items TotalMenu={TotalMenu} selected_menu={mode}></Items>
    // } else if(mode === 'ramyeon'){
    //   content = <Ramyeon/>
    // } else if(mode === 'tteokbokki'){
    //   content = <Tteokbokki/>
    // } else if(mode === 'side'){
    //   content = <Side/>
    // }


    // back에서 값을 불러오는 것을 대기하는 것
    if (loading || category[0] === undefined){
      return <div>로딩중...</div>;
    }
    console.log("TotalMenu",TotalMenu)
    return (
        <div>
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
          </div>
            <Footer order={ordered_list} showorder={set_ordered_list}/>
        </div>
    )
  }  

  export default Menu;