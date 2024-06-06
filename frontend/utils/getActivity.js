const activityCalculator = (activityLevel) =>{
    let isActive = false;
    let activeSeconds = (activityLevel / 100 ) * 300;
    let inactiveSeconds = 0;
    let inactivityTimer;

    function handleMovement(){
        isActive = true;
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            isActive = false
        }, 1000);
    };

    window.electron.userActivity(()=>{
        handleMovement();
    })

    window.electron.userIdle(()=>{
        isActive = false;
    })

    const timer = setInterval(()=>{
        if(isActive){
        activeSeconds++;
        }else{
        inactiveSeconds++;
        }
    }, 1000);

    return {
        // getActivity: () => Math.round((activeSeconds / (activeSeconds + inactiveSeconds)) * 100),
        getActivity: () => Math.round((activeSeconds /  (activeSeconds + inactiveSeconds)) * 100),
        stopTimer: () => clearInterval(timer)
    };
}


export default activityCalculator;

  