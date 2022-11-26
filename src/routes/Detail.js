import axios from "axios";
import { useEffect, useState } from "react";
import "./Detail.css";

function Detail({ selectedMenu, setwindow, showlist }) {
  //옵션을 넣을 state변수
  const [option, setoptions] = useState({});
  const options = async () => {
    await axios
      .post("http://127.0.0.1:8000/webKiosk/client/opme/read/", {
        market_name: "S",
        menu_name: `${selectedMenu.menu_name}`,
      })
      .then((response) => {
        setoptions(response.data);
      });
  };
  useEffect(() => {
    options();
  }, []);

  // 선택한 옵션의 총 가격을 의미하는 변수
  let [detail_price, set_detail_price] = useState(0);
  // 세부메뉴에서 메뉴의 수 늘어날 때마다 화면에 표시
  let [order_count, set_order_count] = useState(1);
  // 주문담기 선택시 메뉴의 정보를 담을 State 변수
  const [order_list, set_order_list] = useState([]);
  //옵션 선택시 표기되는 가격 변화시키는 함수
  const ChangeOption = (optionName) => {
    let TotalDetailPrice = 0;
    const selectedOptions = document.querySelectorAll(".OptionChoices:checked");
    console.log("selectedOptions", selectedOptions);
    Object.values(selectedOptions).map((option) => {
      TotalDetailPrice += parseInt(option.value);
    });
    set_detail_price(TotalDetailPrice);
  };

  function save_order() {
    let total_price = order_count * (selectedMenu.price + detail_price);
    let info = {
      menu_name: selectedMenu.menu_name,
      total_price: total_price,
      order_count: order_count,
    };
    const selectedOptions = document.querySelectorAll(".OptionChoices:checked");
    Object.values(selectedOptions).map((option) => {
      info[option.name] = option.id;
    });
    //옵션 선택을 안한 경우 경고창 출력 및 그대로 함수 종료
    if (selectedOptions.length != option.length) {
      alert("옵션을 선택해주세요");
      return;
    }

    showlist(info);
    setwindow(false);

    return info;
  }

  return (
    <div>
      {/* 선택한 메뉴 정보*/}
      <div className="select_menu">
        <div className="menu_intro">
          <div id="menu_detail_img">
            <img src={"#"} alt="메뉴이미지입니다."></img>
          </div>
          <div id="menu_info">
            <div>
              <h2>{selectedMenu.menu_name}</h2>
              <h2>
                <label>가격 </label>
                {selectedMenu.price}원
              </h2>
            </div>
          </div>
        </div>
        <div id="menu_price">
          <span id="clickerbutton">
            <span>수량</span>
            <button
              onClick={() =>
                order_count >= 1
                  ? set_order_count((order_count = order_count + 1))
                  : null
              }
            >
              +
            </button>
            <span>{order_count}</span>
            <button
              onClick={() =>
                order_count > 1
                  ? set_order_count((order_count = order_count - 1))
                  : null
              }
            >
              -
            </button>
          </span>
          <div id="select_price">
            <h2>총 {order_count * (selectedMenu.price + detail_price)}원</h2>
          </div>
        </div>
      </div>
      {/* 메뉴 옵션 */}
      <div className="select_menu_detail">
        <div className="menu_detail">
          {Object.values(option).map((option, index) => {
            //각 옵션 별 json 생성
            const optionList = JSON.parse(option.option_list);

            return (
              <>
                <h2>{option.option_name}</h2>
                <ul className="Options">
                  {Object.keys(optionList).map((key) => {
                    const Obj = {};
                    Obj[key] = optionList[key];
                    console.log(JSON.stringify(optionList), "sts ");
                    return (
                      <label key={key}>
                        <input
                          className="OptionChoices"
                          name={option.option_name}
                          id={key}
                          value={optionList[key]}
                          onChange={() => ChangeOption(key)}
                          type="radio"
                        />
                        {key} : {optionList[key]}
                      </label>
                    );
                  })}
                </ul>
              </>
            );
          })}

          {/* {Object.keys(selectedMenu.options[0].choices).map((key,index)=>{
              return(
                  <input name='option1' value={key} onChange={()=>set_detail_price1(selectedMenu.options[0].choices[document.querySelector('input[name=option1]:checked').value])} type="radio"/>{key} : {selectedMenu.options[0].choices[key]}
                </label>
              )
            })} */}
        </div>
        <div className="menu_detail">
          {/* <h2>{selectedMenu.options[1].name}</h2> */}
          <ul className="Options">
            {/* {Object.keys(selectedMenu.options[1].choices).map((key,index)=>{
              return(
                <label key={index}>
                  <input name='option2' value={key} onChange={()=>set_detail_price2(selectedMenu.options[1].choices[document.querySelector('input[name=option2]:checked').value])} type="radio"/>{key} : {selectedMenu.options[1].choices[key]}
                </label>
              )
            })}  */}
          </ul>
        </div>
      </div>
      {/* 메뉴 주문/취소 버튼 */}
      <footer id="fin">
        <button
          onClick={() => (
            setwindow(false), set_detail_price(0), set_order_count(1)
          )}
        >
          취소
        </button>
        <button onClick={() => save_order()}>주문담기</button>
      </footer>
    </div>
  );
}

export default Detail;
