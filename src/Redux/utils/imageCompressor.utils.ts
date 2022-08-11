/* eslint-disable no-bitwise */
/* eslint-disable no-param-reassign */

function log2(v: number) {
  // taken from http://graphics.stanford.edu/~seander/bithacks.html
  const b = [0x2, 0xc, 0xf0, 0xff00, 0xffff0000];
  const S = [1, 2, 4, 8, 16];
  let i = 0;
  let r = 0;

  for (i = 4; i >= 0; i -= 1) {
    if (v & b[i]) {
      v >>= S[i];
      r |= S[i];
    }
  }
  return r;
}

function normaliseScale(s: number) {
  if (s > 1) {
    throw new Error('s must be <1');
  }
  s = 0 | (1 / s);
  let l = log2(s);
  let mask = 1 << l;
  let accuracy = 4;
  while (accuracy && l) {
    l -= 1;
    mask |= 1 << l;
    accuracy -= 1;
  }
  return 1 / (s & mask);
}

// scales the canvas by (float) scale < 1
// returns a new canvas containing the scaled image.
const downScaleCanvas = (cv: HTMLCanvasElement, scale: number) => {
  if (!(scale < 1) || !(scale > 0)) {
    throw new Error('scale must be a positive number <1 ');
  }
  scale = normaliseScale(scale);
  const sqScale = scale * scale; // square scale =  area of a source pixel within target
  const sw = cv.width; // source image width
  const sh = cv.height; // source image height
  const tw = Math.floor(sw * scale); // target image width
  const th = Math.floor(sh * scale); // target image height
  let sx = 0;
  let sy = 0;
  let sIndex = 0; // source x,y, index within source array
  let tx = 0;
  let ty = 0;
  let yIndex = 0;
  let tIndex = 0; // target x,y, x,y index within target array
  let tX = 0;
  let tY = 0; // rounded tx, ty
  let w = 0;
  let nw = 0;
  let wx = 0;
  let nwx = 0;
  let wy = 0;
  let nwy = 0; // weight / next weight x / y
  // weight is weight of current source point within target.
  // next weight is weight of current source point within next target's point.
  let crossX = false; // does scaled px cross its current px right border ?
  let crossY = false; // does scaled px cross its current px bottom border ?
  const sBuffer = cv?.getContext('2d')?.getImageData(0, 0, sw, sh).data; // source buffer 8 bit rgba
  const tBuffer = new Float32Array(3 * tw * th); // target buffer Float32 rgb
  let sR = 0;
  let sG = 0;
  let sB = 0; // source's current point r,g,b

  for (sy = 0; sy < sh; sy += 1) {
    ty = sy * scale; // y src position within target
    tY = 0 | ty; // rounded : target pixel's y
    yIndex = 3 * tY * tw; // line index within target array
    crossY = tY !== (0 | (ty + scale));
    if (crossY) {
      // if pixel is crossing botton target pixel
      wy = tY + 1 - ty; // weight of point within target pixel
      nwy = ty + scale - tY - 1; // ... within y+1 target pixel
    }
    for (sx = 0; sx < sw; sx += 1, sIndex += 4) {
      tx = sx * scale; // x src position within target
      tX = 0 | tx; // rounded : target pixel's x
      tIndex = yIndex + tX * 3; // target pixel index within target array
      crossX = tX !== (0 | (tx + scale));
      if (crossX) {
        // if pixel is crossing target pixel's right
        wx = tX + 1 - tx; // weight of point within target pixel
        nwx = tx + scale - tX - 1; // ... within x+1 target pixel
      }
      if (sBuffer) {
        sR = sBuffer[sIndex]; // retrieving r,g,b for curr src px.
        sG = sBuffer[sIndex + 1];
        sB = sBuffer[sIndex + 2];
      }
      if (!crossX && !crossY) {
        // pixel does not cross
        // just add components weighted by squared scale.
        tBuffer[tIndex] += sR * sqScale;
        tBuffer[tIndex + 1] += sG * sqScale;
        tBuffer[tIndex + 2] += sB * sqScale;
      } else if (crossX && !crossY) {
        // cross on X only
        w = wx * scale;
        // add weighted component for current px
        tBuffer[tIndex] += sR * w;
        tBuffer[tIndex + 1] += sG * w;
        tBuffer[tIndex + 2] += sB * w;
        // add weighted component for next (tX+1) px
        nw = nwx * scale;
        tBuffer[tIndex + 3] += sR * nw;
        tBuffer[tIndex + 4] += sG * nw;
        tBuffer[tIndex + 5] += sB * nw;
      } else if (!crossX && crossY) {
        // cross on Y only
        w = wy * scale;
        // add weighted component for current px
        tBuffer[tIndex] += sR * w;
        tBuffer[tIndex + 1] += sG * w;
        tBuffer[tIndex + 2] += sB * w;
        // add weighted component for next (tY+1) px
        nw = nwy * scale;
        tBuffer[tIndex + 3 * tw] += sR * nw;
        tBuffer[tIndex + 3 * tw + 1] += sG * nw;
        tBuffer[tIndex + 3 * tw + 2] += sB * nw;
      } else {
        // crosses both x and y : four target points involved
        // add weighted component for current px
        w = wx * wy;
        tBuffer[tIndex] += sR * w;
        tBuffer[tIndex + 1] += sG * w;
        tBuffer[tIndex + 2] += sB * w;
        // for tX + 1; tY px
        nw = nwx * wy;
        tBuffer[tIndex + 3] += sR * nw;
        tBuffer[tIndex + 4] += sG * nw;
        tBuffer[tIndex + 5] += sB * nw;
        // for tX ; tY + 1 px
        nw = wx * nwy;
        tBuffer[tIndex + 3 * tw] += sR * nw;
        tBuffer[tIndex + 3 * tw + 1] += sG * nw;
        tBuffer[tIndex + 3 * tw + 2] += sB * nw;
        // for tX + 1 ; tY +1 px
        nw = nwx * nwy;
        tBuffer[tIndex + 3 * tw + 3] += sR * nw;
        tBuffer[tIndex + 3 * tw + 4] += sG * nw;
        tBuffer[tIndex + 3 * tw + 5] += sB * nw;
      }
    } // end for sx
  } // end for sy

  // create result canvas
  const resCV = document.createElement('canvas');
  resCV.width = tw;
  resCV.height = th;
  const resCtx = resCV.getContext('2d');
  const imgRes = resCtx?.getImageData(0, 0, tw, th);
  const tByteBuffer = imgRes?.data;
  // convert float32 array into a UInt8Clamped Array
  let pxIndex = 0; //
  for (
    sIndex = 0, tIndex = 0;
    pxIndex < tw * th;
    sIndex += 3, tIndex += 4, pxIndex += 1
  ) {
    if (tBuffer && tByteBuffer) {
      tByteBuffer[tIndex] = 0 | tBuffer[sIndex];
      tByteBuffer[tIndex + 1] = 0 | tBuffer[sIndex + 1];
      tByteBuffer[tIndex + 2] = 0 | tBuffer[sIndex + 2];
      tByteBuffer[tIndex + 3] = 255;
    }
  }
  // writing result to canvas.
  if (imgRes) {
    resCtx?.putImageData(imgRes, 0, 0);
  }
  return resCV;
};

export const compressImage = (img: HTMLImageElement, scale: number) => {
  const imgCV = document.createElement('canvas');
  imgCV.width = img.width;
  imgCV.height = img.height;
  const imgCtx = imgCV.getContext('2d');
  imgCtx?.drawImage(img, 0, 0);
  return downScaleCanvas(imgCV, scale);
};

/*
example

const scaledImage = compressImage(img, 0.3);

// to check performance
ed = performance.now();

var pixelCount = img.width * img.height;
console.log('time taken for ' +( pixelCount) + ' pixels ' + (ed-st) + '.  '
                   + (1e3*(ed-st)/pixelCount) + ' ns per pixel '  );

context.fillStyle = '#000';
context.fillText('pixel perfect scale.', 320, 220);
context.drawImage(scaledImage, 287, 10);
context.drawImage(img, 20, 10, 247, 186);

context.fillText('canvas scale, less blurry / more noisy', 50, 220);

*/
