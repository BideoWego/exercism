
const _aCode = 97;
const _zCode = _aCode + 25;
const _alpha = 'abcdefghijklmnopqrstuvwxyz';

const _map = () => {
  const map = {};
  for (let i = 0; i <= 25; i++) {
    const char = String.fromCharCode(_aCode + i);
    map[char] = i;
  }
  return map;
};

const _key = () => {
  const empty = Array(100);
  return Array.apply(null, empty)
    .map(() => {
      const r = Math.random() * _alpha.length;
      const f = Math.floor(r);
      return _alpha[f];
    })
    .join('');
};


class Cipher {
  constructor(key=_key()) {
    if (!key || !(/^[a-z]+$/.test(key))) {
      throw new Error("Bad key");
    }
    this.key = key;
    this._map = _map();
  }

  encode(str) {
    let encoded = '';
    for (let i = 0; i < str.length; i++) {
      const strChar = str[i];
      const strCharCode = strChar.charCodeAt(0);
      const keyIndex = i % this.key.length;
      const keyChar = this.key[keyIndex];
      const keyCharCode = keyChar.charCodeAt(0);
      let shiftedCode = strCharCode + this._map[keyChar];
      if (shiftedCode > _zCode) {
        const first = _aCode - 1;
        const diff = shiftedCode - _zCode;
        shiftedCode = first + diff;
      }
      const encodedChar = String.fromCharCode(shiftedCode);
      encoded += encodedChar;
    }
    return encoded;
  }

  decode(str) {
    let decoded = '';
    for (let i = 0; i < str.length; i++) {
      const strChar = str[i];
      const strCharCode = strChar.charCodeAt(0);
      const keyIndex = i % this.key.length;
      const keyChar = this.key[keyIndex];
      const keyCharCode = keyChar.charCodeAt(0);
      let shiftedCode = strCharCode - this._map[keyChar];
      if (shiftedCode < _aCode) {
        const last = _zCode + 1;
        const diff = _aCode - shiftedCode;
        shiftedCode = last - diff;
      }
      decoded += String.fromCharCode(shiftedCode);
    }
    return decoded;
  }
}



module.exports = Cipher;
