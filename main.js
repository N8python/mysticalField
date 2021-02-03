import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { OBJLoader } from "https://unpkg.com/three@0.125.2/examples/jsm/loaders/OBJLoader.js";
import { FBXLoader } from "https://unpkg.com/three@0.125.2/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from "https://unpkg.com/three@0.125.2/examples/jsm/loaders/GLTFLoader.js";
import { ConvexGeometry } from "https://unpkg.com/three/examples/jsm/geometries/ConvexGeometry.js";
import { ConvexHull } from "https://unpkg.com/three@0.125.2/examples/jsm/math/ConvexHull.js";
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xE6E6FA, 15, 125);
scene.background = new THREE.Color('#E6E6FA');
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = -10;
const groundTexture = new THREE.TextureLoader().load("grass.jpg");
groundTexture.wrapS = THREE.RepeatWrapping;
groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(32, 32);
const groundGeometry = new THREE.BoxGeometry(500, 10, 500);
const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x009900, map: groundTexture });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
for (let i = 0; i < 50; i++) {
    const targetX = Math.random() * 400 - 200;
    const targetY = Math.random() * 400 - 200;
    for (let j = 0; j < Math.floor(Math.random() * 5 + 3); j++) {
        const pondTexture = new THREE.TextureLoader().load("water.png");
        const pondGeometry = //new THREE.BoxGeometry(10, 0, 10);
            new THREE.CylinderGeometry(5, 5, 1, 32);
        const pondMaterial = new THREE.MeshPhongMaterial({ color: 0x0033ff, map: pondTexture });
        const pond = new THREE.Mesh(pondGeometry, pondMaterial);
        pond.position.set(targetY + (Math.random() * 10 - 5), -0.499, targetX + (Math.random() * 10 - 5));
        scene.add(pond);
    }
}
ground.position.set(0, -5, 0);
const startGeometry = new THREE.BoxGeometry(10, 10, 10);
const startMaterial = new THREE.MeshPhongMaterial({ color: 0xff00ff });
const startRect = new THREE.Mesh(startGeometry, startMaterial);
startRect.position.set(20, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x00ffff, 1);
renderer.gammaOutput = true;
const light = new THREE.DirectionalLight(0xFFFFFF, 0.35);
const light2 = new THREE.DirectionalLight(0xFFFFFF, 0.7);
const light3 = new THREE.DirectionalLight(0xFFFFFF, 0.35);
const light4 = new THREE.DirectionalLight(0xFFFFFF, 0.35);
light.position.set(0, 100, 100);
light2.position.set(0, 100, -100);
light3.position.set(100, 100, 0);
light4.position.set(-100, 100, 0);
scene.add(light);
scene.add(light2);
scene.add(light3);
scene.add(light4);
scene.add(ground);
const fbxLoader = new FBXLoader();
let fox;
let mario;
let dragon;
let creed;
let anims = {};
fbxLoader.load(
    // resource URL
    "fox.fbx",

    // onLoad callback
    // Here the loaded data is assumed to be an object
    function(obj) {
        // Add the loaded object to the scene
        obj.scale.set(0.05, 0.05, 0.05);
        //obj.rotation.x = Math.PI / 2;
        //obj.rotation.y = Math.PI / 4;
        //obj.rotation.z = Math.PI / 4;
        fox = obj;
        const mixer = new THREE.AnimationMixer(fox);
        const clips = fox.animations;
        fox.mixer__ = mixer;
        const ogClip = THREE.AnimationClip.findByName(clips, 'Base stack');
        const headShake = THREE.AnimationUtils.subclip(ogClip, "head shake", 1, 215);
        const walk = THREE.AnimationUtils.subclip(ogClip, "walk", 210, 275);
        const run = THREE.AnimationUtils.subclip(ogClip, "run", 320, 490);
        //THREE.AnimationClip.CreateFromMorphTargetSequence("head shake", "")
        anims.headShake = mixer.clipAction(headShake);
        anims.walk = mixer.clipAction(walk);
        anims.run = mixer.clipAction(run);
        scene.add(obj);
    }, undefined,
    function(error) {

        console.error(error);

    }
);
fbxLoader.load(
    "flower-3.fbx",
    obj => {
        for (let i = 0; i < 250; i++) {
            const flower = obj.clone();
            const scale = Math.random() * 2.5;
            flower.scale.set(scale, scale, scale);
            flower.rotation.y = Math.random() * Math.PI * 2;
            flower.position.set(Math.random() * 400 - 200, flower.position.y, Math.random() * 400 - 200);
            scene.add(flower);
        }
    });
