import { AudioListener, Audio, AudioLoader } from 'three';
import SINGLE from '../audio/single.mp3';
import MULTI from '../audio/multi-one-shot.mp3';
import MULTI_LOOP from '../audio/multi-loopable.mp3';

export default class AudioService {

  constructor(camera) {

    this.listener = new AudioListener();
    const audioLoader = new AudioLoader();
    camera.add(this.listener);

    this.single = new Audio(this.listener);
    this.multiOneShot = new Audio(this.listener);
    this.multiLoop = new Audio(this.listener);

    var that = this;
    audioLoader.load(SINGLE, function(buffer) {
      that.single.setBuffer(buffer);
      that.single.setLoop(false);
      that.single.setVolume(1);
    });

    audioLoader.load(MULTI, function(buffer) {
      that.multiOneShot.setBuffer(buffer);
      that.multiOneShot.setLoop(false);
      that.multiOneShot.setVolume(1);
    });

    audioLoader.load(MULTI_LOOP, function(buffer) {
      that.multiLoop.setBuffer(buffer);
      that.multiLoop.setLoop(true);
      that.multiLoop.setVolume(1);
    });
  }

  resumeContext() {
    this.listener.context.resume();
  }

  playOneShot() {
    this.single.play();
  }

  playMulti() {
    this.multiOneShot.play();
  }

  playLoop() {
    console.log("Playing multi loop");
    this.multiLoop.play();
  }


  stopAll() {
    if (this.single.isPlaying) {
      this.single.stop();
    }
    if (this.multiOneShot.isPlaying) {
      this.multiOneShot.stop();
    }
    if (this.multiLoop.isPlaying) {
      this.multiLoop.stop();
    }
  }
}
