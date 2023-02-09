import { Group, TextureLoader, SpriteMaterial, MeshBasicMaterial, Vector2, LoopRepeat } from 'three';
import { AnimationMixer } from 'three';
import { ClampToEdgeWrapping } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import CharSet from '../Character.js';
//import GLB_MODEL from './splitflap-data.js';
import GLB_MODEL from './split-flap-thin.glb';

export default class SplitFlap extends Group {


  constructor(posX, posY, texture) {

    const loader = new GLTFLoader();

    super();

    this.textures = [];
    this.textures[0] = texture.clone(true);
    this.textures[1] = texture.clone(true);
    this.textures[2] = texture.clone(true);
    this.textures[3] = texture.clone(true);

    this.textures[0].center = new Vector2(0.5, 0.5);
    this.textures[0].rotation = -Math.PI / 2;
    this.textures[0].flipY = false;
    this.textures[0].repeat.set(0.07, 1.3);

    this.textures[1].center = new Vector2(0.5, 0.5);
    this.textures[1].rotation = -Math.PI / 2;
    this.textures[1].flipY = false;
    this.textures[1].repeat.set(0.07, 1.3);

    this.textures[2].center = new Vector2(0.5, 0.5);
    this.textures[2].rotation = -Math.PI / 2;
    this.textures[2].flipY = false;
    this.textures[2].repeat.set(0.07, 1.3);

    this.textures[3].center = new Vector2(0.5, 0.5);
    this.textures[3].rotation = -Math.PI / 2;
    this.textures[3].flipY = false;
    this.textures[3].repeat.set(0.07, 1.3);


    this.name = 'splitflap';
    this.actions = [];
    this.gltf = undefined;
    this.frontFace = CharSet.char(' ');
    this.backFace = CharSet.char('A');
    this.rollIndex = this.frontFace.index;

    let that = this;
    loader.load(GLB_MODEL, (gltf) => {

      gltf.scene.rotation.y = Math.PI / 2;
      gltf.scene.rotation.z = Math.PI / 2;
      gltf.scene.position.x = posX + 1.18;
      gltf.scene.position.y = posY + 0.72;
      gltf.scene.position.z = 1.00

      this.scale.x = 0.6;
      this.scale.y = 0.6;
      this.position.z = 0.05;

      this.add(gltf.scene);
      this.mixer = new AnimationMixer(gltf.scene);


      this.mixer.addEventListener('loop', function(e) {

        if (e.action != that.actions[0]) {
          return;
        }

        // if the back face shows the correct index
        if (that.backFace.index == that.rollIndex) {
          that.mixer.stopAllAction();
          that.setFrontFace(that.backFace);
          that.setBackFace(CharSet.index((that.backFace.index + 1) % CharSet.size()));
          that.actions.forEach(function(action) {
            action.reset();
          });
          return;
        }

        var nextIndex = (that.backFace.index + 1) % CharSet.size();
        that.setFrontFace(that.backFace);
        that.setBackFace(CharSet.index(nextIndex));
      });

      this.gltf = gltf;



      gltf.animations.forEach(function(i) {
        var action = that.mixer.clipAction(i);
        action.clampWhenFinished = true;
        action.setLoop(LoopRepeat, 100);
        action.timeScale = 2.5;
        that.actions.push(action);
      });

      gltf.scene.traverse(function(child) {

        if (child.isMesh && child.material.name == "C3_T") {
          child.material = new MeshBasicMaterial({map: that.textures[0], name: "C3_T"} );
        }
        if (child.isMesh && child.material.name == "C1_T") {
          child.material = new MeshBasicMaterial({map: that.textures[1], name: "C1_T" });
        }

        if (child.isMesh && child.material.name == "C2_T") {
          child.material = new MeshBasicMaterial({map: that.textures[2], name: "C2_T" });
        }

        if (child.isMesh && child.material.name == "C3_B") {
          child.material = new MeshBasicMaterial({map: that.textures[3], name: "C3_B" });
        }
      });

      that.setFrontFace(this.frontFace);
      that.setBackFace(this.backFace);
    });
  }

  setFrontFace(character) {
    this.textures[0].offset = character.offsetTop;
    this.textures[1].offset = character.offsetBottom;
    this.frontFace = character;
  }

  setBackFace(character) {
    this.textures[2].offset = character.offsetTop;
    this.textures[3].offset = character.offsetBottom;
    this.backFace = character;
  }

  /**
   * Runs the animation to the specified character.
   * key - The character (as string) to be rolled to.
   * returns the amount of animation loops until the character is reached
   */
  rollTo(key) {

    var character = CharSet.char(key);

    // stop on unknown key
    if (!character) {
      return 0;
    }

    // do nothing if the front face already shows the character
    if (this.frontFace.index == character.index) {
      return 0;
    }

    // calculate animation loops
    let loopCount = 0;
    if (this.frontFace.index <= character.index) {
      loopCount = character.index - this.frontFace.index;
    } else {
      loopCount = CharSet.size() - this.frontFace.index + character.index;
    }

    // reset and launch the animation
    this.rollIndex = character.index;
    this.actions.forEach(function(action) {
      action.reset();
      action.setLoop(LoopRepeat, CharSet.size() + 1);
    });



    this.play();
    return loopCount;
  }

  play() {
    for (var i=0; i < this.actions.length; ++i) {
      this.actions[i].play();
    }
  }

  update(deltaSecs) {
  	if (this.mixer) {
  		this.mixer.update(deltaSecs);
  	}
  }
}
