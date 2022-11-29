import axios from "axios";
import Form from "react-bootstrap/Form";
import { ListGroup } from "react-bootstrap";
import { Check } from "./CheckValue";
import style from "./Option/Edit.module.css";

function EditCate(e, OldName, NewName) {
  e.preventDefault();
  console.log(OldName, NewName);
  axios
    .post("http://127.0.0.1:8000/webKiosk/client/category/update/", {
      market_name: "S",
      old_name: `${OldName}`,
      new: `{ "market_name" : "S", "category_name" : "${NewName}"}`,
    })
    .then((response) => {
      console.log(response);
    });
  window.location.reload();
}
const EditCategory = ({ show, OldCategory }) => {
  return (
    <Form
      onSubmit={(e) => {
        EditCate(e, OldCategory, e.target[0].value);
      }}
    >
      <label>수정할 카테고리 이름을 입력하세요</label>
      <Form.Control
        size="lg"
        type="text"
        placeholder="수정할 카테고리 이름"
        defaultValue={OldCategory}
        required
        onChange={(e) => {
          Check(e);
        }}
      />
      <button className={style.Edit} type="submit">
        확인
      </button>
      <button className={style.Edit} type="button" onClick={() => show(false)}>
        취소
      </button>
    </Form>
  );
};
export default EditCategory;
