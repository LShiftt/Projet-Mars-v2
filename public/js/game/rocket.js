// rocket.js
import * as THREE from "three";
import { scene } from "./scene.js";

let rocket, rocket_fire;
const rocketParts = {};
const scWing = localStorage.getItem("ailerons"),
    scBody = localStorage.getItem("corps"),
    scWindow = localStorage.getItem("fenetre");


export const createRocket = () => {
    rocketParts.topc = new THREE.Mesh(
        new THREE.CylinderGeometry(0, 6, 4, 64),
        new THREE.MeshStandardMaterial({ color: scBody }) //Red
    );
    scene.add(rocketParts.topc);
    rocketParts.topc.position.y = 60;

    rocketParts.topa = new THREE.Mesh(
        new THREE.CylinderGeometry(6, 12, 8, 64),
        new THREE.MeshStandardMaterial({ color: scBody })
    );
    scene.add(rocketParts.topa);
    rocketParts.topa.position.y = 54;

    rocketParts.topb = new THREE.Mesh(
        new THREE.CylinderGeometry(12, 18, 20, 64),
        new THREE.MeshStandardMaterial({ color: scBody })
    );
    scene.add(rocketParts.topb);
    rocketParts.topb.position.y = 40;

    rocketParts.mida = new THREE.Mesh(
        new THREE.CylinderGeometry(18, 20, 16, 64),
        new THREE.MeshStandardMaterial({ color: scBody })
    );
    scene.add(rocketParts.mida);
    rocketParts.mida.position.y = 22;

    rocketParts.midc = new THREE.Mesh(
        new THREE.CylinderGeometry(20, 20, 8, 64),
        new THREE.MeshStandardMaterial({ color: scBody })
    );
    scene.add(rocketParts.midc);
    rocketParts.midc.position.y = 10;

    rocketParts.midb = new THREE.Mesh(
        new THREE.CylinderGeometry(20, 18, 16, 64),
        new THREE.MeshStandardMaterial({ color: scBody, receiveShadow: false })
    );
    scene.add(rocketParts.midb);
    rocketParts.midb.position.y = -2;

    rocketParts.bota = new THREE.Mesh(
        new THREE.CylinderGeometry(18, 14, 10, 64),
        new THREE.MeshStandardMaterial({ color: scBody })
    );
    scene.add(rocketParts.bota);
    rocketParts.bota.position.y = -15;

    rocketParts.botb = new THREE.Mesh(
        new THREE.CylinderGeometry(14, 12, 6, 64),
        new THREE.MeshStandardMaterial({
            color: scBody,
            roughness: 0.5,
            metalness: 1,
            side: THREE.DoubleSide
        })
    );
    scene.add(rocketParts.botb);
    rocketParts.botb.position.y = -20;

    rocketParts.botc = new THREE.Mesh(
        new THREE.CylinderGeometry(10, 8, 4, 64),
        new THREE.MeshStandardMaterial({
            color: scBody,
            roughness: 0,
            metalness: 1,
            side: THREE.DoubleSide
        })
    );
    scene.add(rocketParts.botc);
    rocketParts.botc.position.y = -22;



    //Bord de la fenêtre
    rocketParts.wina = new THREE.Mesh(
        new THREE.CylinderGeometry(12, 12, 23, 64),
        new THREE.MeshStandardMaterial({
            color: scWindow,
            roughness: 1,
            metalness: 1,
            side: THREE.DoubleSide
        })
    );
    scene.add(rocketParts.wina);
    rocketParts.wina.position.set(0, 20, 10);
    rocketParts.wina.rotation.set(Math.PI / 2, 0, 0);

    // Fenêtre de la fusée
    rocketParts.winb = new THREE.Mesh(
        new THREE.CylinderGeometry(9, 9, 8, 64),
        new THREE.MeshPhysicalMaterial({
            color: scWindow,
            roughness: 1,
            transmission: 1,
            thickness: 0.9,
            side: THREE.DoubleSide
        })
    );
    scene.add(rocketParts.winb);
    rocketParts.winb.position.set(0, 20, 18);
    rocketParts.winb.rotation.set(Math.PI / 2, 0, 0);


    //Deux ailerons
    rocketParts.fina = new THREE.Mesh(
        new THREE.BoxGeometry(40, 8, 18),
        new THREE.MeshStandardMaterial({
            color: scWing
        })
    );
    scene.add(rocketParts.fina);
    rocketParts.fina.position.set(16, -10, 0);
    rocketParts.fina.rotation.set(Math.PI / 2, 0.7 * Math.PI, 0);

    rocketParts.finb = new THREE.Mesh(
        new THREE.BoxGeometry(40, 8, 18),
        new THREE.MeshStandardMaterial({
            color: scWing
        })
    );
    scene.add(rocketParts.finb);
    rocketParts.finb.position.set(-16, -10, 0);
    rocketParts.finb.rotation.set(-Math.PI / 2, 0.7 * Math.PI, 0);



    var flame_material = new THREE.ShaderMaterial({
        uniforms: {
            color1: {
                value: new THREE.Color("yellow")
            },
            color2: {
                value: new THREE.Color("red")
            }
        },
        vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
        fragmentShader: `
    uniform vec3 color1;
    uniform vec3 color2;
  
    varying vec2 vUv;
    
    void main() {
      
      gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
    }
  `,
        wireframe: false
    });

    rocket_fire = new THREE.Mesh(
        new THREE.CylinderGeometry(6, 0, 20, 64),
        flame_material
    );
    scene.add(rocket_fire);
    rocket_fire.position.y = -30;

    rocket = new THREE.Group();
    rocket.add(
        rocketParts.midb,
        rocketParts.mida,
        rocketParts.midc,
        rocketParts.topa,
        rocketParts.topb,
        rocketParts.bota,
        rocketParts.botb,
        rocketParts.botc,
        rocketParts.topc,
        rocketParts.wina,
        rocketParts.winb,
        rocketParts.fina,
        rocketParts.finb,
        rocket_fire
    );
    rocket.position.y = 50;
    rocket.rotation.z = 300;
    scene.add(rocket);
};

export { rocket, rocket_fire, scBody, scWindow, scWing };