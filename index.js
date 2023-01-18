const textField = document.getElementById("textArea");
const btn = document.getElementById("submitBtn");
const dateEl = document.getElementById("starttime");
const lobEl = document.getElementById("lob");
const policyNoEl = document.getElementById("policynumbers");
const subIdEl = document.getElementById("sid");
const assuredEl = document.getElementById("assured");
// const marketEl = document.getElementById();

function getStringBetween(delimiter1, delimiter2, string) {
  const regexStr = new RegExp(
    `(?<=${delimiter1})(.|\r|\n)*(?=${delimiter2})`,
    "gi"
  );
  const valueFound = string.match(regexStr);
  console.log(valueFound);
  return valueFound;
}

let subIdRegex = /S-[0-9]*-[0-9]*/gim;
let policyNumberRegex1 =
  /[0-9]{6}\/[0-9]{2}\/[0-9]{4} | [0-9]{6}\/[0-9]{2}\/[0-9]{4}\/[0-9]{4}/gm;
let policyNumberRegex2 = /[0-9]{6}\/[0-9]{2}\/[0-9]{4}\/[0-9]{4}/gm;

btn.addEventListener("click", () => {
  const inputData = textField.value;
  //   const inputDataArray= inputData.value.split("\n")
  let policyNumberArray = inputData.match(policyNumberRegex1);
  const policyNumberArray2 = inputData.match(policyNumberRegex2);
  if (policyNumberArray2) {
    policyNumberArray = [...policyNumberArray, ...policyNumberArray2];
  }

  const startDate = Date(Date.now()).toString();
  // const activityEntered = the drop down Value
  const lobEntered = getStringBetween("CLASS:", "BROKER:", inputData);
  const policyNoEntered = policyNumberArray.toString();
  console.log(policyNumberArray);
  let marketEnteredArr = [];
  policyNumberArray.forEach((item) => {
    marketEnteredArr.push(item.slice(7, 9));
  });
  let marketEnteredStr = marketEnteredArr.map((item) =>
    Number(item) >= 61 ? "SYD" : "EU"
  );
  const marketEntered = marketEnteredStr;
  //   const typeEntered = ;
  const subIdEntered = inputData.match(subIdRegex).toString().toUpperCase();
  const assuredEntered = getStringBetween(
    "ASSURED:",
    "BROKER CONTACT:",
    inputData
  );
  // const endTimeEntered = CARD BUTTON eVENT
  // const ahtEntered = CANNOT CAL
  // const commentsEntered = ;

  const obj = {
    startTime: startDate,
    // activity: "",
    lob: lobEntered,
    policyNo: policyNoEntered,
    market: marketEntered,
    // type: typeEntered,
    subId: subIdEntered,
    assured: assuredEntered,
    // endTime: "",
    // aht: "",
    // comments: "",
  };
  console.log(obj);
  let newAssuredString = "";

  console.log(newAssuredString);
  dateEl.innerText = obj.startTime;
  lobEl.innerText = obj.lob;
  policyNoEl.innerText = obj.policyNo;
  subIdEl.innerText = obj.subId;
  assuredEl.innerText = obj.assured;
});
