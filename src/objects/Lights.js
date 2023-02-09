import { Group, SpotLight, PointLight, AmbientLight, HemisphereLight, Color } from 'three';

export default class BasicLights extends Group {
  constructor(...args) {
    super(...args);

    const point = new PointLight(0xFFFFFF, 1, 10, 0.5);
    const dir = new SpotLight(0xFFFFFF, 0.8, 10, 0.8, 1, 1);
    const ambi = new AmbientLight( 0xFFFFFF , 6);
    const hemi = new HemisphereLight( 0xffffbb, 0x080820, 1.30 )

    dir.position.set(1, 2, 0);
    dir.target.position.set(0,0,0);

    point.position.set(0, 1, 2);
    point.intensity = 1;

    this.add(/*point, */ambi, hemi/*, dir*/);

  }
}
