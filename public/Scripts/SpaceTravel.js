
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
    
        // Rotate and move the rocket off the screen
        if (direction === 1) {
            rocket.style.transform = 'rotate(83deg)';
            rocket.style.left = '100%';
        } else {
            rocket.style.transform = 'rotate(-83deg)';
            rocket.style.left = '-10%';
        }
    
        // Use a timeout to wait for the rocket to move off the screen
        setTimeout(() => {
            document.getElementById(`planet${currentPlanet}`).style.display = 'none';
            currentPlanet += direction;
            document.getElementById(`planet${currentPlanet}`).style.display = 'block';
    
            // Move the rocket back onto the screen from the opposite side
            if (direction === 1) {
                rocket.style.left = '-10%';
            } else {
                rocket.style.left = '100%';
            }
    
            // Use another timeout to wait for the rocket to move back onto the screen
            setTimeout(() => {
                rocket.style.transform = 'rotate(0deg)';
                rocket.style.left = '50%';
            }, 1000);
        }, 1000);
    }
    


