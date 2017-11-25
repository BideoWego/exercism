

const _checklist = () => {
  return Array.apply(null, Array(26)).reduce((obj, n, i) => {
    const key = String.fromCharCode(97 + i);
    obj[key] = false;
    return obj;
  }, {});
};


class Pangram {
  constructor(str) {
    this.str = str.toLowerCase();
  }

  isPangram() {
    const checklist = _checklist();
    this.str.split('').forEach(c => checklist[c] = true);
    return Object.values(checklist).reduce((s, v) => s && v);
  }
}


module.exports = Pangram;
