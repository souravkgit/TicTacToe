let arr = ['X', 'O', 'X', 'O', '', '', 'X', '', ''];
function check(arr, sym) {
    if ((!arr[0] || !arr[4] || !arr[8]) && ((arr[4] == sym && arr[8] == sym) || (arr[0] == sym && arr[8] == sym) || (arr[0] == sym && arr[4] == sym))) {
        if (!arr[0]) {
            return 0;
        }
        else if (!arr[4]) {
            return 4;
        }
        else if (!arr[8]) {
            return 8;
        }
    }
    if ((!arr[2] || !arr[4] || !arr[6]) && ((arr[4] == sym && arr[6] == sym) || (arr[2] == sym && arr[6] == sym) || (arr[2] == sym && arr[4] == sym))) {
        if (!arr[2]) {
            return 2;
        }
        else if (!arr[4]) {
            return 4;
        }
        else if (!arr[6]) {
            return 6;
        }
    }
    if ((!arr[0] || !arr[1] || !arr[2]) && ((arr[1] == sym && arr[2] == sym) || (arr[0] == sym && arr[2] == sym) || (arr[0] == sym && arr[1] == sym))) {
        if (!arr[2]) {
            return 2;
        }
        else if (!arr[0]) {
            return 0;
        }
        else if (!arr[1]) {
            return 1;
        }
    }
    if ((!arr[3] || !arr[4] || !arr[5]) && ((arr[4] == sym && arr[5] == sym) || (arr[3] == sym && arr[5] == sym) || (arr[3] == sym && arr[4] == sym))) {
        if (!arr[5]) {
            return 5;
        }
        else if (!arr[3]) {
            return 3;
        }
        else if (!arr[4]) {
            return 4;
        }
    }
    if ((!arr[6] || !arr[7] || !arr[8]) && ((arr[7] == sym && arr[8] == sym) || (arr[6] == sym && arr[8] == sym) || (arr[6] == sym && arr[7] == sym))) {
        if (!arr[8]) {
            return 8;
        }
        else if (!arr[6]) {
            return 6;
        }
        else if (!arr[7]) {
            return 7;
        }
    }
    if ((!arr[0] || !arr[3] || !arr[6]) && ((arr[3] == sym && arr[6] == sym) || (arr[0] == sym && arr[6] == sym) || (arr[0] == sym && arr[3] == sym))) {
        if (!arr[6]) {
            return 6;
        }
        else if (!arr[0]) {
            return 0;
        }
        else if (!arr[3]) {
            return 3;
        }
    }
    if ((!arr[4] || !arr[1] || !arr[7]) && ((arr[1] == sym && arr[7] == sym) || (arr[4] == sym && arr[7] == sym) || (arr[4] == sym && arr[1] == sym))) {
        if (!arr[7]) {
            return 7;
        }
        else if (!arr[4]) {
            return 4;
        }
        else if (!arr[1]) {
            return 1;
        }
    }
    if ((!arr[5] || !arr[8] || !arr[2]) && ((arr[8] == sym && arr[2] == sym) || (arr[5] == sym && arr[2] == sym) || (arr[5] == sym && arr[8] == sym))) {
        if (!arr[2]) {
            return 2;
        }
        else if (!arr[5]) {
            return 5;
        }
        else if (!arr[8]) {
            return 8;
        }
    }
    return 9;
}
function turn(arr, sign) {
    let count = 0;
    console.log(arr[0], arr[4], arr[8]);
    if (arr[0] == arr[4] && arr[4] == arr[8]) {
        // console.log("spme");
        return "already win hai bhaiya!!";
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == 'X' || arr[i] == 'O') {
            count += 1;
        }
    }
    if (count > 0) {
        // return "ye kyu chala bhaiya!";
        bot = 'X';
        usr = 'O';
        let ans = check(arr, bot);
        if (ans < 8)
            return ("bot ke " + ans);
        ans = check(arr, usr);
        if (ans < 8) {
            return "user ke " + ans;
        }
        else {
            return 9;
        }


    }
    else {
        let ret = Math.random() * 8;
        ret = Math.floor(ret);
        return ret;
    }
}


// bot = "X"
// usr = 'O'
let ans = turn(arr);
console.log(ans);