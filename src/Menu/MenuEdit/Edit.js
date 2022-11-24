import axios from "axios";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

import Menu from "../Menu";

function Edit({ MenuInfo, IsModalOpen, rerender }) {
  //옵션 데이터 담을 state 변수
  const [optionList, setoptionList] = useState([]);
  const [OldOptionList, setOldOptionList] = useState([]);
  // 옵션 불러오는 함수
  const LoadAllOption = async () => {
    const response = await axios
      .post("http://127.0.0.1:8000/webKiosk/client/option/read/", {
        market_name: "S",
      })
      .then((response) => {
        console.log("option", response.data);
        setoptionList(response.data);
      });
  };
  // 기존 옵션 불러오는 함수
  const LoadOldOption = async () => {
    const MenuName = MenuInfo.menu_name;
    const response = await axios
      .post("http://127.0.0.1:8000/webKiosk/client/opme/read/", {
        market_name: "S",
        menu_name: MenuName,
      })
      .then((response) => {
        setOldOptionList(response.data);
      });
  };

  useEffect(() => {
    LoadAllOption();
    LoadOldOption();
  }, []);
  console.log("optionList", optionList);

  //수정 버튼 클릭시 실행
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("EVENT", event);
    let selectedElement = document.querySelector("#status");
    let NewName = event.target[0].value;
    const IsSoldOut = event.target[2].value;
    console.log(selectedElement.value === "false");
    const newPrice = Number(event.target[1].value);
    console.log(IsSoldOut, NewName, newPrice);
    //제품 이름이 같은 경우에 대한 더미 값을 넣어서  이름이 같더라도 다른 값을 바꿀 수 있도록 함
    const checkName =
      NewName === MenuInfo.menu_name
        ? `"Dummy" : "null",`
        : `"menu_name" : "${NewName}",`;

    console.log("checkName", checkName);
    // 메뉴의 가격, 이름 수정하는 경우
    const UpdataMenu = async () =>
      await axios.post("http://127.0.0.1:8000/webKiosk/client/menu/update/", {
        market_name: "S",
        old_name: `${MenuInfo.menu_name}`,
        new: `{
          ${checkName}
          "price" : ${newPrice},
          "is_forbidden" : ${IsSoldOut}
        }`,
      });
    // 메뉴의 옵션 수정을 위한 함수
    const UpdateOption = async () => {
      const chkList = document.querySelectorAll("input[prop=option]:checked");
      const chkListArr = [];
      Object.values(chkList).map((item) => {
        chkListArr.push(`"${item.name}"`);
      });
      console.log("chkListArr", chkListArr);
      console.log("chkList", chkList);
      await axios.post(
        "http://127.0.0.1:8000/webKiosk/client/opme/management/",
        {
          market_name: "S",
          menu_name: `${MenuInfo.menu_name}`,
          option_set: `[${chkListArr}]`,
        }
      );
    };
    UpdataMenu();
    UpdateOption();
    if (UpdataMenu.data === "이미 동일한 이름이 존재합니다.") {
      alert(UpdataMenu.data);
    } else {
      IsModalOpen(false);
      // window.location.reload();
    }
  };

  useEffect(() => {
    console.log("MenuInfo", MenuInfo);
  }, []);

  return (
    //make form for edit menu
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>메뉴이름</label>
          <input
            type="text"
            name="menu_name"
            id="NewName"
            defaultValue={MenuInfo.menu_name}
          />
        </div>
        <div>
          <label>가격</label>
          <input
            type="number"
            name="menu_price"
            id="NewPrice"
            defaultValue={MenuInfo.price}
          />
        </div>
        <div>
          <label>메뉴상태</label>
          <select id="status">
            <option value={false} defaultVaule={!MenuInfo.is_forbiddden}>
              판매중
            </option>
            <option value={true} defaultValue={MenuInfo.is_forbidden}>
              판매중지
            </option>
          </select>
        </div>
        <div>
          <label>사진</label>
          <input type="text" value={MenuInfo.image} />
        </div>
        <div>
          <label>옵션을 선택하세요</label>
          <br></br>
          {Object.values(optionList).map((item) => {
            console.log("item", item);
            Object.values(OldOptionList).map((oldItem) => {});
            return (
              <span>
                <input type="checkbox" prop="option" name={item.option_name} />
                <label>{item.option_name}</label>
              </span>
            );
          })}
        </div>

        <div>
          <button type="submit">메뉴수정</button>
          <button type="button" onClick={() => IsModalOpen(false)}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
