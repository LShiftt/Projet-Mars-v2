// scene.js
import * as THREE from "three";
import { createPixelEffect } from "./postprocess-pixel";

let scene, camera, renderer, composer;

export const createScene = () => {
  const WIDTH = window.innerWidth;
  const HEIGHT = window.innerHeight;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 1, 10000);
  camera.position.set(0, 0, 500);

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;

  document.getElementById("scene-container").appendChild(renderer.domElement);
  window.addEventListener("resize", handleWindowResize);

  composer = createPixelEffect(scene, camera, renderer);
};

const handleWindowResize = () => {
  const WIDTH = window.innerWidth;
  const HEIGHT = window.innerHeight;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
};

export { scene, camera, renderer, composer };