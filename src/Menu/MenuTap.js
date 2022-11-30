import "./MenuTap.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AllMenuList from "./AllMenuList";
import { useEffect, useState } from "react";
import axios from "axios";
import MenuList from "./MenuList";
import CategoryList from "./CategoryList";
import OptionList from "./Option/OptionList";
// import "bootstrap/dist/css/bootstrap.min.css";

//선택한 tap번호 세션통해 불러오기
function Oldtap(tapId) {
  if (sessionStorage) {
    // Store data
    sessionStorage.setItem("selectTap", tapId);
  }
}

function MenuTap() {
  const [Alldata, setAlldata] = useState([]);
  const [key, setKey] = useState(
    sessionStorage.getItem("selectTap") === null
      ? "0"
      : sessionStorage.getItem("selectTap")
  );

  const allMenu = async () => {
    await axios
      .post("http://127.0.0.1:8000/webKiosk/download/", {
        market_name: "S",
      })
      .then((response) => {
        setAlldata(response.data);
      });
  };
  useEffect(() => {
    allMenu();
  }, []);
  console.log("alldata", Alldata);
  if (Alldata === null || Alldata === undefined) {
    return <h2>메뉴가 없습니다.</h2>;
  }
  return (
    <Tabs
      defaultActiveKey="0"
      id="uncontrolled-tab-example"
      className="mb-3"
      activeKey={key}
      onSelect={(k) => {
        setKey(k);
        Oldtap(k);
      }}
    >
      {Object.keys(Alldata).map((item) => {
        return (
          <Tab
            key={item}
            eventKey={item}
            title={Alldata[item]["category_name"]}
          >
            <MenuList
              categoryName={Alldata[item]["category_name"]}
              SelectTap={Alldata[item]["category_name"]}
            />
          </Tab>
        );
      })}
      {/* <Tab title={"전체메뉴"} eventKey={"test"} hide>
        <AllMenuList />
      </Tab> */}
      <Tab eventKey={"EditCategory"} title={"카테고리 설정"}>
        <CategoryList />
      </Tab>
      <Tab eventKey={"EditOption"} title={"옵션 설정"}>
        <OptionList />
      </Tab>
    </Tabs>
  );
}

export default MenuTap;
