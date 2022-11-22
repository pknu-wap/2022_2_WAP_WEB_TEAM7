import axios from "axios";
import { useEffect, useState } from "react";

function CreateMenu({ MenuInfo, IsOpen, SelectTap }) {
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
    const NewName = event.target[0].value;
    const newPrice = Number(event.target[1].value);
    const IsSoldOut = event.target[2].value;
    console.log(IsSoldOut, NewName, newPrice);
   
    const MakeMenu = async () =>
      await axios.post("http://127.0.0.1:8000/webKiosk/client/menu/create/", {
        market_name: "S",
        menu_name : `${NewName}`,
        price : `${newPrice}`,
      });
    const SetMeca = async () =>
        await axios.post("http://127.0.0.1:8000/webKiosk/client//meca/management/", {
            market_name: "S",
            menu_name : `${NewName}`,
            meca_name : `${SelectTap}`,
            });
            

    MakeMenu();
    SetMeca();
    if (MakeMenu.data === "이미 동일한 이름이 존재합니다.") {
      alert(MakeMenu.data);
    } else {
      IsOpen(false);
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
          />
        </div>
        <div>
          <label>가격</label>
          <input
            type="number"
            name="menu_price"
            id="NewPrice"
          />
        </div>
        <div>
          <label>메뉴상태</label>
          <select id="status">
            <option value={false}>
              판매중
            </option>
            <option value={true}>
              판매중지
            </option>
          </select>
        </div>
        <div>
          <label>사진</label>
          <input type="text" value="" />
        </div>
        <div>
          <label>옵션</label>
          <select>
            {optionList.map((item) => {
              console.log("item", item);
              console.log("optionlist", optionList);
              return (
                <option value={""} selected={""}>
                  {""}
                </option>
              );
            })}
          </select>
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