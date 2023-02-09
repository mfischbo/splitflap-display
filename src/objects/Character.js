import { Vector2 } from 'three';

class Character {

  constructor(letter, index, offsetTop, offsetBottom) {
    this.letter = letter;
    this.index = index;
    this.offsetTop = offsetTop; // Vector2D
    this.offsetBottom = offsetBottom;
  }
}

class CharacterSet {

  constructor() {
     this.characters = [
          new Character("A", 0, new Vector2(-0.499, 0.12), new Vector2(-0.499, -0.19)),
          new Character("B", 1, new Vector2(-0.479, 0.12), new Vector2(-0.479, -0.19)),
          new Character("C", 2, new Vector2(-0.459, 0.12), new Vector2(-0.459, -0.19)),
          new Character("D", 3, new Vector2(-0.440, 0.12), new Vector2(-0.440, -0.19)),
          new Character("E", 4, new Vector2(-0.420, 0.12), new Vector2(-0.420, -0.19)),
          new Character("F", 5, new Vector2(-0.400, 0.12), new Vector2(-0.400, -0.19)),
          new Character("G", 6, new Vector2(-0.380, 0.12), new Vector2(-0.380, -0.19)),
          new Character("H", 7, new Vector2(-0.3605, 0.12), new Vector2(-0.3605, -0.19)),
          new Character("I", 8, new Vector2(-0.3405, 0.12), new Vector2(-0.3405, -0.19)),
          new Character("J", 9, new Vector2(-0.3215, 0.12), new Vector2(-0.3215, -0.19)),
          new Character("K", 10, new Vector2(-0.3013, 0.12), new Vector2(-0.3013, -0.19)),
          new Character("L", 11, new Vector2(-0.2805, 0.12), new Vector2(-0.2805, -0.19)),
          new Character("M", 12, new Vector2(-0.2618, 0.12), new Vector2(-0.2618, -0.19)),
          new Character("N", 13, new Vector2(-0.2420, 0.12), new Vector2(-0.2420, -0.19)),
          new Character("O", 14, new Vector2(-0.2220, 0.12), new Vector2(-0.2220, -0.19)),
          new Character("P", 15, new Vector2(-0.2020, 0.12), new Vector2(-0.2020, -0.19)),
          new Character("Q", 16, new Vector2(-0.1825, 0.15), new Vector2(-0.1825, -0.13)),
          new Character("R", 17, new Vector2(-0.1625, 0.12), new Vector2(-0.1625, -0.19)),
          new Character("S", 18, new Vector2(-0.1425, 0.12), new Vector2(-0.1425, -0.20)),
          new Character("T", 19, new Vector2(-0.1233, 0.12), new Vector2(-0.1233, -0.19)),
          new Character("U", 20, new Vector2(-0.1035, 0.12), new Vector2(-0.1035, -0.19)),
          new Character("V", 21, new Vector2(-0.0837, 0.12), new Vector2(-0.0837, -0.19)),
          new Character("W", 22, new Vector2(-0.0640, 0.12), new Vector2(-0.0640, -0.19)),
          new Character("X", 23, new Vector2(-0.0443, 0.12), new Vector2(-0.0443, -0.19)),
          new Character("Y", 24, new Vector2(-0.0245, 0.12), new Vector2(-0.0245, -0.19)),
          new Character("Z", 25, new Vector2(-0.0040, 0.12), new Vector2(-0.0040, -0.19)),

          new Character("0", 26, new Vector2(0.0153, 0.12), new Vector2(0.0153, -0.19)),
          new Character("1", 27, new Vector2(0.0353, 0.12), new Vector2(0.0353, -0.19)),
          new Character("2", 28, new Vector2(0.0546, 0.12), new Vector2(0.0546, -0.19)),
          new Character("3", 29, new Vector2(0.0746, 0.12), new Vector2(0.0746, -0.19)),
          new Character("4", 30, new Vector2(0.0946, 0.12), new Vector2(0.0946, -0.19)),
          new Character("5", 31, new Vector2(0.1142, 0.12), new Vector2(0.1142, -0.19)),
          new Character("6", 32, new Vector2(0.1337, 0.12), new Vector2(0.1337, -0.19)),
          new Character("7", 33, new Vector2(0.1535, 0.12), new Vector2(0.1535, -0.19)),
          new Character("8", 34, new Vector2(0.1735, 0.12), new Vector2(0.1735, -0.19)),
          new Character("9", 35, new Vector2(0.1930, 0.12), new Vector2(0.1930, -0.19)),

          new Character(".", 36, new Vector2(0.2130, 0.12), new Vector2(0.2130, -0.19)),
          new Character("!", 37, new Vector2(0.2330, 0.12), new Vector2(0.2330, -0.19)),
          new Character("$", 38, new Vector2(0.2530, 0.19), new Vector2(0.2530, -0.13)),
          new Character("%", 39, new Vector2(0.2720, 0.12), new Vector2(0.2720, -0.19)),
          new Character("(", 40, new Vector2(0.2920, 0.16), new Vector2(0.2920, -0.12)),
          new Character(")", 41, new Vector2(0.3120, 0.16), new Vector2(0.3120, -0.12)),
          new Character("+", 42, new Vector2(0.3314, 0.12), new Vector2(0.3314, -0.19)),
          new Character("-", 43, new Vector2(0.3510, 0.12), new Vector2(0.3510, -0.15)),
          new Character("?", 44, new Vector2(0.3710, 0.12), new Vector2(0.3710, -0.19)),
          new Character(" ", 45, new Vector2(0.3910, 0.12), new Vector2(0.3910, -0.19)),
          new Character(":", 46, new Vector2(0.4110, 0.12), new Vector2(0.4110, -0.19)),
          new Character("/", 47, new Vector2(0.4310, 0.12), new Vector2(0.4310, -0.19)),
          new Character("*", 48, new Vector2(0.4510, 0.12), new Vector2(0.4510, -0.19)),
          new Character("\"",49, new Vector2(0.4710, 0.12), new Vector2(0.4710, -0.19))
        ];
  }

  char(char) {
    return this.characters.filter(c => c.letter == char)[0];
  }

  index(idx) {
    return this.characters[idx];
  }

  size() {
    return this.characters.length;
  }
}

const CharSet = new CharacterSet();
export default CharSet;
