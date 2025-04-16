import * as THREE from 'three';
import { TextureLoader } from 'three';

let scene, camera, renderer, stars, starGeo, starPoints, shootingStar, shootingStarMaterial, shootingStarGeo;
const clock = new THREE.Clock();
const loader = new TextureLoader();
let starMaterial;
const texture1 = loader.load('/photos/sp1.png');
const texture2 = loader.load('/photos/sp2.png');


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
        renderer.setClearColor(0x111111);  // Darker grey, but not black (0x000000)

        // Starfield
        starGeo = new THREE.BufferGeometry();
        stars = new Float32Array(1500 * 3);
        const sizes = new Float32Array(1500);

        for (let i = 0; i < 1500; i++) {
            let x = (Math.random() - 0.5) * 2000;
            let y = (Math.random() - 0.5) * 2000;
            let z = (Math.random() - 0.5) * 2000;

            stars[i * 3] = x;
            stars[i * 3 + 1] = y;
            stars[i * 3 + 2] = z;

            // Randomize star sizes
            sizes[i] = Math.random() * 1.0 + 0.5; // Size between 0.5 and 1.5
        }
        starGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        starGeo.setAttribute('position', new THREE.BufferAttribute(stars, 3));

        const starMaterial = new THREE.PointsMaterial({
            size: 8,
            map: texture1, // Use texture1 initially
            transparent: true,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true // Enable size attenuation for perspective effect
        });
        starPoints = new THREE.Points(starGeo, starMaterial);
        starPoints.geometry.attributes.size.needsUpdate = true;
        scene.add(starPoints);

        // Shooting Star
        //createShootingStar();

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

        // Twinkling effect: Alternate between the two textures
        if (Math.random() < 0.02) { // Adjust probability for desired twinkling speed
            starMaterial.map = (starMaterial.map === texture1) ? texture2 : texture1;
            starMaterial.needsUpdate = true;
        }

        // Shooting Star Animation
        /*if (shootingStar) {
            shootingStar.position.x += shootingStarSpeed * window.innerWidth;
            shootingStar.position.y -= shootingStarSpeed * window.innerHeight;

            if (shootingStar.position.x > window.innerWidth / 2 || shootingStar.position.y < -window.innerHeight / 2) {
                scene.remove(shootingStar);
                shootingStar = null; // Set to null after removal
            }
        } else if (Math.random() < 0.01) { // 0.5% chance to create a new shooting star
            createShootingStar();
        }*/

    } catch (error) {
        console.error("Animation failed:", error);
    }
    // Render and Request Next Frame
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Wait for the DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', init);