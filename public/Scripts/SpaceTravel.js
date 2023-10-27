
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
            document.getElementById(`planet${currentPlanet}`).style.display = 'block';
    
            rocket.style.transition = 'none';
            // Move the rocket back onto the screen from the opposite side
            if (direction === 1) {
                rocket.style.left = '-50%';
            } else {
                rocket.style.left = '100%';
            }
            
            void rocket.offsetWidth;
    
            // Add a slight delay before the rocket starts moving to the center
            setTimeout(() => {
                rocket.style.transition = 'left 1s ease, transform 1s ease'; // Increased time for visibility
                rocket.style.left = '7%';
    
                setTimeout(() => {
                    rocket.style.transform = 'rotate(0deg)';
                    setTimeout(() => {
                        // Slowly descend the rocket
                        rocket.style.transition = 'top 2s ease'; 
                        rocket.style.top = '-30%';
                        rocket.src = "/Space/RocketOff.png"; 
                    }, 2000); // Added delay for the rotation
                }, 2000); // Increased time for visibility
            }, 500); // Added delay before the rocket starts moving to the center
        }, 1000);
    }


