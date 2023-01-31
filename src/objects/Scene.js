import { Group, Clock } from 'three';
import SplitFlap from './flap/splitflap.js';
import CharSet from './Character.js';
import BasicLights from './Lights.js';

export default class SeedScene extends Group {

  constructor() {
    super();
    this.flaps = [];
    this.clock = new Clock();
    var x = 0;
    for (var i=0; i < 10; i++) {
      for (var q=0; q < 4; q++) {

         this.flaps[x] = new SplitFlap(0.18 * i, 0.36 * q);
         this.add(this.flaps[x]);
         x++;
      }
    }

    const lights = new BasicLights();
    this.add(lights);

    let that = this;
    window.addEventListener('keyup', function(event) {
      console.log(event);


      var display = "";
      for (var i=0; i < that.flaps.length; i++) {
          var rnd = Math.floor(Math.random() * 46);
          var character = CharSet.index(rnd);
          display += character.letter;
          that.flaps[i].rollTo(character.letter);
      }
      console.log(display);
    });
  }

  update(timeStamp) {
    var delta = this.clock.getDelta();
    this.flaps.forEach(function(e) {
      e.update(delta);
    });
  }
}
