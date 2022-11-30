import axios from "axios";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Check } from "../CheckValue";
import Menu from "../Menu";
import style from "../Option/Edit.module.css";
function Edit({ MenuInfo, IsModalOpen, rerender }) {
  //옵션 데이터 담을 state 변수
  const [optionList, setoptionList] = useState([]);
  const [OldOptionList, setOldOptionList] = useState([]);
  //  로딩중 스테이트 변수
  const [isLoading, setisLoading] = useState(true);
  // 그림을 담을 state 변수
  const [image, setImage] = useState(null);
  // optionList에서 옵션 이름만 포함해서 담을 배열
  let optionNameList = [];
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
    // 메뉴에 어떤 옵션이 들어가는 지 수정을 위한 함수
    const UpdateOption = async () => {
      const chkList = document.querySelectorAll("input[prop=option]:checked");
      const chkListArr = [];
      Object.values(chkList).map((item) => {
        chkListArr.push(`"${item.name}"`);
      });

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

    IsModalOpen(false);
    window.location.reload();
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
            required
            onChange={(e) => {
              Check(e);
            }}
          />
        </div>
        <div>
          <label>가격</label>
          <input
            type="number"
            name="menu_price"
            id="NewPrice"
            defaultValue={MenuInfo.price}
            required
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
          {/* <div style={{}}>
            <label>현재사진</label>
            <img
              src={"http://127.0.0.1:8000" + MenuInfo.menu_image}
              style={{ width: 100, border: "1px solid black" }}
            ></img>
            <br></br>
            <input type="file" onChange={(e) => setImage(e.target.value)} />
          </div> */}
        </div>
        <div>
          <label>옵션을 선택하세요</label>
          <br></br>
          {Object.values(OldOptionList).map((olditem) => {
            optionNameList.push(olditem.option_name);
          })}
          {Object.values(optionList).map((item) => {
            console.log("item", item.option_name);
            console.log("OptionNameList", optionNameList);

            let ischk;
            if (optionNameList.includes(item.option_name)) {
              ischk = "checked";
            } else {
              ischk = null;
            }
            console.log(ischk);
            return (
              <span>
                <label>
                  <input
                    type="checkbox"
                    prop="option"
                    name={item.option_name}
                    defaultChecked={ischk}
                  />
                  {item.option_name}
                </label>
              </span>
            );
          })}
        </div>

        <div>
          <button className={style.Edit} type="submit">
            메뉴수정
          </button>
          <button
            className={style.Edit}
            type="button"
            onClick={() => IsModalOpen(false)}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
