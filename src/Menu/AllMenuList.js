import axios from "axios";
import { useEffect, useState } from "react";
const AllMenuList = () => {
  //모든 데이터를 담을 변수
  const [Alldata, setAlldata] = useState([]);
  //전체 카테고리와 메뉴를 불러오기
  const allMenu = async () => {
    await axios
      .post("http://127.0.0.1:8000/webKiosk/download/", {
        market_name: "S",
      })
      .then((response) => {
        setAlldata(response.data);
      });
    return;
  };
  useEffect(() => {
    allMenu();
  }, []);

  if (Alldata === null || Alldata === undefined) {
    return <h2>메뉴가 없습니다.</h2>;
  }
  let index = 0;
  return (
    <div className="tableContainer">
      <table className="table">
        <thead>
          <tr id="tre">
            <th className="col">#</th>
            <th className="col">이름</th>
            <th className="col">수량</th>
            <th className="col">판매상태</th>
            <th className="col">###</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(Alldata).map((item) => {
            if (
              Alldata[item]["menu_set"] === undefined ||
              Alldata[item]["menu_set"] === null
            ) {
              return "로딩중입니다.";
            } else
              return Object.keys(Alldata[item]["menu_set"]).map((item2) => {
                return (
                  <tr key={index} id={index}>
                    <th>{index++}</th>
                    <td>{Alldata[item]["menu_set"][item2].menu_name}</td>
                  </tr>
                );
              });
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllMenuList;
