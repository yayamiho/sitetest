function open(idShow){
    var id = getElementById(idShow)
    id.style.display = "block";
}
function close(idHide){
    var id = getElementById(idShow)
    id.style.display = "none";
}

setInterval(showTime, 1000);

function showTime() {
    let time = new Date();
    let hour = time.getUTCHours() - 3; // Adjust to GMT-3
    let min = time.getUTCMinutes();
    let sec = time.getUTCSeconds();

    // Ensure hour is in the correct range (0-23)
    if (hour < 0) {
        hour += 24; // Adjust for negative hours
    } else if (hour >= 24) {
        hour -= 24; // Adjust for hours exceeding 24
    }

    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    let currentTime = hour + ":" + min + ":" + sec;

    document.getElementById("headerInfoClock").innerHTML = currentTime;
}

showTime();
