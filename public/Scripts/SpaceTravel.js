
    let currentPlanet = 1;
    const totalPlanets = 8;
    const rocket = document.getElementById('rocket');
    
    document.getElementById('leftArrow').addEventListener('click', () => {
        moveRocket(-1);
    });

    document.getElementById('rightArrow').addEventListener('click', () => {
        moveRocket(1);
    });

    function moveRocket(direction) {
        if ((currentPlanet === 1 && direction === -1) || (currentPlanet === totalPlanets && direction === 1)) {
            return; // Don't move if at the start or end
        }
        
        rocket.src = "/Space/Rocket.png";
    
        // Set the initial transition for the takeoff
        rocket.style.transition = 'left 1s ease, transform 1s ease';
    
        // Rotate and move the rocket off the screen
        if (direction === 1) {
            rocket.style.transform = 'rotate(83deg)';
            rocket.style.left = '100%';
        } else {
            rocket.style.transform = 'rotate(-83deg)';
            rocket.style.left = '-50%';
        }
    
        // Use a timeout to wait for the rocket to move off the screen
        setTimeout(() => {
            document.getElementById(`planet${currentPlanet}`).style.display = 'none';
            currentPlanet += direction;
            document.getElementById(`planet${currentPlanet}`).style.display = 'flex';
    
            rocket.style.transition = 'none';
            // Reposition the rocket on the opposite side
            if (direction === 1) {
                rocket.style.left = '-50%';
            } else {
                rocket.style.left = '100%';
            }
            
            void rocket.offsetWidth;
    
            // Start moving the rocket to the center immediately
            rocket.style.transition = 'left 0.8s ease, transform 1s ease'; 
            rocket.style.left = '7%';
    
            // Start the rotation slightly before the rocket reaches the center
            setTimeout(() => {
                rocket.style.transform = 'rotate(0deg)';
                // Once the rotation is done, start the descent
                setTimeout(() => {
                    rocket.style.transition = 'top 2s ease'; 
                    rocket.style.top = '-30%';
                    rocket.src = "/Space/RocketOff.png"; 
                }, 800); // Delay for the rotation
            }, 600); // Reduced time to start the rotation slightly earlier
        }, 800);
    }


