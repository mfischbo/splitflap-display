/**
 * entry.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */

import { WebGLRenderer, Scene, Vector3 } from 'three';
import { PerspectiveCamera } from 'three';
import SeedScene from './objects/Scene.js';

const scene = new Scene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({antialias: false});
const seedScene = new SeedScene(camera);

const setup = [{
  dimX : 15,
  dimY : 4,

  // scene position
  x : -1.26,
  y : -0.55,
  z : -8.5,
  zoom : 7.8,
}, {
  dimX : 24,
  dimY : 6,

}];

// scene
seedScene.position.x -= 2.08
seedScene.position.y -= 0.90;
seedScene.position.z = 2.0;
scene.add(seedScene);

// camera

//camera.position.set(0.0,0.0,5.0);
camera.position.set(.0, 0.0, 5.1);
camera.lookAt(new Vector3(0.0,0.0,0.0));
camera.zoom = 1;
//camera.updateProjectionMatrix();

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
//renderer.setClearColor(0x090909, 1);
renderer.setClearColor(0xFFFFFF, 1);

const onAnimationFrameHandler = (timeStamp) => {
  renderer.render(scene, camera);
  seedScene.update && seedScene.update(timeStamp);
  window.requestAnimationFrame(onAnimationFrameHandler);
}
window.requestAnimationFrame(onAnimationFrameHandler);

// resize
const windowResizeHandler = () => {
  const { innerHeight, innerWidth } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler);

// dom
document.body.style.margin = 0;
document.body.appendChild( renderer.domElement );

