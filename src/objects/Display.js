import { TextureLoader, Clock } from 'three';
import SplitFlap from './flap/splitflap.js';
//import FLAP_TEXTURE from '../textures/textures.js';
import FLAP_TEXTURE from '../textures/fonts-170mm-85mm-4.png'

export default class Display {

  constructor(width, height, audioService, scene) {
    this.width = width;
    this.height = height;
    this.audioService = audioService;

    const textureLoader = new TextureLoader();
    this.clock = new Clock();

    var texture = textureLoader.load(FLAP_TEXTURE);
    this.flaps = [];

    var offsetX = 0.20;
    var offsetY = 0.41;

    var topY = (this.height-1) * 0.36;
    for (var y = 0; y < this.height; ++y) {
      for (var x = 0; x < this.width; ++x) {
        let flap = new SplitFlap(offsetX * x, topY - offsetY * y, texture);
        this.flaps.push(flap);
        scene.add(flap);
      }
    }

    let that = this;
    window.addEventListener('keyup', (e) => {

          if (e.key == 'ArrowUp') {
            that.flaps.forEach((flap) => flap.position.y += 0.01);
          }
          if (e.key == 'ArrowLeft') {
            that.flaps.forEach((flap) => flap.position.x -= 0.1);
          }
          if (e.key == 'ArrowRight') {
            that.flaps.forEach((flap) => flap.position.x += 0.1);
          }
          if (e.key == 'ArrowDown') {
            that.flaps.forEach((flap) => flap.position.y -= 0.01);
          }
          if (e.key == 'w') {
            that.flaps.forEach((flap) => flap.position.z += 0.01);
          }
          if (e.key == 's') {
            that.flaps.forEach((flap) => flap.position.z -= 0.01);
          }

          if (e.key == '1') {
            that.flaps.forEach((flap) => flap.scale.x -= 0.1);
          }
          if (e.key == '2') {
            that.flaps.forEach((flap) => flap.scale.x += 0.1);
          }
          if (e.key == '3') {
            that.flaps.forEach((flap) => flap.scale.y -= 0.1);
          }
          if (e.key == '4') {
            that.flaps.forEach((flap) => flap.scale.y += 0.1);
          }


          console.log("Coords: ", [
            /*that.gltf.scene.position.x,
            that.gltf.scene.position.y,
            that.gltf.scene.position.z,
            that.gltf.scene.scale.x,
            that.gltf.scene.scale.y*/
            that.flaps[0].position,
            that.flaps[0].scale
          ]);
        });


  }

  /**
   * Expects a string text to be displayed.
   */
  display(text) {
    console.log("Displaying text", text, text.length, this.flaps.length);
    var playQueue = [];
    for (var i=0; i < text.length; ++i) {

      // TODO: Can be saved when trimming the text to length before entering the loop
      if (i > this.flaps.length) {
        break;
      }
      var queueIndex = this.flaps[i].rollTo(text[i])
      if (queueIndex != 0) {
        playQueue.push(queueIndex);
      }
    }

    // given te play queue select the sound
    // special case: length 1 - single sound
    if (playQueue.length == 0) {
      return;
    }

    if (playQueue.length == 1 && playQueue[0] == 1) {
      this.audioService.playOneShot();
    } else {

      var maxDuration = Math.max(...playQueue) * 0.1 * 1000; // TODO: Retrieve 0.25 from flap class animation clip
      this.audioService.playLoop();
      var that = this;
      window.setTimeout(function() {
        that.audioService.stopAll();
      }, maxDuration);
    }
  }

  update() {
    var delta = this.clock.getDelta();
    this.flaps.forEach(function(flap) {
      flap.update(delta);
    });
  }
}
