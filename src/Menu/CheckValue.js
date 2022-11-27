export function Check(event) {
  console.log("test", event.target.value);
  if (
    event.target.value.includes([
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
    ])
  ) {
    return false;
  } else {
    return true;
  }
}
