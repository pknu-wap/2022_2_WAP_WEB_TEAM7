import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import React, { useEffect, useState } from "react";

const OptionEdit = ({ optionName, optionList, show }) => {
  //옵션 종류 추가하는 기능
  const [inputList, setInputList] = useState([]);
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
  }
  //선택한 옵션의 하위 항목을 담을 변수
  const [subOption, setsubOption] = useState("");
  //선택한 옵션의 하위 항목만 골라내기
  useEffect(() => {
    let suboptionlist = "";
    optionList.map((item, index) => {
      if (item.option_name === optionName) {
        suboptionlist = JSON.parse(item.option_list);
        setsubOption(item.option_list);
      }
    });
  }, []);
  // 옵션 편집시 옵션 갯수 추가 조절 가능하도록 기능 추가 중
  //   console.log("suboptionlist", suboptionlist);
  //   Object.entries(suboptionlist).map((content, idx) => {
  //     console.log("idx", idx);
  //     console.log("name", content[0]);
  //     console.log("value", content[1]);
  //     let list = [...inputList];
  //     console.log("list", list);
  //     list[idx] = { Name: content[0], Price: content[1] };
  //     console.log();
  //     setInputList(list);
  //   });
  // }, []);
  // useEffect(() => {
  //   console.log("inputList", inputList);
  // }, [inputList]);

  function handlesubmit(event) {
    console.log("event", event.target.length);
    event.preventDefault();
    const option_name = event.target[0].value;
    //옵션 항목 목록을 문자열로 저장하는 과정
    let option_list = "{";
    for (let i = 1; i < event.target.length - 2; i++) {
      if (i % 2 == 0) {
        option_list +=
          `"${event.target[i - 1].value}"` +
          ":" +
          String(event.target[i].value);
        if (i != event.target.length - 3) {
          option_list += ",";
        }
      }
    }
    option_list += "}";

    console.log(option_list);

    const data = async () => {
      let dummy = `option_name`;
      if (option_name === optionName) {
        dummy = "dummyData";
      }
      await axios
        .post("http://127.0.0.1:8000/webKiosk/client/option/update/", {
          market_name: "S",
          old_name: optionName,
          new: `{"${dummy}": "${option_name}", "option_list":${JSON.stringify(
            option_list
          ).replace("/", "")}}`,
        })
        .then((response) => {
          console.log(response);
        });
    };
    data();
    show(false);
    window.location.reload();
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
      {Object.keys(sub[0]).map((item, i) => {
        return (
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Row>
              <Col>
                <Form.Label>항목{i + 1} 이름</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="이름을 입력해주세요"
                  defaultValue={item}
                  required
                />
              </Col>
              <Col>
                <Form.Label>항목{i + 1} 가격</Form.Label>
                <Form.Control
                  type="Number"
                  placeholder="Last name"
                  min="0"
                  defaultValue={sub[0][item]}
                  required
                />
              </Col>
            </Row>
          </Form.Group>
        );
      })}
      <Button variant="primary" type="submit">
        생성하기
      </Button>
      <Button type="button" onClick={() => show(false)}>
        취소하기
      </Button>
      {/* 추가 기능 태스트용 코드 */}
      {/* <h2>test{JSON.stringify(inputList)}</h2> */}
    </Form>
  );
};

export default OptionEdit;
