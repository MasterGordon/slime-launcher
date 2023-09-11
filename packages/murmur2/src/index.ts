import fs from "fs-extra";

// Code from https://github.com/node-modules/node-murmurhash/blob/master/lib/murmur.js
// And https://github.com/AndrewToaster/ForgedCurse/blob/main/ForgedCurse/Utility/MurmurrHash2.cs

const hashNormal = (buffer: Buffer): number[] => {
  const normalByes: number[] = [];
  for (let i = 0; i < buffer.length; i++) {
    const b = buffer[i];

    if (!(b == 9 || b == 10 || b == 13 || b == 32)) {
      normalByes.push(b);
    }
  }
  return normalByes;
};

const MURMUR_HASH_M = 0x5bd1e995 as const;

const negative = (num: number) => {
  if (num < 127) {
    return num;
  }
  return num | 0xffffff00;
};

const imul = (() => {
  if (Math.imul) {
    return Math.imul;
  } else {
    return function (a: number, b: number) {
      return ((((a >> 16) * b) & 0xffff) << 16) + (a & 0xffff) * b;
    };
  }
})();

const murmurHash2 = (key: number[], seed: number) => {
  let l = key.length;
  let h = seed ^ l;
  let i = 0;
  let k = 0;

  while (l >= 4) {
    k = key[i] | (key[i + 1] << 8) | (key[i + 2] << 16) | (key[i + 3] << 24);

    k = imul(k, MURMUR_HASH_M);

    k ^= k >>> 24;
    k = imul(k, MURMUR_HASH_M);

    h = imul(h, MURMUR_HASH_M) ^ k;

    l -= 4;
    i += 4;
  }

  switch (l) {
    case 3:
      h ^= negative(key[i + 2]) << 16;
      break;
    case 2:
      h ^= negative(key[i + 1]) << 8;
      break;
    case 1:
      h ^= negative(key[i]);
      h = imul(h, MURMUR_HASH_M);
      break;
  }

  h ^= h >>> 13;
  h = imul(h, MURMUR_HASH_M);
  h ^= h >>> 15;

  return h >>> 0;
};

export const murmur2 = async (filePath: string): Promise<number> => {
  const buffer = await fs.readFile(filePath);
  const normalByes = hashNormal(buffer);
  return murmurHash2(normalByes, 1);
};
