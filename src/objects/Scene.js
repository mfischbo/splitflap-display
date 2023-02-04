import { Group, Clock } from 'three';
import SplitFlap from './flap/splitflap.js';
import CharSet from './Character.js';
import BasicLights from './Lights.js';
import { TextureLoader } from 'three';
import FLAP_TEXTURE from '../textures/textures.js';
import AudioService from './AudioService.js';
import Display from './Display.js';

export default class SeedScene extends Group {

  constructor(camera) {

    const textureLoader = new TextureLoader();
    const audioService = new AudioService(camera);

    super();
    this.display = new Display(5, 5, audioService, this);
    const lights = new BasicLights();
    this.add(lights);
    this.camera = camera;

    let that = this;
    window.addEventListener('keyup', function(event) {

      audioService.resumeContext();

      var text = "";
      for (var i=0; i < 25; i++) {
          var rnd = Math.floor(Math.random() * 46);
          var character = CharSet.index(rnd);
          text += character.letter;
      }
      that.display.display(text);
    });
  }

  update(timeStamp) {
    this.display.update();
  }
}
