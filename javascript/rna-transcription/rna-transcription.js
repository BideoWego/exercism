

const _map = {
  C: 'G',
  G: 'C',
  A: 'U',
  T: 'A'
};

const _re = /^[CGAT]+$/;


class DnaTranscriber {
  toRna(dna) {
    if (!_re.test(dna)) {
      throw new Error('Invalid input');
    }

    return dna.split('')
      .map(n => _map[n])
      .join('');
  }
}


module.exports = DnaTranscriber;




