#!/bin/bash

DATA=$(base64 -w 0 ./src/textures/fonts-170mm-85mm-3.png)

echo "const FLAP_TEXTURE = \"data:application/octet-stream;base64,${DATA}\";"
echo "export default FLAP_TEXTURE;"

