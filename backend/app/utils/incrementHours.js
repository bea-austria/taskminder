const incrementHours = (timer) =>{
        timer.seconds++;
    
    if (timer.seconds === 60) {
        timer.seconds = 0;
        timer.minutes++;
        if (timer.minutes === 60) {
            timer.minutes = 0;
            timer.hours++;
        }
    }

    return timer;
};

module.exports = incrementHours;
