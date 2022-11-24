import axios from "axios";
import { useEffect, useState } from "react";

function CreateMenu({ MenuInfo, IsOpen, SelectTap, MenuList }) {
  console.log("SelectTap", SelectTap);
  //카테고리 별 기존 메뉴 배열 생성

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("EVENT", event);
    const NewName = event.target[0].value;
    const newPrice = Number(event.target[1].value);
    const IsSoldOut = event.target[2].value;
    console.log(IsSoldOut, NewName, newPrice);
    //기존 카테고리의 메뉴리스트 저장
    let NewMenuList = [];
    Object.values(MenuList).map((menu) => {
      NewMenuList.push(`"${menu.menu_name}"`);
    });
    NewMenuList.push(`"${NewName}"`);
    console.log("NewMenuList", NewMenuList);
    const MakeMenu = async () => {
      await axios.post("http://127.0.0.1:8000/webKiosk/client/menu/create/", {
        market_name: "S",
        menu_name: `${NewName}`,
        price: `${newPrice}`,
      });
      console.log("new", `[${NewMenuList}]`);
      console.log("SelectTap", `${SelectTap}`);

      await axios
        .post("http://127.0.0.1:8000/webKiosk/client/meca/management/", {
          market_name: "S",
          category_name: `${SelectTap}`,
          menu_set: `[${NewMenuList}]`,
        })
        .then((response) => {
          console.log("response", response);
        });
    };

    MakeMenu();

    if (MakeMenu.data === "이미 동일한 이름이 존재합니다.") {
      alert(MakeMenu.data);
    } else {
      IsOpen(false);
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
          <input type="text" name="menu_name" id="NewName" />
        </div>
        <div>
          <label>가격</label>
          <input type="number" name="menu_price" id="NewPrice" />
        </div>
        <div>
          <label>메뉴상태</label>
          <select id="status">
            <option value={false}>판매중</option>
            <option value={true}>판매중지</option>
          </select>
        </div>
        <div>
          <label>사진</label>
          <input type="text" value="" />
        </div>
        <div>
          <label>옵션</label>
          <select></select>
        </div>
        <div>
          <label>옵션가격</label>
          <input type="text" value={""} />
        </div>
        <div>
          <button type="submit">메뉴생성</button>
          <button type="button" onClick={() => IsOpen(false)}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateMenu;
