import { Group, Clock } from 'three';
import SplitFlap from './flap/splitflap.js';
import CharSet from './Character.js';
import BasicLights from './Lights.js';
import { TextureLoader } from 'three';
import AudioService from './AudioService.js';
import Display from './Display.js';
//import Housing from './housing/housing.js';
import Faceplate from './faceplate/faceplate.js';

export default class SeedScene extends Group {

  constructor(camera) {

/*
    var messages = [
      "1              2              3              4             .",
      "GOOD MORNING!  BERLIN    15-01               04.02.2023   4C",
      "ZELDI IS IN    THE HOUSE                                    ",
      "WE LOVE PIZZA                 FOOBAR GOOD!                  ",
      "DJ PREMIER      PETE ROCK        J-DILLA         WU-TANG!   ",
      "U5  HBF    2114U5  HOENOW 2116M10 WARSCH.2110M10 HBF    2130"
    ];
*/
/*
    var messages = [
      "                                                                                                                                                ",
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.!$%()+-? :/*\""
    ];
*/

    const textureLoader = new TextureLoader();
    const audioService = new AudioService(camera);
    const url = "http://192.168.178.28:8080/index.txt?display=1";

    const dimX = 24;
    const dimY = 6;



    super();
    this.display = new Display(dimX, dimY, audioService, this);
    //this.housing = new Housing();
    this.faceplate = new Faceplate();
    const lights = new BasicLights();
    this.add(lights);
    //this.add(this.housing);
    this.add(this.faceplate);
    this.camera = camera;
    this.fpsCounter = 0;

    let that = this;

    window.addEventListener('keyup', function(event) {

      audioService.resumeContext();
      console.log(event)
      if (event.key == ' ') {
        var index = Math.floor(Math.random() * (messages.length));
        that.display.display(messages[index]);
      }
    });


    this.fetchAndDisplay();
    window.setInterval(function() {
      fetch("http://192.168.178.28:8080/index.txt?display=1")
        .then((response) => response.text())
        .then((data) => {
          that.display.display(data);
        });
    }, 10000);

    /*
    window.setInterval(function() {
      console.log("FPS:", new Date().getSeconds(), that.fpsCounter);
      that.fpsCounter = 0;
    }, 1000);
    */
  }

  fetchAndDisplay() {
    var display = this.display;
    fetch("http://192.168.178.28:8080/index.txt?display=1")
    .then((response) => response.text())
    .then((data) => {
      display.display(data);
    });
  }

  update(timeStamp) {
    this.display.update();
    this.fpsCounter++;
  }
}
