/**
 * entry.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */

import { WebGLRenderer, OrthographicCamera, Scene, Vector3, Clock } from 'three';
import { FirstPersonControls } from 'three';
import SeedScene from './objects/Scene.js';

const scene = new Scene();
const camera = new OrthographicCamera();
const renderer = new WebGLRenderer({antialias: true});
const seedScene = new SeedScene();

// scene
seedScene.position.x -= 0.8;
seedScene.position.y -= 0.5;
seedScene.position.z -= 8.5;
scene.add(seedScene);

// camera

camera.position.set(0.0,0.0,4.0);
camera.lookAt(new Vector3(0.0,0.0,0.0));
//camera.zoom = 0;

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x0a0a0a, 1);

const onAnimationFrameHandler = (timeStamp) => {
  renderer.render(scene, camera);
  seedScene.update && seedScene.update(timeStamp);
  window.requestAnimationFrame(onAnimationFrameHandler);
}
window.requestAnimationFrame(onAnimationFrameHandler);

// resize
const windowResizeHanlder = () => {
  const { innerHeight, innerWidth } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};
windowResizeHanlder();
window.addEventListener('resize', windowResizeHanlder);

// dom
document.body.style.margin = 0;
document.body.appendChild( renderer.domElement );

