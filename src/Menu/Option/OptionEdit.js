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
    if (e.target.value.includes(["'", '"'])) {
      console.log("e", typeof e.target.value);
      alert("특수문자는 사용할 수 없습니다.");
      e.target.value = "";
      return;
    } else {
      const { name, value } = e.target;

      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
    }
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

  //선택한 옵션의 하위 항목을 담을 변수
  const [subOption, setsubOption] = useState("");
  //선택한 옵션의 하위 항목만 골라내기
  let suboptionlist = "";

  useEffect(() => {
    optionList.map((item, index) => {
      if (item.option_name === optionName) {
        suboptionlist = JSON.parse(item.option_list);
        // 옵션을 한꺼번에 배열에 담아서 보내기
        let SubOptionTemp = [];
        Object.entries(suboptionlist).map((item, index) => {
          console.log("test", item);
          SubOptionTemp.push({ Name: item[0], Price: item[1] });
        });
        setInputList(SubOptionTemp);
        setsubOption(item.option_list);
      }
    });
  }, []);
  // 옵션 편집시 옵션 갯수 추가 조절 가능하도록 기능 추가 중
  console.log("suboptionlist", subOption);
  Object.entries(suboptionlist).map((content, idx) => {
    console.log("idx", idx);
    console.log("name", content[0]);
    console.log("value", content[1]);
    let list = [...inputList];
    console.log("list", list);
    list[idx] = { Name: content[0], Price: content[1] };
    console.log();
    setInputList(list);
  });

  function handlesubmit(event) {
    console.log("event", event.target);

    event.preventDefault();
    const option_name = event.target[0].value;
    // 옵션 항목 목록을 문자열로 저장하는 과정
    // 항목 1개만 있는 경우
    let option_list = "{";
    option_list += `"${event.target[1].value}" : ${event.target[2].value}`;
    //항목 2개 이상 있는 경우만
    if (event.target.length !== 6) {
      option_list += ",";
      for (let i = 4; i < event.target.length - 4; i += 3) {
        option_list +=
          `"${event.target[i].value}"` +
          ":" +
          String(event.target[i + 1].value);
        option_list += ",";
      }
      //끝에 쉼표 제거
      option_list = option_list.substring(0, option_list.length - 1);

      option_list += "}";
    }

    // console.log(option_list);

    // function handlesubmit(event) {
    //   console.log("event", event);
    //   event.preventDefault();
    //   const option_name = event.target[0].value;
    //   const option_list = {};
    //   inputList.map((item) => {
    //     option_list[item.Name] = Number(item.Price);
    //   });

    console.log("option_list", option_list);
    const data = async () => {
      let dummy = `option_name`;
      if (option_name === optionName) {
        dummy = "dummyData";
      }
      await axios
        .post("http://127.0.0.1:8000/webKiosk/client/option/update/", {
          market_name: "S",
          old_name: optionName,
          new: `{"${dummy}": "${option_name}", "option_list": ${JSON.stringify(
            option_list
          )}}`,
        })
        .then((response) => {
          console.log(response);
        });
    };
    data();
    show(false);
    // window.location.reload();
  }
  const sublist = JSON.parse(`[${subOption}]`);
  if (sublist[0] === null || sublist[0] === undefined) {
    return;
  }
  console.log(sublist[0]);
  return (
    <Form onSubmit={(e) => handlesubmit(e)}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>옵션 이름</Form.Label>
          <Form.Control type="text" defaultValue={optionName} />
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
                    onChange={(e) => handleInputChange(e, i)}
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
                  type="button"
                  className="mr10"
                  onClick={() => handleRemoveClick(i)}
                >
                  삭제
                </button>
              )}
              {inputList.length - 1 === i && (
                <button type="button" onClick={handleAddClick}>
                  항목추가
                </button>
              )}
            </div>
          </div>
        );
      })}
      <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>

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
