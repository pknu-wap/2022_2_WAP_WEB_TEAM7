import axios from "axios";
import { useEffect, useState } from "react";
import Menu from "../Menu";

function Edit({ MenuInfo, IsModalOpen, rerender }) {
  const [optionList, setoptionList] = useState([]);
  const LoadOption = async () => {
    const response = await axios
      .post("http://127.0.0.1:8000/webKiosk/opme/", {
        market_name: "S",
        menu_name: MenuInfo.menu_name,
      })
      .then((response) => {
        setoptionList(response.data);
      });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("EVENT", event);
    let selectedElement = document.querySelector("#status");
    let NewName = event.target[0].value;
    const IsSoldOut = event.target[2].value;
    console.log(selectedElement.value === "false");
    const newPrice = Number(event.target[1].value);
    console.log(IsSoldOut, NewName, newPrice);
    //제품 이름이 같은 경우에 대한 더미 값을 넣어서 다른 값을 바꿀 수 있도록 함
    const checkName =
      NewName === MenuInfo.menu_name
        ? `"Dummy" : "null",`
        : `"menu_name" : "${NewName}",`;

    console.log("checkName", checkName);
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
    UpdataMenu();
    if (UpdataMenu.data === "이미 동일한 이름이 존재합니다.") {
      alert(UpdataMenu.data);
    } else {
      IsModalOpen(false);
      window.location.reload();
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
          <label>옵션</label>
          <select>
            {optionList.map((item) => {
              console.log("item", item);
              console.log("optionlist", optionList);
              return (
                <option value={item.option_name} selected={item.is_forbidden}>
                  {item.option_name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label>옵션가격</label>
          <input type="text" value={MenuInfo.option_price} />
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
