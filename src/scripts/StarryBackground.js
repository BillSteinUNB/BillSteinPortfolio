import * as THREE from 'three';

let scene, camera, renderer, stars, starGeo, starPoints, shootingStar, shootingStarMaterial, shootingStarGeo;
const clock = new THREE.Clock();




function init() {
    try {
        // Scene, Camera, Renderer
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        //camera.position.z = 1;
        //camera.rotation.x = Math.PI / 2;

        camera.position.set(0, 0, 10);  // Move the camera back a bit
        camera.lookAt(0, 0, 0);  // Make the camera look at the center

        const canvas = document.getElementById('bgCanvas');
        if (!canvas) {
            console.error("Canvas element with ID 'bgCanvas' not found.");
            return; // Stop initialization if canvas is missing
        }
        renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000);  // Set to black

        // Starfield
        starGeo = new THREE.BufferGeometry();
        stars = new Float32Array(1500 * 3);
        for (let i = 0; i < 1500; i++) {
            let x = (Math.random() - 0.5) * 2000;
            let y = (Math.random() - 0.5) * 2000;
            let z = (Math.random() - 0.5) * 2000;
            stars[i * 3] = x;
            stars[i * 3 + 1] = y;
            stars[i * 3 + 2] = z;
        }
        starGeo.setAttribute('position', new THREE.BufferAttribute(stars, 3));
        let starMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 2, opacity: 0.8, transparent: true, blending: THREE.AdditiveBlending });
        starPoints = new THREE.Points(starGeo, starMaterial);
        scene.add(starPoints);

        // Shooting Star
        createShootingStar();

        // Window Resize Event
        window.addEventListener('resize', onWindowResize, false);

        // Start Animation
        animate();
    } catch (error) {
        console.error("Initialization failed:", error);
    }
}

// Adjust the shootingStarSpeed to make it move slower
let shootingStarSpeed = 0.9; // Adjust as needed

function createShootingStar() {
    shootingStarGeo = new THREE.BufferGeometry();
    let vertices = new Float32Array(2 * 3);

    // Adjust these values to set the starting and ending positions of the shooting star
    vertices[0] = -window.innerWidth / 2; // Start from the left edge
    vertices[1] = window.innerHeight / 2; // Start from the top edge
    vertices[2] = 0;

    vertices[3] = window.innerWidth / 2;  // End at the right edge
    vertices[4] = -window.innerHeight / 2; // End at the bottom edge
    vertices[5] = 0;

    shootingStarGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    // Adjust the linewidth to make the star bigger and change the color to white
    shootingStarMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF, linewidth: 10 });

    shootingStar = new THREE.Line(shootingStarGeo, shootingStarMaterial);
    scene.add(shootingStar);
}


function animate() {
    try {
        const deltaTime = clock.getDelta();
        // Starfield Rotation
        starPoints.rotation.x += .05 * deltaTime;

        // Shooting Star Animation
        if (shootingStar) {
            shootingStar.position.x += shootingStarSpeed * window.innerWidth;
            shootingStar.position.y -= shootingStarSpeed * window.innerHeight;

            if (shootingStar.position.x > window.innerWidth / 2 || shootingStar.position.y < -window.innerHeight / 2) {
                scene.remove(shootingStar);
                shootingStar = null; // Set to null after removal
            }
        } else if (Math.random() < 0.01) { // 0.5% chance to create a new shooting star
            createShootingStar();
        }

        // Render and Request Next Frame
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    } catch (error) {
        console.error("Animation failed:", error);
    }
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Wait for the DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', init);