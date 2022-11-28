import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ListGroup } from "react-bootstrap";
import { DelCategory } from "./DeleteCategory";
import EditCategory from "./EditCategory";
import { Check } from "./CheckValue";
import style from "./Menu.module.css";

const CategoryList = () => {
  const [update, setupdate] = useState([]);
  //카테고리추가모달 창 상태 변수
  const [show, setShow] = useState(false);
  // 카테고리 수정 모달 창 상태 변수
  const [showEdit, setShowEdit] = useState(false);
  // 선택한 카테고리 이름 담을 변수
  const [selectCategory, setSelectCategory] = useState([]);
  // 유효성 검사값 초기화용 변수
  const [check, setCheck] = useState(null);
  //카테고리 데이터를 담을 변수
  const [category, setCategory] = useState([]);
  // 카테고리 추가 함수
  async function PlusCategory(event) {
    event.preventDefault();
    await axios
      .post("http://127.0.0.1:8000/webKiosk/client/category/create/", {
        market_name: "S",
        category_name: event.target[0].value,
      })
      .then((response) => {
        if (`${response.data}`.includes("이미")) {
          alert(response.data);
        } else {
          setShow(false);
          setupdate([...update]);
        }
      });
  }

  const Category = async () =>
    await axios
      .post("http://127.0.0.1:8000/webKiosk/client/category/read/", {
        market_name: "S",
      })
      .then((response) => {
        setCategory(response.data);
      });
  useEffect(() => {
    Category();
  }, []);

  return (
    <>
      <ListGroup>
        {Object.values(category).map((item) => {
          return (
            <>
              <ListGroup.Item>
                <span>{item.category_name} </span>
                <button
                  className={style.Edit}
                  value={item.category_name}
                  onClick={(e) => DelCategory(e)}
                >
                  삭제
                </button>
                <button
                  className={style.Edit}
                  onClick={() => {
                    setShowEdit(true);
                    setSelectCategory(item.category_name);
                  }}
                >
                  수정
                </button>
              </ListGroup.Item>
            </>
          );
        })}
      </ListGroup>
      <button className={style.Edit} onClick={() => setShow(true)}>
        추가
      </button>
      <Modal show={show}>
        <h2>새 카테고리 이름을 입력해주세요</h2>
        <Form onSubmit={(e) => PlusCategory(e)}>
          <Form.Control
            size="lg"
            type="text"
            placeholder="생성할 카테고리 이름"
            defaultValue={""}
            onChange={(e) => {
              Check(e);
            }}
          />
          <button type="submit">확인</button>
          <button type="button" onClick={() => setShow(false)}>
            취소
          </button>
        </Form>
      </Modal>
      <Modal show={showEdit}>
        <EditCategory show={setShowEdit} OldCategory={selectCategory} />
      </Modal>
    </>
  );
};

export default CategoryList;
// Path: src\Menu\MenuEdit\MenuEdit.js
