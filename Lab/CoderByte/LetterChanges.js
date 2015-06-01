//Using the JavaScript language, have the function LetterChanges(str) take the str parameter being passed and modify it using the following algorithm. Replace every letter in the string with the letter following it in the alphabet (ie. c becomes d, z becomes a). Then capitalize every vowel in this new string (a, e, i, o, u) and finally return this modified string. 
//
//Use the Parameter Testing feature in the box below to test your code with different arguments.

function LetterChanges(str) { 
  return str.toLowerCase().replace(/[a-z]/g, function(c) {
    var t = String.fromCharCode(c.charCodeAt() + 1 > 122 ? 97 : c.charCodeAt() + 1);
    return ['a','e','i','o','u'].indexOf(t) > 0 ? t.toUpperCase() : t;
  });
}

console.log(LetterChanges('abc*90aa'));
console.log(LetterChanges('hello*3'));
console.log(LetterChanges('fun times!'));