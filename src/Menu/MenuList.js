import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Edit from "./MenuEdit/Edit";
import CreateMenu from "./CreateMenu";

const MenuList = ({ categoryName, SelectTap }) => {
  //메뉴 데이터를 담을 변수
  const [Alldata, setAlldata] = useState([]);
  //전체 카테고리별 메뉴를 Alldata에 저장
  const allMenu = async () => {
    await axios
      .post("http://127.0.0.1:8000/webKiosk/meca/", {
        market_name: "S",
        category_name: categoryName,
      })
      .then((response) => {
        setAlldata(response.data);
      });
    return;
  };
// 메뉴 생성 모달 창을 열고 닫는 변수
const [IsplusOpen, setIsplusOpen] = useState(false);


  //모달 창을 열고 닫는 변수
  const [IsModalOpen, setIsModalOpen] = useState(false);
  //선택한 메뉴값을 모달에 전달하는 변수
  const [selectMenu, setSelectMenu] = useState([]);
  //처음에 한번 allMenu 실행
  useEffect(() => {
    allMenu();
  }, []);
  //Alldata 데이터가 없을때 처리
  if (Alldata === null || Alldata === undefined) {
    return <h2>메뉴가 없습니다.</h2>;
  }
  function MenuStatus(logic) {
    if (logic == true) {
      return "판매중지";
    } else {
      return "판매중";
    }
  }
  //리스트 작성 파트
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
            <th className="col"></th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(Alldata).map((menuindex) => {
            return (
              <tr key={index} id={index}>
                <th>{index++}</th>
                <td>{Alldata[menuindex].menu_name}</td>
                <td>{Alldata[menuindex].price + "원"}</td>
                <td>{MenuStatus(Alldata[menuindex].is_forbidden)}</td>
                <td>
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      setSelectMenu(Alldata[menuindex]);
                    }}
                  >
                    편집
                  </button>
                </td>
                <Modal show={IsModalOpen}>
                  <Edit
                    MenuInfo={selectMenu}
                    IsModalOpen={setIsModalOpen}
                  />
                </Modal>
                <Modal show={IsplusOpen}>
                  <CreateMenu SelectTap={SelectTap}IsOpen={setIsplusOpen} />
                </Modal>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className="MenuPlus" onClick={()=>setIsplusOpen(true)}>메뉴 추가하기</button>
    </div>
  );
};

export default MenuList;
