var socket = io('/');
var colors;
var name;
window.onload = chngp();
function chngp() {
    colors = localStorage.getItem("color");
    name = localStorage.getItem("name");
    if (!colors || !name) {
        window.alert("Please select profile logo and a name first!");
        window.location.href = './random';
        return;
    }
    console.log(colors);
    socket.emit("updet", (colors, name));
    document.getElementById("ppic").setAttribute("src", "./Utils/logo" + colors[3] + ".jpeg");
    document.getElementById("pname").innerHTML = name;
}
if (window.location.href.split('?')[1]) {
    if (window.location.href.split('?')[1].split("=")[1] === "private") {
        socket.emit("createroom", colors, name);
    }
    else if (window.location.href.split('?')[1].split("=")[1] === "any") {
        socket.emit("joinany", colors, name);
    }
    else {
        socket.emit("joinroom", window.location.href.split('?')[1].split("=")[1], colors, name);
    }
}
else {
    socket.emit("joinany", colors, name);
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
    document.getElementById('logs').innerHTML = "Your opponent have left the game, send invite code to invite another player!";
    document.getElementById("text").innerHTML = "Room Code : <span>" + room + "</span>";
})

socket.on("dispub", (room) => {
    for (let index = 1; index < 10; index++) {
        document.getElementById(index).innerHTML = "";
    }
    document.getElementById('logs').innerHTML = "Your opponent have left the game, wait for another player to join or start a new game!";
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
socket.on("updopp", (details) => {
    if (player_id == 1) {
        let color = details['oppo'][0];
        let na = details['oppo'][1];
        document.getElementById("ppic1").setAttribute("src", "./Utils/logo" + color[3] + ".jpeg");
        document.getElementById("pname1").innerHTML = na;
        document.getElementById("p1").style.display = "inherit";
    }
    else {
        let color = details['host'][0];
        let na = details['host'][1];
        document.getElementById("ppic1").setAttribute("src", "./Utils/logo" + color[3] + ".jpeg");
        document.getElementById("pname1").innerHTML = na;
        document.getElementById("p1").style.display = "inherit";
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
        document.getElementById('ppic').style.borderColor = "blue";
        document.getElementById('ppic1').style.borderColor = "red";
    }
    else {
        document.getElementById('logs').innerHTML = "New Game started , Opponent's Turn";
        document.getElementById('ppic').style.borderColor = "red";
        document.getElementById('ppic1').style.borderColor = "blue";
        canclick = false;
    }
    document.getElementById('rs_btn').style.display = "none";
})
socket.on("hidopp", () => {
    document.getElementById('p1').style.display = "none";
})

socket.on("gamestart", (room) => {
    room_id = room;
    if (player_id === 1) {
        canclick = true;
        document.getElementById('logs').innerHTML = "Game Started , Your Turn";
        document.getElementById('ppic').style.borderColor = "blue";
        document.getElementById('ppic1').style.borderColor = "red";
    }
    else {
        document.getElementById('logs').innerHTML = "Game Started , Opponents's Turn";
        document.getElementById('ppic').style.borderColor = "red";
        document.getElementById('ppic1').style.borderColor = "blue";
    }
    document.getElementById("text").innerHTML = "VS";
    // document.getElementById("text").innerHTML = "Room Code : <span>" + room_id + "</span>";

})
socket.on("gameover", (id) => {
    if (player_id === id) {
        document.getElementById('logs').innerHTML = "You have won this round";
        document.getElementById('ppic').style.borderColor = "green";
        document.getElementById('ppic1').style.borderColor = "red";

    }
    else {
        document.getElementById('logs').innerHTML = "Your opponent has won this round";
        document.getElementById('ppic').style.borderColor = "red";
        document.getElementById('ppic1').style.borderColor = "green";
        canclick = false;
    }
    document.getElementById('rs_btn').style.display = "inherit";
    gameover = true;
})

socket.on("draw", (id) => {
    document.getElementById('logs').innerHTML = "Game is Draw, No one Won";
    document.getElementById('ppic').style.borderColor = "green";
    document.getElementById('ppic1').style.borderColor = "green";
    document.getElementById('rs_btn').style.display = "inherit";
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
            document.getElementById('ppic').style.borderColor = "blue";
            document.getElementById('ppic1').style.borderColor = "red";
        }
        else {
            document.getElementById('logs').innerHTML = "Opponents's Turn";
            document.getElementById('ppic').style.borderColor = "red";
            document.getElementById('ppic1').style.borderColor = "blue";
        }
    }
})
boxes.forEach(box => {
    box.addEventListener('click', () => {
        console.log("clicked");
        let id = box.id;
        if (canclick && document.getElementById(id).innerHTML == "") {
            socket.emit("clicked", id, symbol, room_id);
            canclick = false
        }
    })

});

socket.on("invalid", (code) => {
    window.alert("Entered roomcode is invalid!!");
    window.location.href = './start';
    return;
})
socket.on("roomfull", (code) => {
    window.alert("Entered roomcode is Already Full!!");
    window.location.href = './start';
    return;
})

document.getElementById('rs_btn').addEventListener("click", () => {
    socket.emit("reload", room_id, player_id);
})