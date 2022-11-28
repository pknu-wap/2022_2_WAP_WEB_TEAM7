import axios from "axios";
import { useEffect, useState } from "react";
const AllMenuList = () => {
  //모든 데이터를 담을 변수
  const [Alldata, setAlldata] = useState([]);
  //전체 카테고리와 메뉴를 불러오기
  const allMenu = async () => {
    await axios
      .post("http://127.0.0.1:8000/webKiosk/client/menu/read/", {
        market_name: "S",
      })
      .then((response) => {
        setAlldata(response.data);
      });
    return;
  };
  function MenuStatus(logic) {
    if (logic == true) {
      return "판매중지";
    } else {
      return "판매중";
    }
  }
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
            <th className="col">가격</th>
            <th className="col">판매상태</th>
            <th className="col">###</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(Alldata).map((item) => {
            return (
              <tr key={index} id={index}>
                <th>{index++}</th>
                <td>{item.menu_name}</td>
                <td>{item.price}</td>
                <td>{MenuStatus(item.is_forbidden)}</td>
                <td></td>
              </tr>
            );
          })}
          ;
        </tbody>
      </table>
    </div>
  );
};

export default AllMenuList;