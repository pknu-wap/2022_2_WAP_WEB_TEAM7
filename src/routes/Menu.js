import React, {useCallback, useState} from "react";
import "./Menu.css";
import gimbap_list from "../food/gimbap_list.json"
import ramyeon_list from "../food/ramyeon_list.json"
import tteokbokki_list from "../food/tteokbokki_list.json"
import side_list from "../food/side_list.json"
import Footer from "../layout/footer/Footer";
//추가 모달 창 패키지, 세부메뉴 창, 모달 디자인 관련 코드 import
import Modal from 'react-modal';
import Detail from "./Detail";
import {customStyles} from "../Modal_design";
//추가




function Menu({foodname, onCreate}) {
  //추가 모달 창 열고 닫기 관련 변수 State
  const [modalIsOpen, setModalIsOpen] = useState(false);
  //
  //추가 선택된 메뉴 정보를 담을 State 변수
  const [selected_menu,set_selected_menu]=useState("");
  //
  // 주문 목록에 담을 State 배열
  const [ordered_list, set_ordered_list] = useState([]);
  // 주문 목록에 확인용 코드 콘솔에 주문목록이 출력됨
  console.log("주문목록", ordered_list)
  //
  const [inputs, setInputs] = useState({
    dialog: 0,
    number: 1,
  });
  const gimbapList = gimbap_list;
  const ramyeonList = ramyeon_list;
  const tteokbokkiList = tteokbokki_list;
  const sideList = side_list;

  const onClick = (id) => {
    setInputs({
      ...inputs,
      dialog: id,
      onSet: false,
      number: 1,
    });
  };
  // 메뉴 클릭시 선택한 메뉴 값 설정, 모달 창 열기
  function Clicked(menu){
    set_selected_menu(menu)
    setModalIsOpen(true);
  };

  // const onConfirm = (foodId, name, price, number, onSet) => {
  //   console.log("확인");
  //   onCreate(foodId, name, price, number, onSet);
  //   setInputs({
  //     dialog: 0,
  //     onSet: false,
  //     number: 1,
  //   });
  // };

  // const onCancel = () => {
  //   console.log("취소");
  //   setInputs({
  //     dialog: 0,
  //     onSet: false,
  //     number: 1,
  //   });
  // };
// Order_list를 console로 보여주는 함수, 주문 목록은 ordered_list에 저장되어 있음
function showorder(order_list){ 
  console.log(order_list)
  set_ordered_list([...ordered_list,order_list])
}
//
function Gimbap() {
  return(
    <div className="order_container">
      {gimbapList.map((menu) => (
        <React.Fragment key={menu.id}>
      {/* 메뉴 클릭시 Clicked함수 실행 */}
      <div className="food_container" onClick={(() => onClick(menu.id),()=> Clicked(menu))}>
          {/*  */}
          <img src={menu.image} alt={menu.name} title={menu.name} />
          <div className="name">
            <strong className="ko">{menu.name}</strong>
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
      {/* 메뉴 클릭시 Clicked함수 실행 */}
        <div className="food_container" onClick={(() => onClick(menu.id),()=> Clicked(menu))}>
          {/*  */}
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
      {/* 메뉴 클릭시 Clicked함수 실행 */}
      <div className="food_container" onClick={(() => onClick(menu.id),()=> Clicked(menu))}>
          {/*  */}
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
      {/* 메뉴 클릭시 Clicked함수 실행 */}
      <div className="food_container" onClick={(() => onClick(menu.id),()=> Clicked(menu))}>
          {/*  */}
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

    const [mode, setMode] = useState('gimbap');
    let content = null;
    if(mode === 'gimbap'){
      content = <Gimbap/>
    } else if(mode === 'ramyeon'){
      content = <Ramyeon/>
    } else if(mode === 'tteokbokki'){
      content = <Tteokbokki/>
    } else if(mode === 'side'){
      content = <Side/>
    }
  
    return (
        <div>
          <div className="categories">
            <button onClick={()=>{setMode('gimbap');}}>김밥</button>
            <button onClick={()=>{setMode('ramyeon');}}>라면</button>
            <button onClick={()=>{setMode('tteokbokki');}}>떡볶이</button>
            <button onClick={()=>{setMode('side');}}>사이드</button>
            </div>
            {content}
            <Footer/>
        </div>
    )
  }  

  export default Menu;