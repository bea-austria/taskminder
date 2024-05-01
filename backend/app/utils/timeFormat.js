const formatTime = (timer) => {
    timer.hours = formatter(timer.hours);
    timer.minutes = formatter(timer.minutes);
    timer.seconds = formatter(timer.seconds);

    return timer;
}

function formatter(value){
    return String(value).padStart(2, '0');
}
module.exports = formatTime;