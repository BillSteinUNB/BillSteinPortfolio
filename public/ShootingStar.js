let scene, camera, renderer, shootingStar, shootingStarMaterial, shootingStarGeo;
let shootingStarSpeed = 0.5;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createShootingStar();
    animate();
}

function createShootingStar() {
    shootingStarGeo = new THREE.BufferGeometry();
    let vertices = new Float32Array(2 * 3);

    vertices[0] = -2;
    vertices[1] = 2;
    vertices[2] = 0;

    vertices[3] = 2;
    vertices[4] = -2;
    vertices[5] = 0;

    shootingStarGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    shootingStarMaterial = new THREE.LineBasicMaterial({ color: 0xFF0000, linewidth: 5 });
    shootingStar = new THREE.Line(shootingStarGeo, shootingStarMaterial);
    scene.add(shootingStar);
}

function animate() {
    shootingStar.position.x += shootingStarSpeed;
    shootingStar.position.y -= shootingStarSpeed;

    if (shootingStar.position.x > 5 || shootingStar.position.y < -5) {
        scene.remove(shootingStar);
        createShootingStar();
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

init();
