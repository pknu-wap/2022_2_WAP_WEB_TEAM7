import "./MenuTap.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AllMenuList from "./AllMenuList";
import { useEffect, useState } from "react";
import axios from "axios";
import MenuList from "./MenuList";
function MenuTap() {
  const [Alldata, setAlldata] = useState([]);

  const allMenu = async () => {
    await axios
      .post("http://127.0.0.1:8000/webKiosk/client/meca/download/", {
        market_name: "S",
      })
      .then((response) => {
        setAlldata(response.data);
      });
  };
  useEffect(() => {
    allMenu();
  }, []);

  return (
    <Tabs defaultActiveKey="0" id="uncontrolled-tab-example" className="mb-3">
      {Object.keys(Alldata).map((item) => {
        return (
          <Tab
            key={item}
            eventKey={item}
            title={Alldata[item]["category_name"]}
          >
            <MenuList categoryName={Alldata[item]["category_name"]} />
          </Tab>
        );
      })}
      <Tab eventKey={"MenuManage"} title={"메뉴관리"}>
        <AllMenuList />
      </Tab>
    </Tabs>
  );
}

export default MenuTap;
