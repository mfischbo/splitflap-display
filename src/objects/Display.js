import { TextureLoader, Clock } from 'three';
import SplitFlap from './flap/splitflap.js';
import FLAP_TEXTURE from '../textures/textures.js';

export default class Display {

  constructor(width, height, audioService, scene) {
    this.width = width;
    this.height = height;
    this.audioService = audioService;

    const textureLoader = new TextureLoader();
    this.clock = new Clock();

    var texture = textureLoader.load(FLAP_TEXTURE);
    this.flaps = [];

    var topY = (this.height-1) * 0.36;
    for (var y = 0; y < this.height; ++y) {
      for (var x = 0; x < this.width; ++x) {
        let flap = new SplitFlap(0.18 * x, topY - 0.36*y, texture);
        this.flaps.push(flap);
        scene.add(flap);
      }
    }
  }

  /**
   * Expects a string text to be displayed.
   */
  display(text) {
    console.log("Displaying text", text, text.length, this.flaps.length);
    var playQueue = [];
    for (var i=0; i < text.length; i++) {
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
    if (playQueue.length == 1 && playQueue[0] == 1) {
      this.audioService.playOneShot();
    } else {
      console.log(playQueue);
      var maxDuration = Math.max(...playQueue) * 0.1 * 1000; // TODO: Retrieve 0.25 from flap class animation clip
      console.log("Calculated animation duration:", maxDuration);
      this.audioService.playMulti();
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
