import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import React, { useState } from "react";
import style from "./Edit.module.css";
import { Check } from "../CheckValue";

const OptionCreate = ({ show }) => {
  //옵션 종류 추가하는 기능
  const [inputList, setInputList] = useState([{ Name: "", Price: "" }]);
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { Name: "", Price: "" }]);
  };

  function handlesubmit(event) {
    console.log("event", event);
    event.preventDefault();
    const option_name = event.target[0].value;
    const option_list = {};
    inputList.map((item) => {
      option_list[item.Name] = Number(item.Price);
    });

    const data = async () =>
      await axios
        .post("http://127.0.0.1:8000/webKiosk/client/option/create/", {
          market_name: "S",
          option_name: option_name,
          option_list: JSON.stringify(option_list),
        })
        .then((response) => {
          console.log(response);
        });
    data();
    show(false);
    window.location.reload();
  }

  // axios
  return (
    <Form onSubmit={(e) => handlesubmit(e)}>
      <div className="App">
        <h3>옵션 세부 항목 설정</h3>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>옵션 이름</Form.Label>
            <Form.Control
              type="text"
              placeholder="옵션 이름을 입력해주세요"
              onChange={(e) => Check(e)}
              required
            />
          </Form.Group>
        </Row>
        {inputList.map((x, i) => {
          return (
            <div className="box">
              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Row>
                  <Col>
                    <Form.Label>{i + 1}번 항목 이름</Form.Label>
                    <Form.Control
                      required
                      type="input"
                      placeholder="이름을 입력해주세요"
                      name="Name"
                      value={x.Name}
                      onChange={(e) => {
                        Check(e);

                        handleInputChange(e, i);
                      }}
                    />
                  </Col>
                  <Col>
                    <Form.Label>{i + 1}번 항목 가격</Form.Label>
                    <Form.Control
                      type="Number"
                      placeholder="가격을 입력하세요"
                      name="Price"
                      min="0"
                      value={x.Price}
                      onChange={(e) => handleInputChange(e, i)}
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
              <div className="btn-box">
                {inputList.length !== 1 && (
                  <button
                    className={style.Edit}
                    onClick={() => handleRemoveClick(i)}
                  >
                    삭제
                  </button>
                )}
                {inputList.length - 1 === i && (
                  <button className={style.Edit} onClick={handleAddClick}>
                    항목추가
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <br></br>
      <Button variant="primary" type="submit">
        생성하기
      </Button>
      <Button type="button" onClick={() => show(false)}>
        취소하기
      </Button>
    </Form>
  );
};

export default OptionCreate;
