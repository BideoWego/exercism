
const _aCode = 97;
const _zCode = _aCode + 25;
const _alpha = 'abcdefghijklmnopqrstuvwxyz';

const _map = Array.apply(null, Array(26)).reduce((obj, n, i) => {
  const key = String.fromCharCode(_aCode + i);
  obj[key] = i;
  return obj;
}, {});

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

const _wrap = (code, direction) => {
  if (code > _zCode) {
    const first = _aCode + direction;
    const diff = code - _zCode;
    code = first + diff;
  } else if (code < _aCode) {
    const last = _zCode + direction;
    const diff = _aCode - code;
    code = last - diff;
  }
  return code;
};

const _crypt = (cipher, str, direction) => {
  let crypted = '';
  for (let i = 0; i < str.length; i++) {
    const strChar = str[i];
    const strCharCode = strChar.charCodeAt(0);
    const keyIndex = i % cipher.key.length;
    const keyChar = cipher.key[keyIndex];
    const keyCharCode = keyChar.charCodeAt(0);
    let shiftedCode = strCharCode + _map[keyChar] * direction;
    shiftedCode = _wrap(shiftedCode, -1 * direction);
    const encodedChar = String.fromCharCode(shiftedCode);
    crypted += encodedChar;
  }
  return crypted;
};


class Cipher {
  constructor(key=_key()) {
    if (!key || !(/^[a-z]+$/.test(key))) {
      throw new Error("Bad key");
    }
    this.key = key;
  }

  encode(str) {
    return _crypt(this, str, 1);
  }

  decode(str) {
    return _crypt(this, str, -1);
  }
}



module.exports = Cipher;
