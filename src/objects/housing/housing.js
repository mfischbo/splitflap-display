import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import HOUSING_MODEL from './housing.glb'; // TODO: Convert to base64

export default class Housing extends Group {

  constructor() {
    const loader = new GLTFLoader()
    super();

    var that = this;
    loader.load(HOUSING_MODEL, (gltf) => {
      that.gltf = gltf;
      gltf.scene.position.x = 2.07;
      gltf.scene.position.y = 0.9
      gltf.scene.position.z = -0.2


      gltf.scene.scale.x = 1.45;
      gltf.scene.scale.y = 1.58;

      this.add(gltf.scene);
    });

    window.addEventListener('keyup', (e) => {

      if (e.key == 'ArrowUp') {
        that.gltf.scene.position.y += 0.01
      }
      if (e.key == 'ArrowLeft') {
        that.gltf.scene.position.x -= 0.01
      }
      if (e.key == 'ArrowRight') {
        that.gltf.scene.position.x += 0.01
      }
      if (e.key == 'ArrowDown') {
        that.gltf.scene.position.y -= 0.01
      }
      if (e.key == 'w') {
        that.gltf.scene.position.z -= 0.01
      }
      if (e.key == 's') {
        that.gltf.scene.position.z += 0.01
      }
      if (e.key == '1') {
        that.gltf.scene.scale.x -= 0.01
      }
      if (e.key == '2') {
        that.gltf.scene.scale.x += 0.01
      }
      if (e.key == '3') {
        that.gltf.scene.scale.y -= 0.01
      }
      if (e.key == '4') {
        that.gltf.scene.scale.y += 0.01
      }


      console.log("Coords: ", [
        that.gltf.scene.position.x,
        that.gltf.scene.position.y,
        that.gltf.scene.position.z,
        that.gltf.scene.scale.x,
        that.gltf.scene.scale.y
      ])
    });
  }
}
