import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Check } from "./CheckValue.js";

function CreateMenu({ MenuInfo, IsOpen, SelectTap, MenuList }) {
  console.log("SelectTap", SelectTap);
  const fileInputRef = useRef(null);
  //이미지를 저장할 usestate변수
  const [MenuImage, setMenuImage] = useState("");
  const onImgChange = (e) => {
    console.log("evnet", e);
    const img = e.target.files[0];
    setMenuImage(img);
    console.log("img" + img);
  };
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
    //이름 중복 여부 변수
    let IsNameDuplicated = false;
    Object.values(MenuList).map((menu) => {
      NewMenuList.push(`"${menu.menu_name}"`);
    });
    console.log("NewMenuList", NewMenuList);
    const MakeMenu = async () => {
      const formData = new FormData();
      formData.append("market_name", "S");
      formData.append("menu_name", `${NewName}`);
      formData.append("price", newPrice);
      //메뉴 이미지가 있는 경우에만 추가
      if (MenuImage !== null) {
        formData.append("menu_image", MenuImage);
      }
      formData.append("is_forbidden", IsSoldOut);
      formData.append("enctype", "multipart/form-data");
      await axios
        .post("http://127.0.0.1:8000/webKiosk/client/menu/create/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log("res", res.data);
          if (`${res.data}`.includes("이미")) {
            IsNameDuplicated = true;
            alert(res.data);
          } else {
            NewMenuList.push(`"${NewName}"`);
          }
        });
      console.log("new", `[${NewMenuList}]`);
      console.log("SelectTap", `${SelectTap}`);
      console.log("IsNameDuplicated", IsNameDuplicated);
      if (!IsNameDuplicated) {
        await axios
          .post("http://127.0.0.1:8000/webKiosk/client/meca/management/", {
            market_name: "S",
            category_name: `${SelectTap}`,
            menu_set: `[${NewMenuList}]`,
          })
          .then((response) => {
            console.log("response", response);
          });
        IsOpen(false);
        window.location.reload();
      }
    };
    const res = MakeMenu();
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
            required
            type="text"
            name="menu_name"
            id="NewName"
            onChange={(e) => {
              console.log(Check(e));
              if (Check(e) === true) {
                alert("특수문자는 사용할 수 없습니다.");
              }
            }}
          />
        </div>
        <div>
          <label>가격</label>
          <input required type="number" name="menu_price" id="NewPrice" />
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
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => onImgChange(e)}
          />
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
