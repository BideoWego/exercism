

const _isEmpty = str => {
  return str.trim().length === 0;
};

const _isShout = str => {
  const cleansed = str.replace(/[^a-z]/gi, '');
  const upcased = cleansed.toUpperCase();
  return cleansed === upcased && cleansed.length > 0;
};

const _isQuestion = str => {
  const trimmed = str.trim()
  return trimmed[trimmed.length - 1] === '?';
};


class Bob {
  hey(str) {
    let response = 'Whatever.';
    if (_isEmpty(str)) {
      response = 'Fine. Be that way!';
    } else if (_isShout(str)) {
      response = 'Whoa, chill out!';
    } else if (_isQuestion(str)) {
      response = 'Sure.';
    }
    return response;
  }
}


module.exports = Bob;
