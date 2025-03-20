let scene, camera, renderer;
let particles = [];
let particleGeometry, particleMaterialPositive, particleMaterialNegative;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    camera.position.z = 6;

    // Create nodal surface
    let geometry = new THREE.SphereGeometry(2, 32, 32);
    let material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    let nodeSurface = new THREE.Mesh(geometry, material);
    scene.add(nodeSurface);

    // Particle settings
    particleGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    particleMaterialPositive = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    particleMaterialNegative = new THREE.MeshBasicMaterial({ color: 0x0000ff });

    createParticles(100);
    animate();
}

function createParticles(count) {
    // Clear previous particles
    particles.forEach(p => scene.remove(p));
    particles = [];

    for (let i = 0; i < count; i++) {
        let color = Math.random() > 0.5 ? particleMaterialPositive : particleMaterialNegative;
        let particle = new THREE.Mesh(particleGeometry, color);
        particle.position.set((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4);
        particles.push(particle);
        scene.add(particle);
    }
}

function updateParticles() {
    let count = document.getElementById('fermionCount').value;
    createParticles(count);
}

function animate() {
    requestAnimationFrame(animate);
    particles.forEach(p => {
        p.position.x += (Math.random() - 0.5) * 0.05;
        p.position.y += (Math.random() - 0.5) * 0.05;
        p.position.z += (Math.random() - 0.5) * 0.05;
    });
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

init();
