
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
      const keyChar = this.key[i];
      const strCharCode = strChar.charCodeAt(0);
      const keyCharCode = keyChar.charCodeAt(0);
      const shiftAmount = keyCharCode - _aCode;
      const shiftedCode = strCharCode + shiftAmount > _zCode ?
        _aCode + (strCharCode + shiftAmount - _zCode) :
        strCharCode + shiftAmount;
      const encodedChar = String.fromCharCode(shiftedCode);
      encoded += encodedChar;
    }
    return encoded;
  }

  decode(str) {
    let decoded = '';
    for (let i = 0; i < str.length; i++) {
      const strChar = str[i];
      const keyChar = this.key[i];
      const strCharCode = keyChar.charCodeAt(0);
      const keyCharCode = strChar.charCodeAt(0);
      const shiftAmount = keyCharCode - _aCode;
      const shiftedCode = strCharCode - shiftAmount < _aCode ?
        _zCode - (strCharCode - shiftAmount + _aCode) :
        strCharCode - shiftAmount;
      decoded += String.fromCharCode(shiftedCode);
    }
    return decoded;
  }
}



module.exports = Cipher;
