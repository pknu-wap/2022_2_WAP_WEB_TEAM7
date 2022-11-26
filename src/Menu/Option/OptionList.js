import axios from "axios";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import OptionCreate from "./OptionCreate";
import { OptionDel } from "./OptionDel";
import OptionEdit from "./OptionEdit";
const OptionList = () => {
  //모달 창 상태 변수
  const [show, setShow] = useState(false);
  // 편집 모달 창 변수
  const [IsEditOpen, setIsEditOpen] = useState(false);
  //옵션 데이터를 담을 변수
  const [options, setOption] = useState([]);
  // 선택한 옵션의 이름을 담을 변수
  const [optionName, setOptionName] = useState("");
  //옵션 불러오는 함수
  const OptionGroup = async () =>
    await axios
      .post("http://127.0.0.1:8000/webKiosk/client/option/read/", {
        market_name: "S",
      })
      .then((response) => {
        console.log("test", response.data);
        setOption(response.data);
      });
  // 처음 렌더링 될 때 옵션 불러오기
  useEffect(() => {
    OptionGroup();
  }, []);
  // 모달 창 닫힐 때 옵션 다시 불러오기
  useEffect(() => {
    OptionGroup();
    console.log("show");
  }, [show]);
  let index = 0;
  return (
    <>
      <Table striped="columns">
        <thead>
          <tr>
            <th>#</th>
            <th>옵션 이름</th>
            <th>옵션 속성</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(options).map((option) => {
            const detailOption = option.option_list.replaceAll("'", '"');
            return (
              <>
                <tr key={index} id={index}>
                  <th>{index++}</th>
                  <td>{option.option_name}</td>
                  <td>{`${detailOption}`.replace("{", "").replace("}", "")}</td>
                  <td>
                    <button
                      onClick={() => {
                        setOptionName(option.option_name);
                        setIsEditOpen(true);
                      }}
                    >
                      편집
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        OptionDel(option.option_name, detailOption)
                      }
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
      <Modal show={show}>
        <OptionCreate show={setShow} />
      </Modal>
      <Modal show={IsEditOpen}>
        <OptionEdit
          optionList={options}
          optionName={optionName}
          show={setIsEditOpen}
        />
      </Modal>
      <button onClick={() => setShow(true)}>옵션 추가하기</button>
    </>
  );
};

export default OptionList;
