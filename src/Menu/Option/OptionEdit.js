import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import React, { useEffect, useState } from "react";

const OptionEdit = ({ optionName, optionList, show }) => {
  console.log(JSON.stringify(optionList));
  //선택한 옵션의 하위 항목을 담을 변수
  const [subOption, setsubOption] = useState("");
  //선택한 옵션의 하위 항목만 골라내기
  useEffect(() => {
    optionList.map((item) => {
      if (item.option_name === optionName) {
        setsubOption(item.option_list);
      }
    });
  }, []);
  useEffect(() => {
    console.log(JSON.parse(`[${subOption}]`));
  }, [subOption]);

  function handlesubmit(event) {
    console.log("event", event.target.length);
    event.preventDefault();
    const option_name = event.target[0].value;
    const option_list = {};
    for (let i = 1; i < event.target.length - 2; i++) {
      if (i % 2 == 0) {
        option_list[event.target[i - 1].value] = Number(event.target[i].value);
      }
    }

    console.log(JSON.stringify(option_list));

    const data = async () => {
      await axios
        .post("http://127.0.0.1:8000/webKiosk/client/option/update/", {
          market_name: "S",
          old_name: optionName,
          new: JSON.stringify(optionList),
        })
        .then((response) => {
          console.log(response);
        });
    };
  }
  const sub = JSON.parse(`[${subOption}]`);
  if (sub[0] === null || sub[0] === undefined) {
    return;
  }
  console.log(sub[0]);
  return (
    <Form onSubmit={(e) => handlesubmit(e)}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>옵션 이름</Form.Label>
          <Form.Control type="text" defaultValue={optionName} />
        </Form.Group>
      </Row>
      {Object.keys(sub[0]).map((item) => {
        return (
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Row>
              <Col>
                <Form.Label>항목1 이름</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="이름을 입력해주세요"
                  defaultValue={item}
                />
              </Col>
              <Col>
                <Form.Label>항목1 가격</Form.Label>
                <Form.Control
                  type="Number"
                  placeholder="Last name"
                  min="0"
                  defaultValue={sub[0][item]}
                />
              </Col>
            </Row>
          </Form.Group>
        );
      })}

      {/* <Form.Group className="mb-3" controlId="formGridAddress1">
        <Row>
          <Col>
            <Form.Label>항목1 이름</Form.Label>
            <Form.Control
              placeholder="이름을 입력해주세요"
              defaultValue={sub[0]}
            />
          </Col>
          <Col>
            <Form.Label>항목1 가격</Form.Label>
            <Form.Control type="Number" placeholder="Last name" min="0" />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Row>
          <Col>
            <Form.Label>항목1 이름</Form.Label>
            <Form.Control placeholder="이름을 입력해주세요" />
          </Col>
          <Col>
            <Form.Label>항목1 가격</Form.Label>
            <Form.Control type="Number" placeholder="Last name" min="0" />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Row>
          <Col>
            <Form.Label>항목3 이름</Form.Label>
            <Form.Control placeholder="이름을 입력해주세요" />
          </Col>
          <Col>
            <Form.Label>항목3 가격</Form.Label>
            <Form.Control type="Number" placeholder="Last name" min="0" />
          </Col>
        </Row>
      </Form.Group> */}
      <Button variant="primary" type="submit">
        생성하기
      </Button>
      <Button type="button" onClick={() => show(false)}>
        취소하기
      </Button>
    </Form>
  );
};

export default OptionEdit;
