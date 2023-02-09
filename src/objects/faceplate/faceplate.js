import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import FACEPLATE_MODEL from './faceplate-2.glb'; // TODO: Convert to base64

export default class FacePlate extends Group {

  constructor() {
    const loader = new GLTFLoader()
    super();

    var that = this;
    loader.load(FACEPLATE_MODEL, (gltf) => {
      that.gltf = gltf;
      /*
      gltf.scene.position.x = 2.07;
      gltf.scene.position.y = 0.9
      gltf.scene.position.z = -0.2

      gltf.scene.scale.x = 1.45;
      gltf.scene.scale.y = 1.58;
      */

      //gltf.scene.rotation.z += Math.PI;
      gltf.scene.scale.x *= 0.1;
      gltf.scene.scale.y *= 0.1;
      gltf.scene.scale.z *= 0.1;

      gltf.scene.position.x = 2.08;
      gltf.scene.position.y = 0.9;
      gltf.scene.position.z = 0.97;

      //gltf.scene.rotation.y += Math.PI / 2;
      this.add(gltf.scene);
    });

    /*
    window.addEventListener('keyup', (e) => {

      if (e.key == 'ArrowUp') {
        that.gltf.scene.position.y += 0.01;
      }
      if (e.key == 'ArrowLeft') {
        that.gltf.scene.position.x -= 0.01;
      }
      if (e.key == 'ArrowRight') {
        that.gltf.scene.position.x += 0.01;
      }
      if (e.key == 'ArrowDown') {
        that.gltf.scene.position.y -= 0.01;
      }
      if (e.key == 'w') {
        that.gltf.scene.position.z -= 0.01
      }
      if (e.key == 's') {
        that.gltf.scene.position.z += 0.01
      }
      /*
      if (e.key == '1') {
        that.gltf.scene.scale.x -= 0.1;;
      }
      if (e.key == '2') {
        that.gltf.scene.scale.x += 0.1;;
      }
      if (e.key == '3') {
        that.gltf.scene.scale.y -= 0.1;;
      }
      if (e.key == '4') {
        that.gltf.scene.scale.y += 0.1;;
      }


      console.log("Coords: ", [
        that.gltf.scene.position.x,
        that.gltf.scene.position.y,
        that.gltf.scene.position.z,
        that.gltf.scene.scale.x,
        that.gltf.scene.scale.y
      ]);
    });
    */
  }
}
