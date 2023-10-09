document.addEventListener('DOMContentLoaded', (event) => {
    let currentPlanet = 1;
    const totalPlanets = 8;
    const rocket = document.getElementById('Rocket');

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

        document.getElementById(`planet${currentPlanet}`).style.display = 'none';
        currentPlanet += direction;
        document.getElementById(`planet${currentPlanet}`).style.display = 'block';

        // Animate the rocket (basic example, you can use more advanced animations)
        rocket.style.left = direction === 1 ? '70%' : '30%';
    }
});
