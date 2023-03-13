var pickRandom = function(){
  var words = arguments;
  if(words.length <= 1) return arguments[0];
  if(arguments[0] instanceof Array) words = arguments[0];
  var randomWord = Array.from(words);
  var rand = Math.floor(Math.random() * randomWord.length);
  return randomWord[rand];
}

var randFrom = function(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

export{ pickRandom, randFrom };