import * as THREE from 'three';

let scene, camera, renderer, stars, starGeo, starPoints;
console.log("Stfwadaw");
function init() {
    // Create a new scene
    scene = new THREE.Scene();

    // Create a camera with a field of view of 60 degrees, aspect ratio based on window's aspect ratio,
    // and near and far clipping planes
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = Math.PI / 2;

    // Create a WebGL renderer with antialiasing
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

   


    // Create a buffer geometry for the stars
    starGeo = new THREE.BufferGeometry();
    stars = new Float32Array(1000 * 3); // 1000 stars, each with x, y, z coordinate

    for (let i = 0; i < 1000; i++) {
        let x = (Math.random() - 0.5) * 2000; // Random position in a space of 2000x2000x2000
        let y = (Math.random() - 0.5) * 2000;
        let z = (Math.random() - 0.5) * 2000;
        stars[i * 3] = x;
        stars[i * 3 + 1] = y;
        stars[i * 3 + 2] = z;
    }

    // Attach the positions to the geometry
    starGeo.setAttribute('position', new THREE.BufferAttribute(stars, 3));

    // Create a material for the stars
    let starMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.7 });
  
    // Create a points mesh to render the stars
    starPoints = new THREE.Points(starGeo, starMaterial);
    scene.add(starPoints);

    // Handle window resizing
    window.addEventListener('resize', onWindowResize, false);

    animate();
}

function animate() {
    // Rotate the starfield for some dynamism
    starPoints.rotation.x += 0.002;


    // Render the scene with the camera
    renderer.render(scene, camera);

    // Request the next frame
    requestAnimationFrame(animate);
}

function onWindowResize() {
    // Update camera aspect ratio and renderer size
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialize the starfield
init();
