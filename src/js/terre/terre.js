import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createPixelEffect } from "./postprocess-pixel.js";

// Variables globales
let scene, renderer, camera, terre, soleil, shaderMaterial, composer;

function main() {
    const container = document.querySelector("#scene-container");

    // 1. Ajouter la scène
    scene = new THREE.Scene();
    scene.background = new THREE.Color("#000000"); // Fond noir (espace)

    // 2. Mettre en place le rendu dans le canvas
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // 3. Ajouter la caméra
    camera = new THREE.PerspectiveCamera(
        75,
        container.offsetWidth / container.offsetHeight,
        0.1,
        100
    );
    camera.position.set(2, 2, 30);
    scene.add(camera);

    // 4. Ajouter les lumières
    ajouterLumieres();

    // 5. Ajouter la Terre avec textures dynamiques
    Terre();

    // 6. Ajouter des étoiles en arrière-plan
    ajouterEtoiles();

    // 7. Ajouter les contrôles caméra
    new OrbitControls(camera, renderer.domElement);


    // 8. Démarrer la boucle d'animation
    renderer.setAnimationLoop(animate);

    composer = createPixelEffect(scene, camera, renderer);
}

/** Ajouter une source lumineuse réaliste */
function ajouterLumieres() {
    // Lumière d'ambiance douce
    const ambientLight = new THREE.AmbientLight(0x333333, 0.5);
    scene.add(ambientLight);

    // Lumière directionnelle simulant le Soleil
    soleil = new THREE.DirectionalLight(0xffffff, 2);
    soleil.position.set(50, 20, 30);
    scene.add(soleil);
}

/** Animation de la Terre */
function animate() {
    if (terre) {
        terre.rotation.y += 0.002;
    }

    // Mise à jour de la direction de la lumière dans le shader
    if (shaderMaterial) {
        shaderMaterial.uniforms.lightDirection.value.copy(soleil.position).normalize();
    }

    composer.render();
}

/** Ajouter la Terre avec textures de jour et de nuit */
function Terre() {
    const geometry = new THREE.SphereGeometry(10, 64, 32);
    const textureLoader = new THREE.TextureLoader();

    const dayTexture = textureLoader.load("../../public/img/textures/2k_earth_daymap.jpg");
    const nightTexture = textureLoader.load("../../public/img/textures/2k_earth_nightmap.jpg");

    shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
            dayTexture: { value: dayTexture },
            nightTexture: { value: nightTexture },
            lightDirection: { value: new THREE.Vector3().copy(soleil.position).normalize() }, // Valeur initiale
        },
        vertexShader: `
            varying vec3 vNormal;
            varying vec3 vPosition;
            varying vec2 vUv;
            
            void main() {
                vNormal = normalize(normalMatrix * normal);
                vPosition = normalize(position);
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform sampler2D dayTexture;
            uniform sampler2D nightTexture;
            uniform vec3 lightDirection;
            
            varying vec3 vNormal;
            varying vec3 vPosition;
            varying vec2 vUv;
            
            void main() {
                float lightFactor = dot(normalize(vNormal), lightDirection);
                lightFactor = clamp(lightFactor, 0.0, 1.0);

                vec4 dayColor = texture2D(dayTexture, vUv);
                vec4 nightColor = texture2D(nightTexture, vUv);

                gl_FragColor = mix(nightColor, dayColor, lightFactor);
            }
        `,
    });

    terre = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(terre);
}

/** Ajouter des étoiles en arrière-plan */
function ajouterEtoiles() {
    const etoilesGeometry = new THREE.BufferGeometry();
    const positions = [];

    for (let i = 0; i < 500; i++) {
        positions.push((Math.random() - 0.5) * 200);
        positions.push((Math.random() - 0.5) * 200);
        positions.push((Math.random() - 0.5) * 200);
    }

    etoilesGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

    const etoilesMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.5,
        transparent: true,
    });

    const etoiles = new THREE.Points(etoilesGeometry, etoilesMaterial);
    scene.add(etoiles);
}

main();
