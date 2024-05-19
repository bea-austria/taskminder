const activityCalculator = () =>{
    let isActive = false;
    let activeSeconds = 0;
    let inactiveSeconds = 0;
    let inactivityTimer;

    function handleMovement(){
        isActive = true;
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            isActive = false
        }, 1000);
    };

    // Add event listeners for detecting user activity
    document.addEventListener('keydown', handleMovement);
    document.addEventListener('click', handleMovement);
    document.addEventListener('mousemove', handleMovement);
    document.addEventListener('scroll', handleMovement);

    const timer = setInterval(()=>{
        if(isActive){
        activeSeconds++;
        }else{
        inactiveSeconds++;
        }
    }, 1000);

    const getActivity = () => {
        const totalSeconds = activeSeconds + inactiveSeconds;
        if (totalSeconds === 0) {
            return 0; // Return 0 if there's no activity yet
        }
        return Math.round((activeSeconds / totalSeconds) * 100);
    };

    return {
        getActivity: getActivity,
        stopTimer: () => clearInterval(timer)
    };
}


export default activityCalculator;

  