export function Check(event, callback) {
  const testCase = [
    "'",
    '"',
    "`",
    "!",
    "@",
    "#",
    "$",
    "=",
    "+",
    "[",
    "]",
    "{",
    "}",
    "|",
    "\\",
    ":",
    ";",
    "<",
    ">",
    "?",
    "/",
    "~",
    "`",
    ".",
  ];
  testCase.map((item) => {
    console.log(event.target.value);
    if (event.target.value.includes(item)) {
      window.alert("특수문자는 입력할 수 없습니다.");
      event.target.value = null;
    } else {
      return;
    }
  });
}
