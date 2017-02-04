function fixNum(num) {
    if (typeof(num) == "string") {
        num = Number(num);
    }
    var numArr = num.toFixed(2).split(".");
    numArr[0] = Number(numArr[0]).toLocaleString();
    return numArr.join(".");
}

function formatDate(d) {
    var now = new Date(d);
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    month < 10 ? month = "0" + month : month = month;
    var day = now.getDate();
    day < 10 ? day = "0" + day : day = day;
    var hour = now.getHours();
    hour < 10 ? hour = "0" + hour : hour = hour;
    var minute = now.getMinutes();
    minute < 10 ? minute = "0" + minute : minute = minute;
    var second = now.getSeconds();
    second < 10 ? second = "0" + second : second = second;
    return hour + ":" + minute;
}
