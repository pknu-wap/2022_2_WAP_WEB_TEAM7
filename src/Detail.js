import React from 'react';
import { useState } from 'react';

  
function Detail(props){
     // 옵션 별 가격을 의미하는 변수
  let [detail_price1,set_detail_price1]=useState(0);
  let [detail_price2,set_detail_price2]=useState(0);

  // 세부메뉴에서 메뉴의 수 늘어날 때마다 화면에 표시
  let [order_count,set_order_count]=useState(1);
  
  // 주문 버튼 클릭시 주문한 내용 저장  
  let [order_list, setorder_list] = useState([]);

 //담기 버튼 입력 시 주문 내역에 추가
  function save_order (){
    
    let menu_name=props.menu.name
    let option3 = document.querySelector('input[name=option1]:checked');
    let option4 = document.querySelector('input[name=option2]:checked');
    if(option3===null | option4==null){
      alert("옵션을 선택해주세요")
    }
    let option1 = document.querySelector('input[name=option1]:checked').value;
    let option2 = document.querySelector('input[name=option2]:checked').value;
    
    
    let total_price = order_count*(props.menu.price+detail_price1+detail_price2)
    let info= {"menu_name" : menu_name, "option1" : option1, "option2" : option2, "total_price" : total_price, "order_count" : order_count}
    setorder_list(info)
    //주문내역 console에 출력
    console.log(order_list)
    

    set_detail_price1(0);
    set_detail_price2(0)
    set_order_count(1)
    
    props.setwindow(false);
    return order_list;

    //return order_list
  }
return(
  <div>
      {/* 선택한 메뉴 정보*/}
      <div className="select_menu">
        <div id='menu_detail_img'>
          <img src={'#'} alt="메뉴이미지입니다."></img>
        </div>
        <div id="menu_info">
          <div>
          <h2>{props.menu.name}</h2>
          <h2>{props.menu.price}</h2>
          </div>
          <div id="menu_price">
            <p>수량</p>
            <span id='clickerbutton'> 
              <button onClick={()=>order_count>=1?(set_order_count(order_count=order_count+1)):null}>+</button>
              <span>{order_count}</span>
              <button onClick={()=>order_count>1?(set_order_count(order_count=order_count-1)):null}>-</button>
            </span>
            <div id='select_price'>
              <h2>{order_count*(props.menu.price+detail_price1+detail_price2)}원</h2>
            </div>
          </div>
        </div>
      </div>
      {/* 메뉴 옵션 */}
      <div className="select_menu_detail">
        <div className="menu_detail">
          <h2>{props.menu.options[0].name}</h2>
          <ul className="Options">
          {Object.keys(props.menu.options[0].choices).map((key,index)=>{
              return(
                <label key={index}>
                  <input name='option1' value={key} onChange={()=>set_detail_price1(props.menu.options[0].choices[document.querySelector('input[name=option1]:checked').value])} type="radio"/>{key} : {props.menu.options[0].choices[key]}
                </label>
              )
            })}
          </ul>
        </div>
        <div className="menu_detail">
          <h2>{props.menu.options[1].name}</h2>
          <ul className="Options">
          {Object.keys(props.menu.options[1].choices).map((key,index)=>{
              return(
                <label key={index}>
                  <input name='option2' value={key} onChange={()=>set_detail_price2(props.menu.options[1].choices[document.querySelector('input[name=option2]:checked').value])} type="radio"/>{key} : {props.menu.options[1].choices[key]}
                </label>
              )
            })} 
          </ul>
        </div>
      </div>
      {/* 메뉴 주문/취소 버튼 */}
      <footer>
        <button onClick={()=>(props.setwindow(false),set_detail_price1(0),set_detail_price2(0),set_order_count(1))}>취소</button>
        <button onClick={(()=>(props.setwindow(false),set_detail_price1(0),set_detail_price2(0),set_order_count(1)),()=>save_order())}>주문담기</button>
      </footer>
    </div>
);
}
export default Detail;