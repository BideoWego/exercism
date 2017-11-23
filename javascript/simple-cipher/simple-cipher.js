

const _alpha = 'abcdefghijklmnopqrstuvwxyz';

const _key = () => {
  const empty = Array(100);
  return Array.apply(null, empty)
    .map(() => {
      const random = Math.random * _alpha.length;
      const index = Math.floor(random);
      return _alpha.charAt(index);
    })
    .join('');
};

const _code = (key, str, direction) => {
  return str.split('')
    .reduce((output, char, i) => {
      const j = _mod(i, key.length);
      const a = key.charAt(j)
      const offset = direction * _alpha.indexOf(a);
      const k = _alpha.indexOf(char) + offset;
      const l = _mod(k, _alpha.length);
      const b = _alpha.charAt(l);
      output += b;
      return output;
    }, "");
};

const _mod = (n, m) => ((n % m) + m) % m;


class Cipher {
  constructor(key=_key()) {
    if (!key || !(/^[a-z]+$/.test(key))) {
      throw new Error("Bad key");
    }
    this.key = key;
  }

  encode(str) {
    return _code(this.key, str, 1);
  }

  decode(str) {
    return _code(this.key, str, -1);
  }
}



module.exports = Cipher;