fbxLoader.load(
    "flower2.fbx",
    obj => {
        for (let i = 0; i < 250; i++) {
            const flower = obj.clone();
            const scale = Math.random() * 2.5;
            flower.scale.set(scale, scale, scale);
            flower.rotation.y = Math.random() * Math.PI * 2;
            flower.position.set(Math.random() * 400 - 200, flower.position.y, Math.random() * 400 - 200);
            scene.add(flower);
        }
    });
fbxLoader.load(
    "grass.fbx",
    obj => {
        for (let i = 0; i < 250; i++) {
            const grass = obj.clone();
            const scale = Math.random() * 25;
            grass.scale.set(scale, scale, scale);
            grass.rotation.y = Math.random() * Math.PI * 2;
            grass.position.set(Math.random() * 400 - 200, grass.position.y, Math.random() * 400 - 200);
            scene.add(grass);
        }
    });
fbxLoader.load(
    "rock.fbx",
    obj => {
        for (let i = 0; i < 250; i++) {
            const centerX = Math.random() * 400 - 200;
            const centerY = Math.random() * 400 - 200;
            for (let i = 0; i < Math.floor(2 + Math.random() * 4); i++) {
                const rock = obj.clone();
                const scale = Math.random() * 1;
                rock.scale.set(scale, scale, scale);
                rock.rotation.y = Math.random() * Math.PI * 2;
                rock.position.set(centerX + (Math.random() * 3 - 1.5), rock.position.y, centerY + (Math.random() * 3 - 1.5));
                scene.add(rock);
            }
        }
    });
/*fbxLoader.load(
    "dense-grass.fbx",
    obj => {
        for (let y = -500; y < 500; y += 100) {
            for (let x = -500; x < 500; x += 100) {
                const grass = obj.clone();
                //const scale = Math.random() * 0.1;
                grass.scale.set(0.25, 0.05, 0.25);
                //grass.rotation.y = Math.random() * Math.PI * 2;
                grass.position.set(y, grass.position.y, x);
                scene.add(grass);
            }
        }
    });*/
fbxLoader.load("tree.fbx", obj => {
    for (let i = 0; i < 25; i++) {
        const tree = obj.clone();
        const scale = Math.random() * 0.005;
        tree.scale.set(scale, scale, scale);
        tree.rotation.y = Math.random() * Math.PI * 2;
        tree.position.set(Math.random() * 400 - 200, tree.position.y, Math.random() * 400 - 200);
        scene.add(tree);
    }
});
renderer.setSize(window.innerWidth * 0.9, window.innerHeight * 0.9);
document.body.appendChild(renderer.domElement);
let prevFrameTime = Date.now();
const keys = {};

function animate() {
    /*if (fox) {
        fox.rotation.y += 0.025;
    }*/
    requestAnimationFrame(animate);
    const deltaTime = (Date.now() - prevFrameTime) / 1000;
    if (fox) {
        if (keys["ArrowUp"]) {
            let mag = 1;
            /*const ay = Math.abs(fox.rotation.y) % (Math.PI * 2);
            if ((ay > Math.PI && ay < 3 * (Math.PI / 2)) ||
                (ay > 0 && ay < Math.PI / 2)) {
                mag = -1;
            }*/
            fox.position.z += deltaTime * 25 * mag * Math.cos(fox.rotation.y);
            fox.position.x += deltaTime * 25 * mag * Math.sin(fox.rotation.y);
            anims.run.play();
            anims.headShake.stop();
        } else {
            anims.run.stop();
            anims.headShake.play();
        }
        if (keys["ArrowRight"]) {
            fox.rotation.y += 0.1;
        } else if (keys["ArrowLeft"]) {
            fox.rotation.y -= 0.1;
        }
        camera.position.y = fox.position.y + 10;
        camera.position.z = fox.position.z - 10 * Math.cos(fox.rotation.y);
        camera.position.x = fox.position.x - 10 * Math.sin(fox.rotation.y);
        camera.lookAt(fox.position.x + 10 * Math.sin(fox.rotation.y), fox.position.y, fox.position.z + 10 * Math.cos(fox.rotation.y));
        fox.mixer__.update(deltaTime * (4 / 3));
    }
    prevFrameTime = Date.now();
    renderer.render(scene, camera);
}
animate();
document.onkeydown = (e) => {
    keys[e.key] = true;
}
document.onkeyup = (e) => {
    keys[e.key] = false;
}