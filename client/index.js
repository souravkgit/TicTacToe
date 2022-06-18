var colors = [];
var urli = "";

if (window.location.href.split('?')[1]) {
  let stri = window.location.href.split('?')[0];
  urli = stri;
  if (stri.includes("start")) {
    if (window.location.href.split('?')[1].split("=")[1] == 0) {
      console.log("nothing just simple page");
    }
    else {
      let roomcode = window.location.href.split('?')[1].split("=")[1]
      document.getElementById("room").value = roomcode;
    }
  }
  else if (stri.includes("random")) {
    window.location.href = stri;
  }
}
else {
  urli = window.location.href.split('?')[0];
}

const onClick = (event) => {
  var curr = event.srcElement.id;
  if (curr.length > 0) {
    if (curr.substring(0, 3) == "img") {
      if (colors.length >= 1) {
        if (colors.length == 1) {
          if (colors[0] == curr) {
            document.getElementById(curr).style.borderColor = "red";
            colors = [];
            return;
          }
        }
        for (let i = 0; i < colors.length; i++) {
          var chn = colors[i];
          document.getElementById(chn).style.borderColor = "red";
        }
        colors = []
      }
      document.getElementById(curr).style.borderColor = "blue";
      colors.push(curr)
    }
  }
}
window.addEventListener('click', onClick);

function CreateRoom() {
  if (colors.length != 1) {
    window.alert("Please atleast select one character as profile pic!");
    return;
  }
  var name = document.getElementById("name").value;
  if (!name || name.length < 3) {
    window.alert("Input name is invalid!!");
    return;
  }
  localStorage.setItem("color", colors);
  localStorage.setItem("name", name);
  let ret = urli.replace("start", "join")
  console.log(ret);
  window.location.href = ret + "?room=private";
}

function Enter() {
  console.log(colors);
  if (colors.length != 1) {
    window.alert("Please atleast select one character as profile pic!");
    return;
  }
  var name = document.getElementById("name").value;
  if (!name || name.length < 3) {
    window.alert("Input name is invalid!!");
    return;
  }
  var roomcode = document.getElementById("room").value;
  localStorage.setItem("color", colors);
  localStorage.setItem("name", name);
  let ret = urli.replace("start", "join")
  window.location.href = ret + "?room=" + roomcode;
}

function REnter() {
  console.log(colors);
  if (colors.length != 1) {
    window.alert("Please atleast select one character as profile pic!");
    return;
  }
  var name = document.getElementById("name").value;
  if (!name || name.length < 3) {
    window.alert("Input name is invalid!!");
    return;
  }
  localStorage.setItem("color", colors);
  localStorage.setItem("name", name);
  let ret = urli.replace("random", "join")
  window.location.href = ret + "?room=any";
}