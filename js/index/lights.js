import * as THREE from "three";
import { scene } from "./scene.js";

export const createLights = () => {
  const ambientLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.25);
  const directionalLight = new THREE.DirectionalLight(0xffcb87, 1);
  directionalLight.position.set(-300, 300, 600);

  scene.add(ambientLight, directionalLight);
};