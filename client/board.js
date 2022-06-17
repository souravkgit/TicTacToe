// var socket = io();
var socket = io('/');

window.onload = chngp();
function chngp() {
    let colors = localStorage.getItem("color");
    let name = localStorage.getItem("name");
    console.log(colors);
    document.getElementById("ppic").setAttribute("src", "./Utils/logo" + colors[3] + ".jpeg");
    document.getElementById("pname").innerHTML = name;
}
if (window.location.href.split('?')[1]) {
    if (!window.location.href.split('?')[1].split("=")[1]) {
        socket.emit("createroom");
    }
    else {
        socket.emit("joinroom", window.location.href.split('?')[1].split("=")[1]);
    }
}
else {
    socket.emit("joinany");
}
const span = document.querySelector("span");
span.onclick = function () {
    document.execCommand("copy");
}
span.addEventListener("copy", function (event) {
    event.preventDefault();
    if (event.clipboardData) {
        event.clipboardData.setData("text/plain", span.textContent);
        console.log(event.clipboardData.getData("text"))
    }
});

var boxes = document.querySelectorAll('.cell');
var player_id = 0;
var symbol = "";
var room_id = "";
var gameover = false;
var canclick = false;
socket.on("dis", (room) => {
    for (let index = 1; index < 10; index++) {
        document.getElementById(index).innerHTML = "";
    }
    document.getElementById('logs').innerHTML = "Your opponent have left the game";
    document.getElementById("text").innerHTML = "Room Code : <span>" + room + "</span>";
})
socket.on("link", (rm) => {
    document.getElementById("text").innerHTML = "Room Code : <span>" + rm + "</span>";
})
socket.on("player_connected", (s) => {
    if (player_id === 0) {
        if (s === 1) {
            symbol = "X";
            player_id = 1;
        }
        else if (s === 2) {
            symbol = "O";
            player_id = 2;
        }

    }
    if (s === 3) {
        symbol = "X";
        player_id = 1;
    }
})
socket.on("reload", (pid) => {
    gameover = false;
    for (let index = 1; index < 10; index++) {
        document.getElementById(index).innerHTML = "";
    }
    if (player_id == pid) {
        canclick = true;
        document.getElementById('logs').innerHTML = "New Game started , Your Turn";
    }
    else {
        document.getElementById('logs').innerHTML = "New Game started , Opponent's Turn";
        canclick = false;
    }
    // document.getElementById('rs_btn').style.display = "none";
})
socket.on("gamestart", (room) => {
    room_id = room;
    if (player_id === 1) {
        canclick = true;
        document.getElementById('logs').innerHTML = "Game Started , Your Turn";
    }
    else {
        document.getElementById('logs').innerHTML = "Game Started , Opponents's Turn";
    }
    document.getElementById("text").innerHTML = "Room Code : <span>" + room_id + "</span>";
})
socket.on("gameover", (id) => {
    if (player_id === id) {
        document.getElementById('logs').innerHTML = "You have won this round";
    }
    else {
        document.getElementById('logs').innerHTML = "Your opponent has won this round";
    }
    // document.getElementById('rs_btn').style.display = "inherit";
    gameover = true;
})
socket.on("update_grid", (id, s) => {
    if (s === "X") {
        document.getElementById(id).innerHTML = "X";
    }
    else {
        document.getElementById(id).innerHTML = "O";
    }
    document.getElementById(id).classList.add("pop");
    setTimeout(() => {
        document.getElementById(id).classList.remove("pop");
    }, 2000);
    if (!gameover) {
        if (s !== symbol) {
            canclick = true;
            document.getElementById('logs').innerHTML = "Your Turn";
        }
        else {
            document.getElementById('logs').innerHTML = "Opponents's Turn";
        }
    }
})
boxes.forEach(box => {
    box.addEventListener('click', () => {
        console.log("clicked");
        let id = box.id;
        if (canclick && document.getElementById(id).innerHTML == "") {
            // document.getElementById(id).innerHTML = symbol;
            socket.emit("clicked", id, symbol, room_id);
            canclick = false
        }
    })

});

socket.on("invalid", (code) => {
    window.alert("Entered roomcode is invalid!!");
    window.location.href = './indexfriend.html';
    return;
})
socket.on("roomfull", (code) => {
    window.alert("Entered roomcode is Already Full!!");
    window.location.href = './indexfriend.html'
    return;
})