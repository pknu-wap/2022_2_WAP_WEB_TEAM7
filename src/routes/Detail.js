import { useState } from 'react';
import "./Detail.css"
function Detail(props){
     // 옵션 별 가격을 의미하는 변수
  let [detail_price1,set_detail_price1]=useState(0);
  let [detail_price2,set_detail_price2]=useState(0);
  // 세부메뉴에서 메뉴의 수 늘어날 때마다 화면에 표시
  let [order_count,set_order_count]=useState(1);
    // 주문담기 선택시 메뉴의 정보를 담을 State 변수
  const [order_list, set_order_list] = useState([]);
  function save_order(){
    let menu_name=props.name
    let option3 = document.querySelector('input[name=option1]:checked');
    let option4 = document.querySelector('input[name=option2]:checked');
    if(option3===null | option4==null){
      alert("옵션을 선택해주세요")
    }
    let option1 = document.querySelector('input[name=option1]:checked').value;
    let option2 = document.querySelector('input[name=option2]:checked').value;
   
    let total_price = order_count*(props.price+detail_price1+detail_price2)
    let info= {"menu_name" : menu_name, "option1" : option1, "option2" : option2, "total_price" : total_price, "order_count" : order_count}
    set_order_list(info)
    props.showlist(info)
    props.setwindow(false)

    return info
  }


  return (
    <div>
      {/* 선택한 메뉴 정보*/}
      <div className="select_menu">
        <div className="menu_intro">
          <div id='menu_detail_img'>
            <img src={props.image} alt="메뉴이미지입니다."></img>
          </div>
          <div id="menu_info">
            <div>
            <h2>{props.name}</h2>
            <h2><label>가격 </label>{props.price}원</h2>
            </div>
          </div>
        </div>
        <div id="menu_price">
            
            <span id='clickerbutton'> 
              <span>수량</span>
              <button onClick={()=>order_count>=1?(set_order_count(order_count=order_count+1)):null}>+</button>
              <span>{order_count}</span>
              <button onClick={()=>order_count>1?(set_order_count(order_count=order_count-1)):null}>-</button>
            </span>
            <div id='select_price'>
              <h2>총  {order_count*(props.price+detail_price1+detail_price2)}원</h2>
            </div>
          </div>
      </div>
      {/* 메뉴 옵션 */}
      <div className="select_menu_detail">
        <div className="menu_detail">
          <h2>{props.options[0].name}</h2>
          <ul className="Options">
          {Object.keys(props.options[0].choices).map((key,index)=>{
              return(
                <label key={index}>
                  <input name='option1' value={key} onChange={()=>set_detail_price1(props.options[0].choices[document.querySelector('input[name=option1]:checked').value])} type="radio"/>{key} : {props.options[0].choices[key]}
                </label>
              )
            })}
          </ul>
        </div>
        <div className="menu_detail">
          <h2>{props.options[1].name}</h2>
          <ul className="Options">
          {Object.keys(props.options[1].choices).map((key,index)=>{
              return(
                <label key={index}>
                  <input name='option2' value={key} onChange={()=>set_detail_price2(props.options[1].choices[document.querySelector('input[name=option2]:checked').value])} type="radio"/>{key} : {props.options[1].choices[key]}
                </label>
              )
            })} 
          </ul>
        </div>
      </div>
      {/* 메뉴 주문/취소 버튼 */}
      <footer id='fin'>
        <button onClick={()=>(props.setwindow(false),set_detail_price1(0),set_detail_price2(0),set_order_count(1))}>취소</button>
        <button onClick={()=> save_order()}>주문담기</button>
      </footer>
    </div>
);
}

export default Detail;