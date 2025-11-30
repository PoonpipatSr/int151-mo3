export function startClock() {
    const clockElement = document.getElementById("clock");
    
    if (!clockElement) return;
    
    const updateTime = () => {
        const now = new Date();
        
        const options = { 
            dateStyle: 'long',
            timeStyle: 'medium'
        };
        
        clockElement.textContent = `${now.toLocaleString(undefined, options)}`;
    };

    updateTime();
    setInterval(updateTime, 1000);
}